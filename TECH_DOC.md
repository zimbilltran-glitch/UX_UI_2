# Technical Documentation

## Overview Module

### 0.0 Overview Supplementary Frames
**Technical Documentation Note:**
- **TradingView Widget:** Biểu đồ giá được nhúng trực tiếp thông qua script của TradingView (`embed-widget-advanced-chart.js`). Cần lưu ý quản lý vòng đời của component (useEffect) để tránh việc script bị inject nhiều lần khi re-render.
- **Data Synchronization:** Các chỉ số định giá trong "Chỉ số chính" (P/E, P/B, ROE, v.v.) và "Định giá theo P/E" cần được đồng bộ hoàn toàn với dữ liệu từ mục **1.0 Valuation**. Khi người dùng thay đổi mã cổ phiếu, toàn bộ khung bổ trợ phải tự động cập nhật dữ liệu mới từ backend.
- **Banking Operation Info:** Khung này hiện đang được thiết kế riêng cho ngành Ngân hàng (MBB). Hệ thống cần có logic để hiển thị các chỉ số chuyên biệt khác nhau tùy thuộc vào ngành nghề của mã cổ phiếu đang được chọn.

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
