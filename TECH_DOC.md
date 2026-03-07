# Technical Documentation

## Overview Module

### 0.0 Overview Supplementary Frames
**Technical Documentation Note:**
- **TradingView Widget:** Biểu đồ giá được nhúng trực tiếp thông qua script của TradingView (`embed-widget-advanced-chart.js`). Cần lưu ý quản lý vòng đời của component (useEffect) để tránh việc script bị inject nhiều lần khi re-render.
- **Data Synchronization:** Các chỉ số định giá trong "Chỉ số chính" (P/E, P/B, ROE, v.v.) và "Định giá theo P/E" cần được đồng bộ hoàn toàn với dữ liệu từ mục **1.0 Valuation**. Khi người dùng thay đổi mã cổ phiếu, toàn bộ khung bổ trợ phải tự động cập nhật dữ liệu mới từ backend.
- **Banking Operation Info:** Khung này hiện đang được thiết kế riêng cho ngành Ngân hàng (MBB). Hệ thống cần có logic để hiển thị các chỉ số chuyên biệt khác nhau tùy thuộc vào ngành nghề của mã cổ phiếu đang được chọn.

#### Hướng dẫn đấu nối API TradingView (Lấy Bảng Giá Động)
Để biểu đồ giá hoạt động động (dynamic) khi người dùng thay đổi mã cổ phiếu, cần thực hiện đấu nối API TradingView theo các bước sau:

1. **Mapping Mã Chứng Khoán (Symbol Mapping):**
   - TradingView yêu cầu mã chứng khoán phải đi kèm tiền tố sàn giao dịch (VD: `HOSE:MBB`, `HNX:SHS`, `UPCOM:BSR`).
   - Cần xây dựng một hàm helper để map mã cổ phiếu nội bộ sang định dạng của TradingView trước khi truyền vào widget.

2. **Quản lý Vòng đời Component (Lifecycle & Cleanup):**
   - Widget được inject thông qua thẻ `<script>`. Khi mã cổ phiếu (symbol) thay đổi, **bắt buộc phải xóa nội dung cũ** của container trước khi inject script mới để tránh lỗi hiển thị đè nhiều biểu đồ.
   - **Code Pattern tham khảo:**
     ```javascript
     useEffect(() => {
       if (!container.current) return;
       
       // 1. Cleanup biểu đồ cũ
       container.current.innerHTML = '';

       // 2. Tạo và inject script mới với symbol động
       const script = document.createElement("script");
       script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
       script.type = "text/javascript";
       script.async = true;
       script.innerHTML = JSON.stringify({
         "autosize": true,
         "symbol": `${exchange}:${symbol}`, // Biến động từ props (VD: "HOSE:MBB")
         "interval": "D",
         "timezone": "Asia/Ho_Chi_Minh",
         "theme": "dark",
         "style": "1",
         "locale": "en",
         "enable_publishing": false,
         "backgroundColor": "#111111",
         "gridColor": "#1f2937",
         "hide_top_toolbar": false,
         "hide_legend": false,
         "save_image": false,
         "container_id": "tradingview_chart"
       });
       container.current.appendChild(script);

       // 3. Cleanup function khi component unmount hoặc symbol thay đổi
       return () => {
         if (container.current) container.current.innerHTML = '';
       };
     }, [symbol, exchange]); // Trigger lại khi symbol thay đổi
     ```

3. **Nguồn dữ liệu (Datafeed):**
   - Hiện tại đang sử dụng script embed mặc định (dữ liệu delay của TradingView).
   - Nếu hệ thống yêu cầu dữ liệu realtime tự host, cần chuyển sang sử dụng thư viện **TradingView Lightweight Charts** hoặc **Charting Library (bản trả phí)** và tự implement giao thức UDF (Universal Datafeed) để nối với API Websocket/REST của backend.

## Help Center Module

### Help Center Architecture & Navigation
**Technical Documentation Note:**
- **Anchor Link Navigation:** Trang Help Center được thiết kế để hỗ trợ điều hướng trực tiếp đến các bài viết thông qua URL Hash (ví dụ: `#understanding-valuation`). Component `Accordion` sử dụng `useEffect` để lắng nghe sự kiện `hashchange` và tự động mở (expand) nội dung tương ứng, đồng thời cuộn trang (scrollIntoView) đến đúng vị trí của Accordion đó.
- **Tooltip Component:** Các thuật ngữ tài chính (như DCF, PEG Ratio) được bọc trong một custom `Tooltip` component. Tooltip này sử dụng CSS (group-hover, absolute positioning) để hiển thị popup giải thích mà không cần dùng đến thư viện ngoài, đảm bảo hiệu năng và tính nhất quán của theme OLED Dark.
- **Data Source Disclaimer:** Mục "Why is your data different from other sites?" được thiết kế nổi bật để giải thích rõ về phương pháp tính TTM (Trailing Twelve Months) của Finsang, giúp giải quyết các thắc mắc thường gặp của người dùng khi so sánh dữ liệu với các nền tảng khác (Cafef, Fireant).

## Future Growth Module

### 2.3 Earnings per Share (EPS) Growth Forecasts
**Technical Documentation Note:**
Xây dựng một trang Help Center và Documentation nội bộ để lưu trữ toàn bộ thông tin giải thích này, nhằm thay thế các link dẫn ra ngoài trong tương lai.

Hiện tại, component đang sử dụng external link trỏ về `support.simplywall.st` để giải thích lý do dữ liệu khác biệt. Trong các phase tiếp theo, cần xây dựng hệ thống documentation nội bộ để thay thế hoàn toàn các link này.

### 2.4 Future Return on Equity
**Technical Documentation Note:**
Tương tự như mục 2.3, phần giải thích về "Return on Equity (ROE)" trong modal "Learn" hiện đang trỏ ra ngoài. Cần hợp nhất toàn bộ thông tin giải thích này vào trang Help Center nội bộ của dự án.

## Past Earnings Performance Module

### 3.0 Past Earnings Performance
**Technical Documentation Note:**
Dữ liệu lịch sử cho phần này (bao gồm lợi nhuận, doanh thu, biên lợi nhuận, ROE) cần được đồng bộ từ các tệp Parquet vào bảng hiển thị. Hệ thống backend cần xử lý việc đọc dữ liệu từ Parquet và trả về JSON payload tương ứng cho frontend.
Các nút "Learn" và nội dung giải thích chi tiết trong các mục 3.1 đến 3.6 sẽ được liên kết đến Help Centre nội bộ.
