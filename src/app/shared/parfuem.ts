export interface Parfuem {
  _id?: string;     // معرف العطر في قاعدة البيانات
  name: string;     // اسم العطر
  marke: string;    // الماركة
  preis: number;    // السعر
  kategorie? : string; // الفئة)
  beschreibung?: string; // الوصف 
  bestandt?: number; // الكمية المتوفرة 
  bildUrl?: string; // رابط الصورة 
  featured?: boolean; // هل العطر مميز؟ 
  groesse?: string; // حجم العطر 
}