// Re-export t() từ react-i18next với type tốt hơn cho keys khi cần.
// Hiện tại type-checking key bằng @react-i18next type augmentation chưa setup,
// nên dùng nguyên `useTranslation` cũng được. Hook này chỉ là sugar.
import { useTranslation } from "react-i18next";

export function useT() {
  const { t, i18n } = useTranslation();
  return { t, i18n };
}
