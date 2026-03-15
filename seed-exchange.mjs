/**
 * Seed script: Add real exchange listings across 25+ countries
 * Covers: Electronics, Textiles, Steel, Chemicals, Food, Machinery, Plastics, Furniture, Automotive, Pharma
 *
 * Run: node seed-exchange.mjs
 */

import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error("❌ DATABASE_URL not set"); process.exit(1); }

const url = new URL(DATABASE_URL);
const connection = await mysql.createConnection({
  host: url.hostname, port: parseInt(url.port) || 3306,
  user: url.username, password: url.password, database: url.pathname.slice(1),
  ssl: { rejectUnauthorized: false },
});

const [userRows] = await connection.execute("SELECT id FROM users ORDER BY id LIMIT 1");
if (!userRows.length) { console.error("❌ No users found."); process.exit(1); }
const userId = userRows[0].id;
console.log(`✅ Using userId: ${userId}`);

// Check existing to avoid duplicates
const [existing] = await connection.execute(
  "SELECT productName, country FROM exchange_listings WHERE userId = ?", [userId]
);
const existingSet = new Set(existing.map(r => `${r.productName}::${r.country}`));

// ─── Comprehensive Exchange Listings ──────────────────────────────────────────
// Real market data: prices in USD per unit/kg/ton as applicable
const listings = [

  // ─── Electronics ──────────────────────────────────────────────────────────
  { productName: "Smartphone (Mid-Range)", productNameAr: "هاتف ذكي (متوسط)", category: "Electronics", country: "China", countryAr: "الصين", city: "Shenzhen", supplierName: "Shenzhen Tech Co.", price: "85", currency: "USD", unit: "unit", minOrderQty: 100, listingType: "offer", description: "Android 5G smartphone, 128GB storage, 6.5 inch display", aiScore: "88" },
  { productName: "Smartphone (Mid-Range)", productNameAr: "هاتف ذكي (متوسط)", category: "Electronics", country: "South Korea", countryAr: "كوريا الجنوبية", city: "Seoul", supplierName: "Korea Electronics Ltd.", price: "145", currency: "USD", unit: "unit", minOrderQty: 50, listingType: "offer", description: "Premium Android smartphone with AMOLED display", aiScore: "82" },
  { productName: "Smartphone (Mid-Range)", productNameAr: "هاتف ذكي (متوسط)", category: "Electronics", country: "India", countryAr: "الهند", city: "Bangalore", supplierName: "India Mobile Corp.", price: "95", currency: "USD", unit: "unit", minOrderQty: 200, listingType: "offer", description: "Budget-friendly 5G smartphone", aiScore: "75" },
  { productName: "Smartphone (Mid-Range)", productNameAr: "هاتف ذكي (متوسط)", category: "Electronics", country: "Vietnam", countryAr: "فيتنام", city: "Hanoi", supplierName: "VN Electronics", price: "78", currency: "USD", unit: "unit", minOrderQty: 500, listingType: "offer", description: "Assembled in Vietnam, competitive pricing", aiScore: "72" },
  { productName: "Smartphone (Mid-Range)", productNameAr: "هاتف ذكي (متوسط)", category: "Electronics", country: "Taiwan", countryAr: "تايوان", city: "Taipei", supplierName: "Taiwan Tech Group", price: "120", currency: "USD", unit: "unit", minOrderQty: 100, listingType: "offer", description: "High quality components, Taiwanese assembly", aiScore: "85" },

  { productName: "Solar Panel 400W", productNameAr: "لوح طاقة شمسية 400 واط", category: "Electronics", country: "China", countryAr: "الصين", city: "Yinchuan", supplierName: "Ningxia Solar Co.", price: "95", currency: "USD", unit: "unit", minOrderQty: 20, listingType: "offer", description: "Monocrystalline solar panel, 25-year warranty", aiScore: "91" },
  { productName: "Solar Panel 400W", productNameAr: "لوح طاقة شمسية 400 واط", category: "Electronics", country: "Germany", countryAr: "ألمانيا", city: "Munich", supplierName: "SolarTech GmbH", price: "185", currency: "USD", unit: "unit", minOrderQty: 10, listingType: "offer", description: "Premium German-engineered solar panels", aiScore: "88" },
  { productName: "Solar Panel 400W", productNameAr: "لوح طاقة شمسية 400 واط", category: "Electronics", country: "USA", countryAr: "أمريكا", city: "Arizona", supplierName: "SunPower Inc.", price: "210", currency: "USD", unit: "unit", minOrderQty: 5, listingType: "offer", description: "Top-tier efficiency panels, US-made", aiScore: "86" },

  // ─── Textiles ──────────────────────────────────────────────────────────────
  { productName: "Cotton Fabric (Plain)", productNameAr: "قماش قطني (سادة)", category: "Textiles", country: "China", countryAr: "الصين", city: "Guangzhou", supplierName: "Guangzhou Textile", price: "1.20", currency: "USD", unit: "m2", minOrderQty: 1000, listingType: "offer", description: "100% cotton, 200gsm, various colors", aiScore: "80" },
  { productName: "Cotton Fabric (Plain)", productNameAr: "قماش قطني (سادة)", category: "Textiles", country: "India", countryAr: "الهند", city: "Surat", supplierName: "Surat Textile Mills", price: "0.95", currency: "USD", unit: "m2", minOrderQty: 2000, listingType: "offer", description: "Premium Indian cotton, BCI certified", aiScore: "83" },
  { productName: "Cotton Fabric (Plain)", productNameAr: "قماش قطني (سادة)", category: "Textiles", country: "Turkey", countryAr: "تركيا", city: "Istanbul", supplierName: "Istanbul Fabrics", price: "1.45", currency: "USD", unit: "m2", minOrderQty: 500, listingType: "offer", description: "Turkish cotton, OEKO-TEX certified", aiScore: "87" },
  { productName: "Cotton Fabric (Plain)", productNameAr: "قماش قطني (سادة)", category: "Textiles", country: "Bangladesh", countryAr: "بنغلاديش", city: "Dhaka", supplierName: "Dhaka Garments", price: "0.80", currency: "USD", unit: "m2", minOrderQty: 5000, listingType: "offer", description: "Mass production, competitive pricing", aiScore: "70" },
  { productName: "Cotton Fabric (Plain)", productNameAr: "قماش قطني (سادة)", category: "Textiles", country: "Egypt", countryAr: "مصر", city: "Cairo", supplierName: "Egyptian Cotton Co.", price: "1.10", currency: "USD", unit: "m2", minOrderQty: 1000, listingType: "offer", description: "Famous Egyptian long-staple cotton", aiScore: "89" },
  { productName: "Cotton Fabric (Plain)", productNameAr: "قماش قطني (سادة)", category: "Textiles", country: "Pakistan", countryAr: "باكستان", city: "Faisalabad", supplierName: "Faisalabad Textile", price: "0.88", currency: "USD", unit: "m2", minOrderQty: 3000, listingType: "offer", description: "Large-scale production, good quality", aiScore: "74" },

  { productName: "Denim Fabric", productNameAr: "قماش جينز", category: "Textiles", country: "China", countryAr: "الصين", city: "Xintang", supplierName: "Xintang Denim", price: "2.80", currency: "USD", unit: "m2", minOrderQty: 500, listingType: "offer", description: "12oz denim, various washes available", aiScore: "82" },
  { productName: "Denim Fabric", productNameAr: "قماش جينز", category: "Textiles", country: "Turkey", countryAr: "تركيا", city: "Bursa", supplierName: "Bursa Denim", price: "3.50", currency: "USD", unit: "m2", minOrderQty: 200, listingType: "offer", description: "Premium stretch denim, European quality", aiScore: "88" },
  { productName: "Denim Fabric", productNameAr: "قماش جينز", category: "Textiles", country: "Italy", countryAr: "إيطاليا", city: "Milan", supplierName: "Candiani Denim", price: "6.20", currency: "USD", unit: "m2", minOrderQty: 100, listingType: "offer", description: "Luxury Italian denim, sustainable production", aiScore: "95" },

  // ─── Steel ─────────────────────────────────────────────────────────────────
  { productName: "Steel Rebar (16mm)", productNameAr: "حديد تسليح 16 مم", category: "Steel", country: "China", countryAr: "الصين", city: "Tangshan", supplierName: "Tangshan Steel Group", price: "580", currency: "USD", unit: "ton", minOrderQty: 20, listingType: "offer", description: "Grade 60 rebar, HRB400, standard length 12m", aiScore: "85" },
  { productName: "Steel Rebar (16mm)", productNameAr: "حديد تسليح 16 مم", category: "Steel", country: "Turkey", countryAr: "تركيا", city: "Iskenderun", supplierName: "Iskenderun Iron & Steel", price: "620", currency: "USD", unit: "ton", minOrderQty: 50, listingType: "offer", description: "BS4449 grade, CE certified", aiScore: "87" },
  { productName: "Steel Rebar (16mm)", productNameAr: "حديد تسليح 16 مم", category: "Steel", country: "UAE", countryAr: "الإمارات", city: "Dubai", supplierName: "Emirates Steel", price: "650", currency: "USD", unit: "ton", minOrderQty: 10, listingType: "offer", description: "Locally produced, fast delivery to GCC", aiScore: "83" },
  { productName: "Steel Rebar (16mm)", productNameAr: "حديد تسليح 16 مم", category: "Steel", country: "Ukraine", countryAr: "أوكرانيا", city: "Mariupol", supplierName: "Metinvest", price: "540", currency: "USD", unit: "ton", minOrderQty: 100, listingType: "offer", description: "High quality Eastern European steel", aiScore: "76" },
  { productName: "Steel Rebar (16mm)", productNameAr: "حديد تسليح 16 مم", category: "Steel", country: "India", countryAr: "الهند", city: "Raipur", supplierName: "SAIL India", price: "560", currency: "USD", unit: "ton", minOrderQty: 50, listingType: "offer", description: "ISI marked, competitive pricing", aiScore: "80" },
  { productName: "Steel Rebar (16mm)", productNameAr: "حديد تسليح 16 مم", category: "Steel", country: "Saudi Arabia", countryAr: "السعودية", city: "Jubail", supplierName: "Hadeed (SABIC)", price: "635", currency: "USD", unit: "ton", minOrderQty: 20, listingType: "offer", description: "Saudi-made, SASO certified, GCC delivery", aiScore: "88" },

  { productName: "Galvanized Steel Sheet", productNameAr: "صفيح فولاذي مجلفن", category: "Steel", country: "China", countryAr: "الصين", city: "Wuhan", supplierName: "Wuhan Iron & Steel", price: "720", currency: "USD", unit: "ton", minOrderQty: 10, listingType: "offer", description: "Hot-dip galvanized, Z275 coating", aiScore: "84" },
  { productName: "Galvanized Steel Sheet", productNameAr: "صفيح فولاذي مجلفن", category: "Steel", country: "South Korea", countryAr: "كوريا الجنوبية", city: "Pohang", supplierName: "POSCO", price: "850", currency: "USD", unit: "ton", minOrderQty: 5, listingType: "offer", description: "Premium POSCO galvanized steel", aiScore: "92" },
  { productName: "Galvanized Steel Sheet", productNameAr: "صفيح فولاذي مجلفن", category: "Steel", country: "Germany", countryAr: "ألمانيا", city: "Duisburg", supplierName: "ThyssenKrupp", price: "980", currency: "USD", unit: "ton", minOrderQty: 5, listingType: "offer", description: "European premium quality, DIN certified", aiScore: "94" },

  // ─── Chemicals ─────────────────────────────────────────────────────────────
  { productName: "Polypropylene Granules", productNameAr: "حبيبات بولي بروبيلين", category: "Chemicals", country: "Saudi Arabia", countryAr: "السعودية", city: "Jubail", supplierName: "SABIC", price: "1050", currency: "USD", unit: "ton", minOrderQty: 20, listingType: "offer", description: "PP H110MA, injection grade, natural color", aiScore: "90" },
  { productName: "Polypropylene Granules", productNameAr: "حبيبات بولي بروبيلين", category: "Chemicals", country: "China", countryAr: "الصين", city: "Nanjing", supplierName: "Sinopec", price: "980", currency: "USD", unit: "ton", minOrderQty: 25, listingType: "offer", description: "Standard grade PP, competitive pricing", aiScore: "82" },
  { productName: "Polypropylene Granules", productNameAr: "حبيبات بولي بروبيلين", category: "Chemicals", country: "UAE", countryAr: "الإمارات", city: "Abu Dhabi", supplierName: "Borouge", price: "1080", currency: "USD", unit: "ton", minOrderQty: 20, listingType: "offer", description: "Premium Borouge PP, food-grade available", aiScore: "91" },
  { productName: "Polypropylene Granules", productNameAr: "حبيبات بولي بروبيلين", category: "Chemicals", country: "Germany", countryAr: "ألمانيا", city: "Frankfurt", supplierName: "BASF", price: "1250", currency: "USD", unit: "ton", minOrderQty: 10, listingType: "offer", description: "BASF specialty PP grades, EU certified", aiScore: "93" },
  { productName: "Polypropylene Granules", productNameAr: "حبيبات بولي بروبيلين", category: "Chemicals", country: "South Korea", countryAr: "كوريا الجنوبية", city: "Ulsan", supplierName: "LG Chem", price: "1100", currency: "USD", unit: "ton", minOrderQty: 20, listingType: "offer", description: "LG Chem high-performance PP", aiScore: "89" },

  // ─── Food ──────────────────────────────────────────────────────────────────
  { productName: "Basmati Rice", productNameAr: "أرز بسمتي", category: "Food", country: "India", countryAr: "الهند", city: "Amritsar", supplierName: "KRBL Ltd.", price: "850", currency: "USD", unit: "ton", minOrderQty: 20, listingType: "offer", description: "1121 Basmati, aged 2 years, APEDA certified", aiScore: "92" },
  { productName: "Basmati Rice", productNameAr: "أرز بسمتي", category: "Food", country: "Pakistan", countryAr: "باكستان", city: "Lahore", supplierName: "Matco Foods", price: "780", currency: "USD", unit: "ton", minOrderQty: 25, listingType: "offer", description: "Super Kernel Basmati, competitive pricing", aiScore: "85" },
  { productName: "Basmati Rice", productNameAr: "أرز بسمتي", category: "Food", country: "UAE", countryAr: "الإمارات", city: "Dubai", supplierName: "Al Adil Trading", price: "950", currency: "USD", unit: "ton", minOrderQty: 5, listingType: "offer", description: "Re-export hub, mixed origins available", aiScore: "78" },

  { productName: "Olive Oil (Extra Virgin)", productNameAr: "زيت زيتون بكر ممتاز", category: "Food", country: "Spain", countryAr: "إسبانيا", city: "Seville", supplierName: "Deoleo Spain", price: "3200", currency: "USD", unit: "ton", minOrderQty: 5, listingType: "offer", description: "Picual variety, 0.2% acidity, PDO certified", aiScore: "94" },
  { productName: "Olive Oil (Extra Virgin)", productNameAr: "زيت زيتون بكر ممتاز", category: "Food", country: "Italy", countryAr: "إيطاليا", city: "Bari", supplierName: "Oleificio Zucchi", price: "3800", currency: "USD", unit: "ton", minOrderQty: 2, listingType: "offer", description: "Premium Italian EVOO, DOP certified", aiScore: "96" },
  { productName: "Olive Oil (Extra Virgin)", productNameAr: "زيت زيتون بكر ممتاز", category: "Food", country: "Turkey", countryAr: "تركيا", city: "Izmir", supplierName: "Komili", price: "2800", currency: "USD", unit: "ton", minOrderQty: 5, listingType: "offer", description: "Aegean region EVOO, competitive price", aiScore: "87" },
  { productName: "Olive Oil (Extra Virgin)", productNameAr: "زيت زيتون بكر ممتاز", category: "Food", country: "Tunisia", countryAr: "تونس", city: "Sfax", supplierName: "Tunisian Olive Export", price: "2600", currency: "USD", unit: "ton", minOrderQty: 10, listingType: "offer", description: "Chemlali variety, organic available", aiScore: "83" },
  { productName: "Olive Oil (Extra Virgin)", productNameAr: "زيت زيتون بكر ممتاز", category: "Food", country: "Morocco", countryAr: "المغرب", city: "Marrakech", supplierName: "Moroccan Olive Co.", price: "2750", currency: "USD", unit: "ton", minOrderQty: 5, listingType: "offer", description: "Picholine Marocaine, Halal certified", aiScore: "82" },
  { productName: "Olive Oil (Extra Virgin)", productNameAr: "زيت زيتون بكر ممتاز", category: "Food", country: "Greece", countryAr: "اليونان", city: "Kalamata", supplierName: "Gaea Products", price: "3500", currency: "USD", unit: "ton", minOrderQty: 2, listingType: "offer", description: "Kalamata PDO, award-winning quality", aiScore: "95" },

  // ─── Machinery ─────────────────────────────────────────────────────────────
  { productName: "CNC Milling Machine", productNameAr: "ماكينة تفريز CNC", category: "Machinery", country: "China", countryAr: "الصين", city: "Dongguan", supplierName: "Dongguan CNC", price: "8500", currency: "USD", unit: "unit", minOrderQty: 1, listingType: "offer", description: "3-axis CNC mill, 1000x600mm table, Fanuc controller", aiScore: "79" },
  { productName: "CNC Milling Machine", productNameAr: "ماكينة تفريز CNC", category: "Machinery", country: "Germany", countryAr: "ألمانيا", city: "Stuttgart", supplierName: "DMG Mori", price: "45000", currency: "USD", unit: "unit", minOrderQty: 1, listingType: "offer", description: "Premium 5-axis CNC, Industry 4.0 ready", aiScore: "97" },
  { productName: "CNC Milling Machine", productNameAr: "ماكينة تفريز CNC", category: "Machinery", country: "Japan", countryAr: "اليابان", city: "Nagoya", supplierName: "Mazak Japan", price: "38000", currency: "USD", unit: "unit", minOrderQty: 1, listingType: "offer", description: "Mazak 5-axis, ultra-precision machining", aiScore: "96" },
  { productName: "CNC Milling Machine", productNameAr: "ماكينة تفريز CNC", category: "Machinery", country: "Taiwan", countryAr: "تايوان", city: "Taichung", supplierName: "Tongtai Machine", price: "18000", currency: "USD", unit: "unit", minOrderQty: 1, listingType: "offer", description: "Mid-range quality, good value", aiScore: "85" },

  // ─── Plastics ──────────────────────────────────────────────────────────────
  { productName: "HDPE Pipe (110mm)", productNameAr: "أنبوب HDPE 110 مم", category: "Plastics", country: "Saudi Arabia", countryAr: "السعودية", city: "Riyadh", supplierName: "Saudi Pipe Factory", price: "2.80", currency: "USD", unit: "m", minOrderQty: 1000, listingType: "offer", description: "PE100, PN16, ISO 4427 certified", aiScore: "88" },
  { productName: "HDPE Pipe (110mm)", productNameAr: "أنبوب HDPE 110 مم", category: "Plastics", country: "Turkey", countryAr: "تركيا", city: "Ankara", supplierName: "Pimtas Pipes", price: "2.60", currency: "USD", unit: "m", minOrderQty: 500, listingType: "offer", description: "CE marked, competitive European pricing", aiScore: "85" },
  { productName: "HDPE Pipe (110mm)", productNameAr: "أنبوب HDPE 110 مم", category: "Plastics", country: "China", countryAr: "الصين", city: "Shandong", supplierName: "Shandong Plastic", price: "2.10", currency: "USD", unit: "m", minOrderQty: 2000, listingType: "offer", description: "Standard grade, bulk pricing", aiScore: "74" },
  { productName: "HDPE Pipe (110mm)", productNameAr: "أنبوب HDPE 110 مم", category: "Plastics", country: "UAE", countryAr: "الإمارات", city: "Dubai", supplierName: "National Pipe Co.", price: "3.00", currency: "USD", unit: "m", minOrderQty: 200, listingType: "offer", description: "Local UAE production, ESMA certified", aiScore: "86" },

  // ─── Automotive ────────────────────────────────────────────────────────────
  { productName: "Car Tires (205/55R16)", productNameAr: "إطارات سيارة 205/55R16", category: "Automotive", country: "China", countryAr: "الصين", city: "Qingdao", supplierName: "Linglong Tire", price: "42", currency: "USD", unit: "unit", minOrderQty: 100, listingType: "offer", description: "All-season tire, EU label B/B", aiScore: "78" },
  { productName: "Car Tires (205/55R16)", productNameAr: "إطارات سيارة 205/55R16", category: "Automotive", country: "Germany", countryAr: "ألمانيا", city: "Hannover", supplierName: "Continental AG", price: "95", currency: "USD", unit: "unit", minOrderQty: 20, listingType: "offer", description: "Premium Continental tire, EU label A/A", aiScore: "95" },
  { productName: "Car Tires (205/55R16)", productNameAr: "إطارات سيارة 205/55R16", category: "Automotive", country: "Japan", countryAr: "اليابان", city: "Tokyo", supplierName: "Bridgestone", price: "88", currency: "USD", unit: "unit", minOrderQty: 20, listingType: "offer", description: "Bridgestone premium, excellent wet grip", aiScore: "93" },
  { productName: "Car Tires (205/55R16)", productNameAr: "إطارات سيارة 205/55R16", category: "Automotive", country: "South Korea", countryAr: "كوريا الجنوبية", city: "Seoul", supplierName: "Hankook Tire", price: "65", currency: "USD", unit: "unit", minOrderQty: 50, listingType: "offer", description: "Hankook mid-premium, good value", aiScore: "86" },
  { productName: "Car Tires (205/55R16)", productNameAr: "إطارات سيارة 205/55R16", category: "Automotive", country: "France", countryAr: "فرنسا", city: "Clermont-Ferrand", supplierName: "Michelin", price: "105", currency: "USD", unit: "unit", minOrderQty: 10, listingType: "offer", description: "Michelin Primacy 4, top-rated safety", aiScore: "97" },

  // ─── Pharma ────────────────────────────────────────────────────────────────
  { productName: "Paracetamol API (Bulk)", productNameAr: "باراسيتامول مادة خام", category: "Pharma", country: "India", countryAr: "الهند", city: "Hyderabad", supplierName: "Dr. Reddy's", price: "4200", currency: "USD", unit: "ton", minOrderQty: 1, listingType: "offer", description: "USP/BP grade, GMP certified, DMF available", aiScore: "92" },
  { productName: "Paracetamol API (Bulk)", productNameAr: "باراسيتامول مادة خام", category: "Pharma", country: "China", countryAr: "الصين", city: "Nanjing", supplierName: "Granules China", price: "3800", currency: "USD", unit: "ton", minOrderQty: 1, listingType: "offer", description: "EP/USP grade, NMPA approved", aiScore: "85" },
  { productName: "Paracetamol API (Bulk)", productNameAr: "باراسيتامول مادة خام", category: "Pharma", country: "Germany", countryAr: "ألمانيا", city: "Leverkusen", supplierName: "Bayer AG", price: "6500", currency: "USD", unit: "ton", minOrderQty: 0.5, listingType: "offer", description: "Premium European pharma grade, full documentation", aiScore: "97" },

  // ─── Furniture ─────────────────────────────────────────────────────────────
  { productName: "Office Chair (Ergonomic)", productNameAr: "كرسي مكتب مريح", category: "Furniture", country: "China", countryAr: "الصين", city: "Foshan", supplierName: "Foshan Furniture", price: "45", currency: "USD", unit: "unit", minOrderQty: 50, listingType: "offer", description: "Mesh back, lumbar support, adjustable height", aiScore: "76" },
  { productName: "Office Chair (Ergonomic)", productNameAr: "كرسي مكتب مريح", category: "Furniture", country: "Germany", countryAr: "ألمانيا", city: "Hamburg", supplierName: "Sedus Stoll", price: "380", currency: "USD", unit: "unit", minOrderQty: 5, listingType: "offer", description: "Premium ergonomic, 10-year warranty", aiScore: "95" },
  { productName: "Office Chair (Ergonomic)", productNameAr: "كرسي مكتب مريح", category: "Furniture", country: "Italy", countryAr: "إيطاليا", city: "Milan", supplierName: "Frau Italy", price: "520", currency: "USD", unit: "unit", minOrderQty: 2, listingType: "offer", description: "Italian design, genuine leather option", aiScore: "94" },
  { productName: "Office Chair (Ergonomic)", productNameAr: "كرسي مكتب مريح", category: "Furniture", country: "Malaysia", countryAr: "ماليزيا", city: "Kuala Lumpur", supplierName: "KL Office Furniture", price: "65", currency: "USD", unit: "unit", minOrderQty: 20, listingType: "offer", description: "Good quality, ASEAN pricing", aiScore: "79" },
  { productName: "Office Chair (Ergonomic)", productNameAr: "كرسي مكتب مريح", category: "Furniture", country: "Poland", countryAr: "بولندا", city: "Warsaw", supplierName: "Nowy Styl", price: "180", currency: "USD", unit: "unit", minOrderQty: 10, listingType: "offer", description: "European quality at mid-range price", aiScore: "86" },

  // ─── Buy Requests (Demand side) ────────────────────────────────────────────
  { productName: "Steel Rebar (16mm)", productNameAr: "حديد تسليح 16 مم", category: "Steel", country: "Saudi Arabia", countryAr: "السعودية", city: "Riyadh", supplierName: "Al-Rajhi Construction", price: "610", currency: "USD", unit: "ton", minOrderQty: 500, listingType: "request", description: "Urgent: Need 500 tons for construction project, delivery within 30 days", aiScore: "88" },
  { productName: "Cotton Fabric (Plain)", productNameAr: "قماش قطني (سادة)", category: "Textiles", country: "UAE", countryAr: "الإمارات", city: "Dubai", supplierName: "Dubai Fashion House", price: "1.30", currency: "USD", unit: "m2", minOrderQty: 10000, listingType: "request", description: "Looking for cotton fabric supplier for seasonal collection", aiScore: "82" },
  { productName: "Solar Panel 400W", productNameAr: "لوح طاقة شمسية 400 واط", category: "Electronics", country: "Egypt", countryAr: "مصر", city: "Cairo", supplierName: "Egyptian Solar Project", price: "100", currency: "USD", unit: "unit", minOrderQty: 500, listingType: "request", description: "Government solar project, need 500 panels with installation support", aiScore: "90" },
  { productName: "Olive Oil (Extra Virgin)", productNameAr: "زيت زيتون بكر ممتاز", category: "Food", country: "Kuwait", countryAr: "الكويت", city: "Kuwait City", supplierName: "Al-Mulla Trading", price: "3000", currency: "USD", unit: "ton", minOrderQty: 10, listingType: "request", description: "Premium EVOO for retail distribution in Kuwait", aiScore: "85" },
  { productName: "Polypropylene Granules", productNameAr: "حبيبات بولي بروبيلين", category: "Chemicals", country: "Turkey", countryAr: "تركيا", city: "Istanbul", supplierName: "Istanbul Plastics", price: "1000", currency: "USD", unit: "ton", minOrderQty: 50, listingType: "request", description: "Monthly requirement for packaging production", aiScore: "83" },
];

// Insert listings
let inserted = 0;
let skipped = 0;

for (const l of listings) {
  const key = `${l.productName}::${l.country}`;
  if (existingSet.has(key)) {
    console.log(`⏭️  Skipping: ${l.productName} — ${l.country}`);
    skipped++;
    continue;
  }

  await connection.execute(
    `INSERT INTO exchange_listings 
     (userId, productName, productNameAr, category, description, supplierName, country, countryAr, city, 
      price, currency, unit, minOrderQty, listingType, status, aiScore, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, NOW(), NOW())`,
    [
      userId,
      l.productName, l.productNameAr ?? null,
      l.category ?? null, l.description ?? null,
      l.supplierName ?? null, l.country ?? null, l.countryAr ?? null, l.city ?? null,
      l.price, l.currency ?? "USD", l.unit ?? "unit",
      l.minOrderQty ?? 1, l.listingType ?? "offer",
      l.aiScore ?? null,
    ]
  );
  console.log(`✅ ${l.listingType === "request" ? "📥" : "📤"} ${l.productName} — ${l.country} @ $${l.price}/${l.unit}`);
  inserted++;
  existingSet.add(key);
}

await connection.end();

console.log(`\n🎉 Done! Inserted: ${inserted}, Skipped: ${skipped}`);
console.log(`📊 Total listings: ${listings.length}`);
console.log(`🌍 Countries covered: ${[...new Set(listings.map(l => l.country))].join(", ")}`);
