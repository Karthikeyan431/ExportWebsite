/**
 * TURMERIC EXPORT PLATFORM - DEMO DATA
 * All data below is placeholder/demo data
 * Replace with real data via Admin Panel
 */

const DEMO_DATA = {
    // Company Settings (Brand-Agnostic)
    company: {
        name: "Premium Turmeric Exporter",
        tagline: "Farm-to-Export Traceable Turmeric",
        subtitle: "Premium • Organic • Transparent • Export-Ready",
        email: "export@example.com",
        phone: "+91-XXXX XXXXX",
        address: "Demo Address - Replace via Admin",
        whatsapp: "+91-XXXXXXXXXX",
        iec: "Demo IEC - Replace",
        fssai: "Demo FSSAI - Replace",
        apeda: "Demo APEDA - Replace",
        logo_text: "TURMEX"
    },

    // Demo Batches for Traceability
    batches: [
        {
            id: "BT-2024-001",
            name: "Organic Turmeric Fingers - Premium Grade",
            farm_location: "Erode Region, Tamil Nadu, India",
            harvest_date: "2024-01-15",
            processing_method: "Traditional Sun-Dried",
            curcumin: "5.2%",
            moisture: "8.5%",
            grade: "Premium",
            origin: "Southern India",
            lab_report: null, // Demo - no PDF
            status: "Available",
            qr_data: "BT-2024-001"
        },
        {
            id: "BT-2024-002",
            name: "Polished Turmeric - Grade A",
            farm_location: "Sangli Region, Maharashtra, India",
            harvest_date: "2024-02-10",
            processing_method: "Machine Polished",
            curcumin: "4.8%",
            moisture: "9.2%",
            grade: "Grade A",
            origin: "Western India",
            lab_report: null,
            status: "Available",
            qr_data: "BT-2024-002"
        },
        {
            id: "BT-2024-003",
            name: "Raw Turmeric Fingers - Export Grade",
            farm_location: "Jalgaon Region, Maharashtra, India",
            harvest_date: "2024-03-05",
            processing_method: "Hand Sorted",
            curcumin: "4.5%",
            moisture: "10.0%",
            grade: "Export Grade",
            origin: "Central India",
            lab_report: null,
            status: "In Transit",
            qr_data: "BT-2024-003"
        },
        {
            id: "BT-2024-004",
            name: "Organic Turmeric Fingers - Handpicked",
            farm_location: "Erode Region, Tamil Nadu, India",
            harvest_date: "2024-03-20",
            processing_method: "Hand Harvested & Sun-Dried",
            curcumin: "5.5%",
            moisture: "7.8%",
            grade: "Premium Organic",
            origin: "Southern India",
            lab_report: null,
            status: "Available",
            qr_data: "BT-2024-004"
        }
    ],

    // Demo Products
    products: [
        {
            id: "raw-fingers",
            name: "Raw Turmeric Fingers",
            description: "Natural sun-dried turmeric fingers with authentic flavor and aroma. Ideal for grinding and processing.",
            origin: "Southern & Western India",
            grades: ["Premium", "Grade A", "Export Grade"],
            curcumin_range: "4.0% - 5.5%",
            moisture: "8-12%",
            moq: "500 kg",
            packaging: ["25kg PP bags", "50kg Jute bags", "Bulk containers"],
            uses: ["Grinding", "Extraction", "Export processing"],
            image: null
        },
        {
            id: "polished-turmeric",
            name: "Polished Turmeric",
            description: "Machine polished turmeric with enhanced appearance and consistent quality. Perfect for direct consumer packaging.",
            origin: "Maharashtra, India",
            grades: ["Grade A", "Grade B"],
            curcumin_range: "3.5% - 4.8%",
            moisture: "9-11%",
            moq: "1000 kg",
            packaging: ["1kg Consumer packs", "5kg Family packs", "25kg Bulk bags"],
            uses: ["Consumer packaging", "Food industry", "Retail"],
            image: null
        },
        {
            id: "turmeric-powder",
            name: "Turmeric Powder (Coming Soon)",
            description: "Ready-to-use turmeric powder with standardized curcumin content. Perfect for international markets.",
            origin: "India",
            grades: ["Standard", "Premium"],
            curcumin_range: "3.0% - 5.0%",
            moisture: "Max 10%",
            moq: "500 kg",
            packaging: ["500g Retail", "1kg Family", "25kg Bulk"],
            uses: ["Cooking", "Food industry", "Supplements"],
            image: null,
            coming_soon: true
        }
    ],

    // Demo Lab Reports Summary
    lab_reports: [
        {
            batch_id: "BT-2024-001",
            curcumin: "5.2%",
            moisture: "8.5%",
            volatile_oil: "4.2%",
            ash: "5.8%",
            lead: "< 0.5 ppm",
            arsenic: "< 0.1 ppm",
            cadmium: "< 0.1 ppm",
            mercury: "< 0.05 ppm",
            aerobic_plate_count: "< 10^4 CFU/g",
            yeast_mold: "< 10^3 CFU/g",
            ecoli: "Absent",
            salmonella: "Absent",
            report_date: "2024-01-25",
            lab_name: "Demo Testing Lab - Replace"
        },
        {
            batch_id: "BT-2024-002",
            curcumin: "4.8%",
            moisture: "9.2%",
            volatile_oil: "3.8%",
            ash: "5.5%",
            lead: "< 0.5 ppm",
            arsenic: "< 0.1 ppm",
            cadmium: "< 0.1 ppm",
            mercury: "< 0.05 ppm",
            aerobic_plate_count: "< 10^4 CFU/g",
            yeast_mold: "< 10^3 CFU/g",
            ecoli: "Absent",
            salmonella: "Absent",
            report_date: "2024-02-20",
            lab_name: "Demo Testing Lab - Replace"
        }
    ],

    // Demo Certificates
    certificates: [
        {
            id: "iec",
            name: "Import Export Code (IEC)",
            number: "Demo IEC: XXXXXX",
            issuing_authority: "Directorate General of Foreign Trade",
            valid_until: "2025-12-31",
            description: "Mandatory registration for export businesses in India",
            file: null
        },
        {
            id: "fssai",
            name: "FSSAI License",
            number: "Demo FSSAI: XXXXXXX",
            issuing_authority: "Food Safety and Standards Authority of India",
            valid_until: "2026-06-30",
            description: "Food safety certification for turmeric exports",
            file: null
        },
        {
            id: "apeda",
            name: "APEDA Registration",
            number: "Demo APEDA: XXXXXX",
            issuing_authority: "Agricultural and Processed Food Products Export Development Authority",
            valid_until: "2025-09-30",
            description: "Certification for agricultural product exports",
            file: null
        },
        {
            id: "organic",
            name: "Organic Certification",
            number: "Demo Organic Certificate",
            issuing_authority: "India Organic / NPOP",
            valid_until: "2025-03-31",
            description: "Certified organic turmeric production",
            file: null
        }
    ],

    // Demo Knowledge Hub Articles
    knowledge_articles: [
        {
            id: "turmeric-benefits",
            title: "Health Benefits of Turmeric",
            category: "General",
            content: "Turmeric contains curcumin, which has powerful anti-inflammatory and antioxidant properties...",
            hs_code: "0910.30",
            last_updated: "2024-03-01"
        },
        {
            id: "hs-codes",
            title: "HS Codes for Turmeric Export",
            category: "Export Guide",
            content: "Understanding HS codes is crucial for international trade. Turmeric falls under Chapter 09...",
            hs_code: "0910.30",
            last_updated: "2024-02-15"
        },
        {
            id: "import-rules-eu",
            title: "EU Import Regulations for Turmeric",
            category: "Regulations",
            content: "The European Union has specific regulations for imported spices including turmeric...",
            hs_code: "0910.30",
            last_updated: "2024-03-10"
        },
        {
            id: "import-rules-usa",
            title: "US Import Regulations for Turmeric",
            category: "Regulations",
            content: "FDA requirements for turmeric imports to the United States...",
            hs_code: "0910.30",
            last_updated: "2024-02-28"
        },
        {
            id: "storage-guidelines",
            title: "Storage & Shelf Life Guidelines",
            category: "Storage",
            content: "Proper storage is essential to maintain turmeric quality and extend shelf life...",
            hs_code: "0910.30",
            last_updated: "2024-01-20"
        },
        {
            id: "market-trends",
            title: "Global Turmeric Market Trends 2024",
            category: "Market",
            content: "Analysis of global demand trends and price movements in the turmeric market...",
            hs_code: "0910.30",
            last_updated: "2024-03-15"
        }
    ],

    // Homepage Hero Slides
    hero_slides: [
        {
            headline: "Farm-to-Export Traceable Turmeric",
            subheadline: "Premium quality, transparent sourcing, export-ready",
            cta: "View Batch Quality",
            cta_link: "batch-traceability.html"
        },
        {
            headline: "Certified Organic Turmeric",
            subheadline: "Ethically sourced, sustainably grown",
            cta: "Request Quote",
            cta_link: "request-quote.html"
        },
        {
            headline: "Complete Traceability",
            subheadline: "Know your turmeric's journey from farm to port",
            cta: "Learn More",
            cta_link: "about.html"
        }
    ]
};

// Admin State (stored in localStorage for demo)
const ADMIN_DATA = {
    company: { ...DEMO_DATA.company },
    batches: [...DEMO_DATA.batches],
    products: [...DEMO_DATA.products],
    lab_reports: [...DEMO_DATA.lab_reports],
    certificates: [...DEMO_DATA.certificates],
    knowledge_articles: [...DEMO_DATA.knowledge_articles],
    quotes: []
};

// Initialize admin data from localStorage
function initAdminData() {
    const stored = localStorage.getItem('turmeric_admin_data');
    if (stored) {
        Object.assign(ADMIN_DATA, JSON.parse(stored));
    }
}

// Save admin data to localStorage
function saveAdminData() {
    localStorage.setItem('turmeric_admin_data', JSON.stringify(ADMIN_DATA));
}

// Get current data (either from admin or demo)
function getData() {
    initAdminData();
    return {
        company: ADMIN_DATA.company,
        batches: ADMIN_DATA.batches,
        products: ADMIN_DATA.products,
        lab_reports: ADMIN_DATA.lab_reports,
        certificates: ADMIN_DATA.certificates,
        knowledge_articles: ADMIN_DATA.knowledge_articles,
        hero_slides: DEMO_DATA.hero_slides
    };
}

// Demo mode indicator
const IS_DEMO = true;
