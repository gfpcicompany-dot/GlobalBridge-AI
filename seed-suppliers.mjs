/**
 * Seed script: Add global e-commerce platform suppliers from the PDF report
 * Source: "تقرير شامل حول أفضل منصات التجارة الإلكترونية العالمية"
 *
 * Run: node seed-suppliers.mjs
 */

import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL not set");
  process.exit(1);
}

// Parse DATABASE_URL
const url = new URL(DATABASE_URL);
const connection = await mysql.createConnection({
  host: url.hostname,
  port: parseInt(url.port) || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: { rejectUnauthorized: false },
});

// Get the first user ID (owner)
const [userRows] = await connection.execute("SELECT id FROM users ORDER BY id LIMIT 1");
if (!userRows.length) {
  console.error("❌ No users found. Please log in first.");
  process.exit(1);
}
const userId = userRows[0].id;
console.log(`✅ Using userId: ${userId}`);

// Check existing suppliers to avoid duplicates
const [existingRows] = await connection.execute(
  "SELECT name FROM suppliers WHERE userId = ?",
  [userId]
);
const existingNames = new Set(existingRows.map(r => r.name));

// Suppliers data extracted from the PDF report
const suppliers = [
  // ─── Global Platforms ─────────────────────────────────────────────────────
  {
    name: "Amazon",
    nameAr: "أمازون",
    country: "USA",
    category: "منصة تجارة إلكترونية عالمية",
    email: "seller-support@amazon.com",
    phone: "+1-888-280-4331",
    website: "https://www.amazon.com",
    rating: "4.80",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "premium",
    notes: "Largest global e-commerce platform. Offers a wide range of products and services. Marketplace for B2C and B2B.",
    notesAr: "أكبر منصة تجارة إلكترونية في العالم. توفر مجموعة واسعة من المنتجات والخدمات. سوق للبيع بالتجزئة والجملة.",
    products: JSON.stringify(["Electronics", "Fashion", "Home & Garden", "Books", "Toys", "Groceries", "Cloud Services (AWS)"]),
    priceRange: JSON.stringify({ min: 1, max: 100000, currency: "USD" }),
    verificationData: JSON.stringify({ type: "global_marketplace", founded: 1994, employees: "1.5M+", annualRevenue: "$514B", monthlyVisitors: "2.7B" }),
  },
  {
    name: "eBay",
    nameAr: "إيباي",
    country: "USA",
    category: "منصة مزادات وبيع مباشر",
    email: "support@ebay.com",
    phone: "+1-866-540-3229",
    website: "https://www.ebay.com",
    rating: "4.20",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "premium",
    notes: "Famous platform for auctions and direct sales of new and used products worldwide.",
    notesAr: "منصة شهيرة للمزادات والبيع المباشر للمنتجات الجديدة والمستعملة حول العالم.",
    products: JSON.stringify(["Electronics", "Fashion", "Collectibles", "Motors", "Home & Garden", "Used Goods"]),
    priceRange: JSON.stringify({ min: 1, max: 50000, currency: "USD" }),
    verificationData: JSON.stringify({ type: "auction_marketplace", founded: 1995, employees: "11,600", annualRevenue: "$10.1B", monthlyVisitors: "600M" }),
  },
  {
    name: "Shopify",
    nameAr: "شوبيفاي",
    country: "Canada",
    category: "منصة بناء متاجر إلكترونية",
    email: "support@shopify.com",
    phone: "+1-888-746-7439",
    website: "https://www.shopify.com",
    rating: "4.60",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "premium",
    notes: "Integrated platform that enables individuals and companies to create and manage their own online stores.",
    notesAr: "منصة متكاملة تمكّن الأفراد والشركات من إنشاء وإدارة متاجرهم الإلكترونية الخاصة.",
    products: JSON.stringify(["E-commerce Platform", "Payment Processing", "Inventory Management", "Marketing Tools", "Analytics"]),
    priceRange: JSON.stringify({ min: 29, max: 2000, currency: "USD", note: "Monthly subscription" }),
    verificationData: JSON.stringify({ type: "saas_ecommerce", founded: 2006, employees: "10,000+", annualRevenue: "$7.1B", merchants: "1.7M+" }),
  },
  {
    name: "Etsy",
    nameAr: "إتسي",
    country: "USA",
    category: "منصة المنتجات اليدوية والفريدة",
    email: "support@etsy.com",
    phone: "+1-718-855-7955",
    website: "https://www.etsy.com",
    rating: "4.10",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "standard",
    notes: "Specialized marketplace for selling handmade, vintage, and unique gift products.",
    notesAr: "سوق متخصص في بيع المنتجات اليدوية والعتيقة والهدايا الفريدة.",
    products: JSON.stringify(["Handmade Crafts", "Vintage Items", "Art & Collectibles", "Jewelry", "Home Decor", "Gifts"]),
    priceRange: JSON.stringify({ min: 5, max: 5000, currency: "USD" }),
    verificationData: JSON.stringify({ type: "niche_marketplace", founded: 2005, employees: "2,700", annualRevenue: "$2.7B", activeSellers: "7.5M" }),
  },

  // ─── China Platforms ───────────────────────────────────────────────────────
  {
    name: "Alibaba",
    nameAr: "علي بابا",
    country: "China",
    category: "منصة B2B للتجارة الدولية",
    email: "service@alibaba.com",
    phone: "+86-571-8502-2088",
    website: "https://www.alibaba.com",
    rating: "4.70",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "premium",
    notes: "World's largest B2B e-commerce platform connecting manufacturers and wholesalers with global buyers.",
    notesAr: "أكبر منصة B2B للتجارة الإلكترونية في العالم تربط المصنعين وتجار الجملة بالمشترين العالميين.",
    products: JSON.stringify(["Manufacturing", "Wholesale", "Electronics", "Textiles", "Machinery", "Chemicals", "Agriculture"]),
    priceRange: JSON.stringify({ min: 100, max: 1000000, currency: "USD", note: "Minimum order quantities apply" }),
    verificationData: JSON.stringify({ type: "b2b_marketplace", founded: 1999, employees: "240,000", annualRevenue: "$126B", activeSuppliers: "200,000+" }),
  },
  {
    name: "Taobao (淘宝)",
    nameAr: "تاوباو",
    country: "China",
    category: "منصة C2C صينية",
    email: "support@taobao.com",
    phone: "+86-571-8888-8888",
    website: "https://www.taobao.com",
    rating: "4.30",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "premium",
    notes: "Largest C2C platform in China, famous for diverse products at competitive prices. 200.4M monthly visits.",
    notesAr: "أكبر منصة C2C في الصين، مشهورة بتنوع المنتجات والأسعار التنافسية. 200.4 مليون زيارة شهرية.",
    products: JSON.stringify(["Fashion", "Electronics", "Home & Living", "Beauty", "Sports", "Food & Beverages"]),
    priceRange: JSON.stringify({ min: 1, max: 10000, currency: "CNY" }),
    verificationData: JSON.stringify({ type: "c2c_marketplace", founded: 2003, parent: "Alibaba Group", monthlyVisitors: "200.4M", activeSellers: "10M+" }),
  },
  {
    name: "JD.com (京东)",
    nameAr: "جي دي دوت كوم",
    country: "China",
    category: "منصة B2C متخصصة في الإلكترونيات",
    email: "service@jd.com",
    phone: "+86-10-8911-8888",
    website: "https://www.jd.com",
    rating: "4.50",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "premium",
    notes: "B2C platform focused on electronics and appliances with a strong and fast logistics network. 91.4M monthly visits.",
    notesAr: "منصة B2C تركز على الإلكترونيات والأجهزة وتتميز بشبكة لوجستية قوية وسريعة. 91.4 مليون زيارة شهرية.",
    products: JSON.stringify(["Electronics", "Appliances", "Computers", "Mobile Phones", "Fashion", "Fresh Food"]),
    priceRange: JSON.stringify({ min: 10, max: 100000, currency: "CNY" }),
    verificationData: JSON.stringify({ type: "b2c_marketplace", founded: 1998, employees: "300,000+", annualRevenue: "$134B", monthlyVisitors: "91.4M" }),
  },
  {
    name: "Tmall (天猫)",
    nameAr: "تي مول",
    country: "China",
    category: "منصة B2C للعلامات التجارية الكبرى",
    email: "support@tmall.com",
    phone: "+86-571-8502-2088",
    website: "https://www.tmall.com",
    rating: "4.40",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "premium",
    notes: "B2C platform affiliated with Alibaba Group for major commercial brands and high-quality products. 73.9M monthly visits.",
    notesAr: "منصة B2C تابعة لمجموعة علي بابا للعلامات التجارية الكبرى والمنتجات عالية الجودة. 73.9 مليون زيارة شهرية.",
    products: JSON.stringify(["Luxury Brands", "Fashion", "Beauty", "Electronics", "Home Appliances", "International Brands"]),
    priceRange: JSON.stringify({ min: 50, max: 500000, currency: "CNY" }),
    verificationData: JSON.stringify({ type: "b2c_marketplace", founded: 2008, parent: "Alibaba Group", monthlyVisitors: "73.9M", brands: "180,000+" }),
  },
  {
    name: "Pinduoduo (拼多多)",
    nameAr: "بين دودو",
    country: "China",
    category: "منصة التسوق الاجتماعي",
    email: "support@pinduoduo.com",
    phone: "+86-21-3396-0000",
    website: "https://www.pinduoduo.com",
    rating: "4.00",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "standard",
    notes: "Relies on group buying model providing lower prices for buyers. 720M active users.",
    notesAr: "تعتمد على نموذج التسوق الجماعي مما يوفر أسعاراً أقل للمشترين. 720 مليون مستخدم نشط.",
    products: JSON.stringify(["Agriculture", "Fresh Food", "Fashion", "Electronics", "Home Goods", "Daily Necessities"]),
    priceRange: JSON.stringify({ min: 1, max: 5000, currency: "CNY" }),
    verificationData: JSON.stringify({ type: "social_commerce", founded: 2015, employees: "13,000+", annualRevenue: "$18.9B", activeUsers: "720M" }),
  },
  {
    name: "1688.com",
    nameAr: "1688 دوت كوم",
    country: "China",
    category: "منصة B2B للبيع بالجملة الصيني",
    email: "service@1688.com",
    phone: "+86-571-8888-8888",
    website: "https://www.1688.com",
    rating: "4.20",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "standard",
    notes: "B2B wholesale platform connecting Chinese manufacturers and wholesalers with buyers. 40.5M monthly visits.",
    notesAr: "منصة للبيع بالجملة تربط المصنعين والموردين الصينيين بالمشترين. 40.5 مليون زيارة شهرية.",
    products: JSON.stringify(["Raw Materials", "Manufacturing", "Wholesale Goods", "Textiles", "Electronics Components", "Packaging"]),
    priceRange: JSON.stringify({ min: 50, max: 500000, currency: "CNY", note: "Wholesale prices" }),
    verificationData: JSON.stringify({ type: "b2b_wholesale", founded: 1999, parent: "Alibaba Group", monthlyVisitors: "40.5M", suppliers: "2M+" }),
  },
  {
    name: "AliExpress",
    nameAr: "علي إكسبريس",
    country: "China",
    category: "منصة تجزئة دولية",
    email: "support@aliexpress.com",
    phone: "+86-571-8502-2088",
    website: "https://www.aliexpress.com",
    rating: "4.10",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "premium",
    notes: "International retail platform by Alibaba Group targeting global consumers with competitive prices from Chinese suppliers.",
    notesAr: "منصة تجزئة دولية من مجموعة علي بابا تستهدف المستهلكين العالميين بأسعار تنافسية من الموردين الصينيين.",
    products: JSON.stringify(["Electronics", "Fashion", "Home & Garden", "Toys", "Sports", "Beauty", "Automotive"]),
    priceRange: JSON.stringify({ min: 1, max: 10000, currency: "USD" }),
    verificationData: JSON.stringify({ type: "b2c_international", founded: 2010, parent: "Alibaba Group", monthlyVisitors: "500M+", countries: "200+" }),
  },

  // ─── Europe Platforms ──────────────────────────────────────────────────────
  {
    name: "Zalando",
    nameAr: "زالاندو",
    country: "Germany",
    category: "منصة الأزياء الأوروبية",
    email: "partner@zalando.com",
    phone: "+49-30-2000-1020",
    website: "https://www.zalando.com",
    rating: "4.30",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "premium",
    notes: "Leading European platform for selling fashion, shoes, and accessories in Europe.",
    notesAr: "منصة رائدة في بيع الأزياء والأحذية والإكسسوارات في أوروبا.",
    products: JSON.stringify(["Fashion", "Shoes", "Accessories", "Sports Wear", "Beauty", "Kids Fashion"]),
    priceRange: JSON.stringify({ min: 10, max: 2000, currency: "EUR" }),
    verificationData: JSON.stringify({ type: "fashion_marketplace", founded: 2008, employees: "17,000+", annualRevenue: "$10.3B", countries: "25 European countries" }),
  },
  {
    name: "ASOS",
    nameAr: "أسوس",
    country: "United Kingdom",
    category: "منصة الأزياء الشبابية",
    email: "partnershipteam@asos.com",
    phone: "+44-20-7756-1000",
    website: "https://www.asos.com",
    rating: "4.20",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "premium",
    notes: "Famous destination for modern and youthful fashion targeting young adults globally.",
    notesAr: "وجهة شهيرة للأزياء العصرية والشبابية تستهدف الشباب حول العالم.",
    products: JSON.stringify(["Fashion", "Beauty", "Accessories", "Sportswear", "Shoes", "Activewear"]),
    priceRange: JSON.stringify({ min: 5, max: 500, currency: "GBP" }),
    verificationData: JSON.stringify({ type: "fashion_marketplace", founded: 2000, employees: "3,500+", annualRevenue: "$4.5B", activeCustomers: "25M+" }),
  },
  {
    name: "Carrefour",
    nameAr: "كارفور",
    country: "France",
    category: "تجزئة شاملة - فرنسا",
    email: "ecommerce@carrefour.com",
    phone: "+33-1-5363-7000",
    website: "https://www.carrefour.com",
    rating: "4.00",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "premium",
    notes: "French retail giant offering a wide range of comprehensive retail products via the internet.",
    notesAr: "عملاق التجزئة الفرنسي يقدم مجموعة واسعة من منتجات التجزئة الشاملة عبر الإنترنت.",
    products: JSON.stringify(["Groceries", "Electronics", "Home Appliances", "Fashion", "Health & Beauty", "Sports"]),
    priceRange: JSON.stringify({ min: 1, max: 5000, currency: "EUR" }),
    verificationData: JSON.stringify({ type: "retail_chain", founded: 1958, employees: "320,000+", annualRevenue: "$91B", countries: "30+" }),
  },
  {
    name: "Fruugo",
    nameAr: "فروغو",
    country: "United Kingdom",
    category: "منصة تسوق دولية متعددة الفئات",
    email: "retailers@fruugo.com",
    phone: "+44-131-608-0000",
    website: "https://www.fruugo.com",
    rating: "3.90",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "standard",
    notes: "Global platform that allows buyers to purchase products from sellers in all parts of the world across multiple categories.",
    notesAr: "منصة عالمية تتيح للمشترين شراء منتجات متعددة الفئات من بائعين في جميع أنحاء العالم.",
    products: JSON.stringify(["Fashion", "Electronics", "Home & Garden", "Sports", "Toys", "Health & Beauty"]),
    priceRange: JSON.stringify({ min: 5, max: 2000, currency: "GBP" }),
    verificationData: JSON.stringify({ type: "global_marketplace", founded: 2006, countries: "42+", languages: "28", currencies: "30+" }),
  },

  // ─── Payment Gateways as Suppliers ────────────────────────────────────────
  {
    name: "PayPal",
    nameAr: "باي بال",
    country: "USA",
    category: "بوابة دفع إلكتروني عالمية",
    email: "merchant@paypal.com",
    phone: "+1-888-221-1161",
    website: "https://www.paypal.com",
    rating: "4.50",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "premium",
    notes: "Most famous global payment gateway, distinguished by ease of use and high security.",
    notesAr: "بوابة الدفع الأكثر شهرة عالمياً، تتميز بسهولة الاستخدام والأمان العالي.",
    products: JSON.stringify(["Online Payments", "Money Transfer", "Merchant Services", "Buy Now Pay Later", "Crypto"]),
    priceRange: JSON.stringify({ min: 0, max: 0, currency: "USD", note: "Transaction fees: 2.9% + $0.30" }),
    verificationData: JSON.stringify({ type: "payment_gateway", founded: 1998, employees: "29,900", annualRevenue: "$29.8B", activeAccounts: "435M+" }),
  },
  {
    name: "Stripe",
    nameAr: "سترايب",
    country: "USA",
    category: "بوابة دفع للمطورين والشركات الناشئة",
    email: "support@stripe.com",
    phone: "+1-888-926-2289",
    website: "https://www.stripe.com",
    rating: "4.70",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "premium",
    notes: "Popular choice for developers and startups, provides strong and customizable application programming interfaces.",
    notesAr: "خيار شائع للمطورين والشركات الناشئة، يوفر واجهات برمجة تطبيقات قوية وقابلة للتخصيص.",
    products: JSON.stringify(["Payment Processing", "Billing & Subscriptions", "Fraud Prevention", "Financial Infrastructure", "Issuing Cards"]),
    priceRange: JSON.stringify({ min: 0, max: 0, currency: "USD", note: "Transaction fees: 2.9% + $0.30" }),
    verificationData: JSON.stringify({ type: "payment_gateway", founded: 2010, employees: "8,000+", valuation: "$50B", countries: "46+" }),
  },
  {
    name: "Alipay (支付宝)",
    nameAr: "علي باي",
    country: "China",
    category: "بوابة دفع محمول صينية",
    email: "merchant@alipay.com",
    phone: "+86-571-8888-8888",
    website: "https://www.alipay.com",
    rating: "4.60",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "premium",
    notes: "Affiliated with Alibaba Group, it is the largest mobile phone payment platform in China and the world.",
    notesAr: "تابعة لمجموعة علي بابا، وهي أكبر منصة دفع عبر الهاتف المحمول في الصين والعالم.",
    products: JSON.stringify(["Mobile Payments", "QR Code Payments", "International Transfers", "Financial Services", "Insurance"]),
    priceRange: JSON.stringify({ min: 0, max: 0, currency: "CNY", note: "Transaction-based fees" }),
    verificationData: JSON.stringify({ type: "payment_gateway", founded: 2004, parent: "Ant Group / Alibaba", activeUsers: "1.3B+", countries: "200+" }),
  },
  {
    name: "WeChat Pay (微信支付)",
    nameAr: "وي شات باي",
    country: "China",
    category: "بوابة دفع مدمجة في وي شات",
    email: "wechatpay@tencent.com",
    phone: "+86-755-8601-3388",
    website: "https://pay.weixin.qq.com",
    rating: "4.40",
    isVerified: true,
    verificationStatus: "verified",
    verificationLevel: "standard",
    notes: "Integrated in WeChat app, widely used in all aspects of daily life in China.",
    notesAr: "مدمجة في تطبيق WeChat، تُستخدم على نطاق واسع في جميع جوانب الحياة اليومية في الصين.",
    products: JSON.stringify(["Mobile Payments", "In-App Purchases", "QR Payments", "Mini Programs Commerce", "Red Packets"]),
    priceRange: JSON.stringify({ min: 0, max: 0, currency: "CNY", note: "Transaction-based fees" }),
    verificationData: JSON.stringify({ type: "payment_gateway", founded: 2013, parent: "Tencent", activeUsers: "900M+", monthlyTransactions: "1B+" }),
  },
];

// Insert suppliers
let inserted = 0;
let skipped = 0;

for (const s of suppliers) {
  if (existingNames.has(s.name)) {
    console.log(`⏭️  Skipping (already exists): ${s.name}`);
    skipped++;
    continue;
  }

  await connection.execute(
    `INSERT INTO suppliers 
     (userId, name, nameAr, country, category, email, phone, website, rating, isVerified, 
      verificationStatus, verificationLevel, products, priceRange, notes, notesAr, 
      verificationData, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [
      userId,
      s.name,
      s.nameAr,
      s.country,
      s.category,
      s.email,
      s.phone,
      s.website,
      s.rating,
      s.isVerified ? 1 : 0,
      s.verificationStatus,
      s.verificationLevel,
      s.products,
      s.priceRange,
      s.notes,
      s.notesAr,
      s.verificationData,
    ]
  );
  console.log(`✅ Inserted: ${s.name} (${s.nameAr}) — ${s.country}`);
  inserted++;
}

await connection.end();

console.log(`\n🎉 Done! Inserted: ${inserted}, Skipped: ${skipped}`);
console.log(`📊 Total suppliers from PDF report: ${suppliers.length}`);
