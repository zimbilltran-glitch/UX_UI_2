# 🎨 Tài liệu Kỹ thuật Frontend: UX/UI & Yêu cầu Tương tác (Techdoc_Frontend_UX_UI2.md)

> **Dành cho Đội ngũ Backend & Data Agent**
> **Mục tiêu:** Cung cấp thông tin chi tiết về các thành phần UI, luồng tương tác và yêu cầu dữ liệu phía Frontend. Tài liệu này giúp đội ngũ Data chuẩn bị cấu trúc API và định dạng dữ liệu phù hợp trước khi thực hiện đấu nối.

---

## 🏗️ 1. Triết lý Thiết kế & Nguyên tắc UX

Frontend được xây dựng dựa trên triết lý **"Data-First, Performance-Driven"**. Mọi thành phần UI đều phục vụ việc hiển thị dữ liệu tài chính phức tạp một cách trực quan nhất.

*   **Tính nhất quán:** Sử dụng hệ thống Design System dựa trên Tailwind CSS.
*   **Khả năng đáp ứng (Responsiveness):** UI phải hiển thị tốt trên cả Desktop (Dashboard) và Mobile (Quick view).
*   **Phản hồi tức thì:** Mọi hành động của người dùng (lọc, tìm kiếm) phải có trạng thái loading (skeleton screens) để tránh cảm giác đơ lag.

---

## 🧩 2. Component-Data Mapping (Yêu cầu dữ liệu theo thành phần)

Để UI hiển thị chính xác, Backend cần cung cấp dữ liệu theo các cấu trúc sau:

### 2.1. Bảng dữ liệu (Data Grid/Table)
*   **Yêu cầu:** Dữ liệu dạng bảng phân trang (pagination) hoặc cuộn vô hạn (infinite scroll).
*   **Cấu trúc API:** Cần trả về tổng số bản ghi (`total_count`) để UI tính toán số trang.
*   **Định dạng:** Mảng các đối tượng, mỗi đối tượng là một hàng.

### 2.2. Biểu đồ (Recharts)
*   **Yêu cầu:** Dữ liệu chuỗi thời gian (Time-series).
*   **Cấu trúc API:** Mảng các đối tượng `{ date: string, value: number }`.
*   **Lưu ý:** Backend cần đảm bảo dữ liệu đã được sắp xếp theo thời gian (ascending) trước khi trả về, tránh việc Frontend phải xử lý lại.

### 2.3. Tìm kiếm & Bộ lọc (Search & Filters)
*   **Yêu cầu:** Tìm kiếm theo mã (Ticker) hoặc tên công ty.
*   **Cấu trúc API:** Endpoint tìm kiếm cần hỗ trợ `fuzzy search` (tìm kiếm mờ) và trả về danh sách gợi ý nhanh (Autocomplete).

---

## ⚡ 3. Yêu cầu về Luồng Tương tác & Trạng thái (State)

Đội ngũ Data cần lưu ý các kịch bản sau để thiết kế API:

1.  **Trạng thái Loading:** Khi dữ liệu chưa về, UI hiển thị Skeleton. API cần phản hồi nhanh nhất có thể (dưới 200ms).
2.  **Xử lý dữ liệu trống (Empty State):** Nếu một mã chứng khoán không có dữ liệu cho một quý cụ thể, API **không được trả về lỗi 404**, mà phải trả về một mảng rỗng hoặc giá trị `null` để UI hiển thị thông báo "Chưa có dữ liệu".
3.  **Định dạng số:** Frontend sẽ format số (ví dụ: `1.234,56`). Backend chỉ cần trả về kiểu `number` (integer/float), không trả về kiểu `string` đã format sẵn (trừ khi là dữ liệu hiển thị đặc biệt).

---

## 🚀 4. Hiệu năng & Ràng buộc

*   **Lazy Loading:** Chỉ tải dữ liệu khi người dùng cuộn đến hoặc chuyển tab.
*   **Caching:** Frontend sẽ cache dữ liệu trong bộ nhớ (React Query/SWR). Backend cần đảm bảo dữ liệu không thay đổi quá thường xuyên trong phiên làm việc của người dùng.
*   **Accessibility (A11y):** Các thành phần UI phải hỗ trợ điều hướng bằng bàn phím.

---

## 📋 5. Danh sách Hành động cho Đội ngũ Data (Action Items)

Trước khi tiến hành đấu nối, đội ngũ Data vui lòng chuẩn bị:

1.  **API Endpoints:** Cung cấp danh sách các endpoint `GET` kèm theo ví dụ về JSON response thực tế.
2.  **Normalization:** Đảm bảo dữ liệu từ các nguồn khác nhau đã được chuẩn hóa về cùng một đơn vị tính (ví dụ: tất cả là tỷ đồng).
3.  **Error Codes:** Thống nhất bộ mã lỗi (ví dụ: `ERR_INVALID_TICKER`, `ERR_DATA_UNAVAILABLE`) để Frontend hiển thị thông báo lỗi thân thiện với người dùng.
4.  **Schema Definition:** Cập nhật file `golden_schema.json` nếu có thay đổi về tên các chỉ tiêu tài chính.

---
*Tài liệu này là cơ sở để đội ngũ Frontend và Data thống nhất về giao diện và dữ liệu. Mọi thay đổi về cấu trúc API cần được thông báo trước khi triển khai.*
