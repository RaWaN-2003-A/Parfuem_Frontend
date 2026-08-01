export interface Parfuem {
  _id?: string;     // ereignis-ID (optional, da sie von der Datenbank generiert wird)
  name: string;     // name des Parfüms 
  marke: string;    // marke des Parfüms
  preis: number;    // preis des Parfüms
  kategorie?: string; // kategorie des Parfüms (optional)
  beschreibung?: string; // الوصف
  bestand?: number; // الكمية المتوفرة
  bildUrl?: string; // رابط الصورة 
  featured?: boolean; // هل العطر مميز؟ 
  groesse?: string; // حجم العطر 

  // Um felher bei der Datenübertragung zu vermeiden --> interface definieren, damit weiß Angular
  // welche Felder erwartet werden und welche optional sind.
}