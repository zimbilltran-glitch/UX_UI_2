import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "search_placeholder": "Search ticker...",
      "overview": "Overview",
      "valuation": "Valuation",
      "future_growth": "Future Growth",
      "financial_health": "Financial Health",
      "past_performance": "Past Performance",
      "dividend": "Dividend",
      "management": "Management",
      "ai_analysis": "AI Analysis",
      "new_data": "New Data"
    }
  },
  vi: {
    translation: {
      "search_placeholder": "Tìm mã cổ phiếu...",
      "overview": "Tổng quan",
      "valuation": "Định giá",
      "future_growth": "Tăng trưởng tương lai",
      "financial_health": "Sức khỏe tài chính",
      "past_performance": "Hiệu quả hoạt động",
      "dividend": "Cổ tức",
      "management": "Ban lãnh đạo",
      "ai_analysis": "AI Phân Tích",
      "new_data": "Dữ Liệu Mới"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('finsang-lang') || 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
