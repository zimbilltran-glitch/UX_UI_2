# 🚀 Finsang Portfolio - Technical Integration Guide (Techdoc)

> **Dành cho Đối tác Phát triển Frontend & Tích hợp Hệ thống**  
> **Người biên soạn:** CTO Mentor Supervisor  

Tài liệu kỹ thuật (*Techdoc*) này đóng vai trò như bức tranh toàn cảnh để đội ngũ đối tác Frontend tiếp nhận, thấu hiểu quy trình đi của dữ liệu, cấu trúc JSON trong Database, qua đó kết nối trơn tru với hệ thống Core Backend của project **Finsang**. 

Tài liệu này trình bày cấu trúc thiết kế mang tính nền tảng độc lập, không phụ thuộc vào bất kỳ phiên bản nào của repository cũ, nhằm đảm bảo mọi developer đọc vào đều hiểu rõ bức tranh hiện tại.

---

## 🏗️ 1. Tổng quan Kiến trúc Dữ liệu & Pipeline (Data Flow Architecture)

Hệ thống được thiết kế phân tách hoàn toàn (decoupled) giữa Backend chịu trách nhiệm làm sạch dữ liệu (Data Pipeline) và Frontend chuyên biệt hiển thị (View Layer).

### 1.1. Luồng chạy của Pipeline Dữ liệu (Backend Context)
Mặc dù Frontend Team không cần chạy Python, việc hiểu luồng dữ liệu dưới đây giúp các bạn nắm rõ bản chất độ trễ và độ sạch của data:

1. **Extraction (Trích xuất):** Hệ thống Bot tự động tải các Báo cáo tài chính (BCTC) dưới dạng file Excel từ Vietcap, đồng thời kết hợp "bắt" (intercept) trực tiếp các gói tin JSON ẩn từ API Server của hệ thống nguồn.
2. **Transformation (Làm sạch & So khớp):** Dữ liệu thô JSON thường xuyên gặp lỗi (như trả về `0.0` sai lệch). Backend sẽ đối chiếu chéo (cross-check) mảng JSON này với dữ liệu bóc tách được từ file Excel BCTC (Được coi là Ground Truth - Chân lý). Những số liệu lỗi sẽ tự động bị ghi đè bằng số liệu chính xác từ Excel. Quy trình này phân nhánh tinh vi theo 3 nhóm ngành chuyên biệt: Doanh nghiệp thông thường (Normal), Ngân hàng (Bank), và Chứng khoán (Securities).
3. **Mapping (Gắn mã định danh):** Các dòng tiếng Việt phức tạp trong báo cáo sẽ được lược bỏ, và hệ thống gán một mã ID (Key) duy nhất (Ví dụ: thay vì lưu chữ *"Doanh thu thuần"*, hệ thống chỉ lưu key `isa1`).
4. **Loadding (Đẩy lên Database):** Dữ liệu sạch dạng JSONB được tự động đẩy (Upsert) lên Supabase PostgreSQL. Database tự động loại bỏ các số liệu cũ hơn 8 năm để giữ tốc độ chặng cuối (End-point) luôn siêu tốc. 

👉 **Nhiệm vụ của Frontend Team:** Nhận dữ liệu ở **Điểm Cuối Cùng (Database Supabase)** thông qua các câu lệnh truy vấn API `GET`.

---

## 🗄️ 2. Cấu trúc Database Supabase (Tables & JSONB Data)

Supabase PostgreSQL đóng vai trò như kho chứa dữ liệu. Dưới đây là cơ cấu các bảng biểu, tên bảng, và cấu trúc JSONB cụ thể bên trong.

### 2.1. Cấu trúc Các Bảng BCTC Gốc (Data Thô - Quan Trọng Nhất)
Bao gồm 3 bảng chính: 
- `balance_sheet` (Cân Đối Kế Toán)
- `income_statement` (Kết Quả Kinh Doanh)
- `cash_flow` (Lưu Chuyển Tiền Tệ)

**Cơ cấu Column trong các bảng trên:**
- `ticker`: Mã chứng khoán (VD: `MBB`, `FPT`).
- `period_type`: Loại chu kỳ lịch sử, gốm 2 giá trị là `year` (Dữ liệu Năm) và `quarter` (Dữ liệu Quý).
- `period_start` / `period_end`: Cột mốc thời gian (VD: `2024-01-01` đến `2024-03-31` tức Quý 1).
- `data`: **Đây là cột JSONB (Hữu ích nhất cho Frontend)**, lưu trữ toàn bộ chỉ tiêu tài chính của quý đó.

👉 **Mô tả cấu trúc JSON trong cột `data`:**  
Cột này chứa một Object JSON nén dưới định dạng `{"key_id": value_integer}`. KHÔNG lưu tiếng Việt.  
*Ví dụ dữ liệu trả về thực tế từ truy vấn `income_statement` của FPT:*
```json
{
  "isa1": 150000000500,
  "isa2": 5000000000,
  "isa20": 4500000100
}
```

### 2.2. Bảng `company_overview` (Tổng quan Doanh nghiệp)
- Chứa Metadata. Mỗi row là 1 công ty.
- **Fields chính:** `ticker` (PK), `industry` (Nhóm ngành), `market_cap` (Vốn hóa), `pe_ratio`, `pb_ratio`, `eps`. Thường gọi một lần để hiển thị Header Logo & Info.

### 2.3. View `financial_ratios_wide` (Chỉ số Tài chính)
- Thay vì tự viết hàm chia Lợi nhuận/Vốn, Backend đã tính sẵn tất cả các tỷ lệ (ROE, ROA, Hệ số nợ tĩnh, CIR, LDR của Bank).
- Bắt buộc Frontend dùng **View** `financial_ratios_wide` thay vì table gốc, vì Database đã giúp "xoay" Data thành định dạng mỗi Quý là một Object ngang. Render vào đồ thị `recharts` cực kỳ dễ dàng.

### 2.4. Bảng `stock_ohlcv`
- Vector dữ liệu giá cổ phiếu đóng/mở cửa, khối lượng giao dịch. Phục vụ chuyên biệt cho Biểu đồ Nến (Candlestick) hoặc Price Line chart định kỳ.

---

## 📖 3. Từ Điển Dữ Liệu (Golden Schema) & Cơ Chế Mapping Tiếng Việt

Đây là cơ chế cực kỳ quan trọng đòi hỏi Frontend Team phải lập trình đúng tư duy.

### 3.1. Lý do không lưu Tiếng Việt trong DB
Nhằm tối ưu bộ nhớ RAM, chống phình to Server và dễ mở rộng chế độ Đa ngôn ngữ (Anh/Việt) sau này, API trả về chỉ chứa Key (như `isa1`). Frontend có nhiệm vụ **"Mapping/Dịch"** các Key này ngược thành Text tiếng Việt ngay trên trình duyệt của người dùng.

### 3.2. File `golden_schema.json`
Đại diện cho từ điển toàn cục (Nằm trong bộ source). Định dạng của file là một mảng Array khai báo logic cấu trúc cây.
*Ví dụ bên trong file cấu hình:*
```json
[
  {
    "field_id": "isa1",
    "vn_name": "Doanh thu bán hàng và cung cấp dịch vụ",
    "level": 0,
    "unit": "tỷ đồng"
  },
  {
    "field_id": "isa20",
    "vn_name": "Lợi nhuận sau thuế của công ty mẹ",
    "level": 2,
    "unit": "tỷ đồng"
  }
]
```

### 3.3. Hướng dẫn Luồng Tư Duy Mapping trên UI (Code Logic)
Khi xây dựng hiển thị Bảng, Frontend Team sẽ thực hiện các thao tác:
1. **Tiền tải (Preload):** Nạp file `golden_schema.json` vào Local State (Context / Redux / Zustand) ngay lần mở web đầu tiên. Khuyên dùng: Biến đổi Array thành Hashmap (Object/Dict) để truy xuất O(1). Mẫu: `const dictionary = { "isa1": { vn_name: "Doanh thu...", level: 0 } }`.
2. **Fetch API:** Kênh React Query gọi Supabase báo cáo Quý lấy về. Kết quả: `{"isa1": 15000, "isa20": 4500}`.
3. **Render DOM Component:** Duyệt qua các Key. Render chữ: `dictionary["isa1"].vn_name` -> Xuất ra Front-end: *"Doanh thu bán hàng và cung cấp dịch vụ"*.
4. **Mô phỏng Thụt lề CSS (Tree-view BCTC):** Dựa vào `dictionary["isa1"].level`. Nếu `level === 2`, Frontend đẩy thẻ `<td style={{ paddingLeft: "40px" }}>` để tạo phân cấp cha con rõ rệt chuyên nghiệp (Tương tự format Bloomberg Terminal).

---

## ⚛️ 4. Cấu hình Vite React Phía Frontend 

Frontend repo hiện tại tuân theo stack tiêu chuẩn rất sát thực tế, dễ đọc hiểu:
- **Build tool:** Vite
- **Framework:** React 19 (Hooks)
- **Thiết kế Đồ hoạ:** Thư viện `recharts`
- **Kết nối DB:** `@supabase/supabase-js`

### 4.1. Thiết lập Key Kết nối
Toàn bộ thao tác đọc Data từ DB đi qua Role Ẩn danh (Anon). Tại thư mục `frontend/`, khai báo file `.env`:
```env
VITE_SUPABASE_URL=https://<chuoi-dinh-danh-du-an>.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1Ni... (Chuỗi JWT Public Token)
```

👉 **Khẳng định Bảo mật (RLS Mode):** CTO Config đã setup `Row Level Security` (RLS) khoá chặt database. Key `anon` phía Frontend **CHỈ ĐƯỢC CẤP QUYỀN `SELECT`**. Bất kỳ lệnh `UPDATE`, `INSERT` từ mã JS của các bạn sẽ bị DB Server đá văng (`403 Forbidden`). Đội code Frontend thoải mái thử nghiệm API mà không có rủi ro "vô tình làm hỏng dữ liệu hệ thống".

### 4.2. File `supabaseClient.js`
Nơi gọi DB duy nhất nằm tại `frontend/src/supabaseClient.js`. 
Ví dụ lấy chỉ số KQKD từ Supabase:
```javascript
export async function getIncomeStatement(ticker) {
  const { data, error } = await supabase
    .from('income_statement')
    .select('*')
    .eq('ticker', ticker);
  if (error) console.error("Lỗi get data:", error);
  return data;
}
```

---

## 🤝 5. Gói Gọi Nhanh Dành Cho Đối Tác

1. **Khởi động dự án Clone Base (Nếu cần thiết):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. **Cấp Phép Lột xác Giao diện (Re-Theme):** Khuyến khích đối tác xoá bỏ, đập đi xây lại hệ styling hiện tại (Bằng MUI, Tailwind, SCSS...). Miễn là **GIỮ LẠI** bộ khung Hooks gọi API từ Supabase và thuật toán Mapping Golden Schema.
3. **Instant Universal Search (Thanh Tìm Kiếm Toàn Cục):** Hãy lưu ý tính năng UX quan trọng - Mọi text tìm kiếm phải xử lý Normalize (Xoá dấu Tiếng Việt), và Highlight đoạn text tương ứng tại tab BCTC.
4. **Chuẩn hoá Tiền Tệ (Formatter):** Dữ liệu Integer gốc trong JSON thường rất lớn (VNĐ gốc). Bạn phải code sẵn Helper quy đổi chia tỷ lệ `1,000,000,000`, định dạng làm tròn 2 chữ số thập phân kết hợp dấu phẩy ngăn cách hàng nghìn (VD: `1.235,55`).

---
*Tài liệu kết thúc. Cấu trúc DB và JSON hoàn toàn cố định, sẵn sàng để phục vụ tiến độ Integration của Frontend Component Team.*
