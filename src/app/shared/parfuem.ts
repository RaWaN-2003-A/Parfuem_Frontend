export interface Parfuem {
  _id?: string;     // معرف العطر في قاعدة البيانات
  name: string;     // اسم العطر
  marke: string;    // الماركة
  preis: number;    // السعر
  katoegorie? : string; // الفئة (اختياري)
  beschreibung?: string; // الوصف (اختياري)
  bestandt?: number; // الكمية المتوفرة (اختياري)
  bildUrl?: string; // رابط الصورة (اختياري)
  featured?: boolean; // هل العطر مميز؟ (اختياري)
}