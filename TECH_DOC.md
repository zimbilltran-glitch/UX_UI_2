# Technical Documentation

## Overview Module

### 0.0 Overview Supplementary Frames
**Technical Documentation Note:**
- **TradingView Widget:** Biểu đồ giá được nhúng trực tiếp thông qua script của TradingView (`embed-widget-advanced-chart.js`).
- **Data Synchronization:** Các chỉ số định giá trong "Chỉ số chính" (P/E, P/B, ROE, v.v.) và "Định giá theo P/E" cần được đồng bộ hoàn toàn với dữ liệu từ mục **1.0 Valuation**.
- **Banking Operation Info:** Khung này hiện đang được thiết kế riêng cho ngành Ngân hàng (MBB). Hệ thống cần có logic để hiển thị các chỉ số chuyên biệt khác nhau tùy thuộc vào ngành nghề của mã cổ phiếu đang được chọn.

## Help Center Module

### Help Center Architecture & Navigation
**Technical Documentation Note:**
- **Anchor Link Navigation:** Trang Help Center hỗ trợ điều hướng trực tiếp đến các bài viết thông qua URL Hash.
- **Tooltip Component:** Các thuật ngữ tài chính được bọc trong một custom `Tooltip` component.
- **Data Source Disclaimer:** Mục "Why is your data different from other sites?" giải thích rõ về phương pháp tính TTM (Trailing Twelve Months) của Finsang.
- **Management & Ownership Integration:** Đã bổ sung tài liệu chi tiết cho phần Ban lãnh đạo (Management) và Cơ cấu cổ đông (Ownership).

## Design System Guidelines (FinSang Terminal v3.0)

### 1. Color Palette (Light Institutional Modern)
- **Background:** `--bg-base` (#F4F6F8)
- **Card Background:** `--bg-card` (#FFFFFF)
- **Text:** `--text-primary` (#111827), `--text-secondary` (#4B5563)
- **Accents:**
  - Brand: `--brand-primary` (#007BFF)
  - Bullish: `--color-bullish` (#28A745)
  - Bearish: `--color-bearish` (#FF3B30)

### 2. Typography
- Use the **Plus Jakarta Sans** font family for all UI elements.
- Use **JetBrains Mono** for financial data (tabular numbers).
- Use `font-tabular` class for all financial figures to ensure alignment.

### 3. Logo & Branding
- Use the `FinSangLogo` component from `/src/theme`.
- The logo is a geometric polyhedron inside a rounded square container.
- Branding: "Fin" (Bullish Green), "Sang" (Primary Black), "Terminal" (Secondary Gray).

### 4. Implementation
- Import `theme.css` in your global `index.css`.
- Use CSS variables for all component styling.
- Apply `surface-card` class for cards to get the institutional look.
