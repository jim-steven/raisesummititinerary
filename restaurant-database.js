// Hardcoded restaurant database
const restaurantDatabase = [
    {
        id: 1,
        name: "Le Denti",
        cuisine: "French/Mediterranean",
        priceRange: "€€€",
        distance: "0.3 km",
        reservation: "https://www.facebook.com/ledentiannecy/",
        vibe: "Cozy bistro with Mediterranean influences, intimate setting",
        notableDishes: "Seafood risotto, Lamb tagine, Mediterranean fish",
        notes: "Popular spot, booking recommended. Known for fresh ingredients.",
        images: [
            "https://picsum.photos/400/300?random=1",
            "https://picsum.photos/400/300?random=2", 
            "https://picsum.photos/400/300?random=3",
            "https://picsum.photos/400/300?random=4",
            "https://picsum.photos/400/300?random=5"
        ],
        suitable: ["lunch", "dinner"],
        availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
    },
    {
        id: 2,
        name: "Cozna",
        cuisine: "Contemporary French",
        priceRange: "€€€€",
        distance: "0.8 km",
        reservation: "https://restaurantcozna.com/",
        vibe: "Elegant fine dining, modern atmosphere, sophisticated",
        notableDishes: "Tasting menu, Local lake fish, Seasonal vegetables",
        notes: "Michelin-recommended. Creative cuisine with local ingredients.",
        images: [
            "https://picsum.photos/400/300?random=6",
            "https://picsum.photos/400/300?random=7",
            "https://picsum.photos/400/300?random=8",
            "https://picsum.photos/400/300?random=9",
            "https://picsum.photos/400/300?random=10"
        ],
        suitable: ["dinner"],
        availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
    },
    {
        id: 3,
        name: "Minami",
        cuisine: "Japanese",
        priceRange: "€€€",
        distance: "0.5 km",
        reservation: "https://www.opentable.com/r/minami-annecy",
        vibe: "Modern Japanese, minimalist design, authentic atmosphere",
        notableDishes: "Sushi, Ramen, Tempura, Wagyu beef",
        notes: "Authentic Japanese cuisine. Fresh sushi and traditional dishes.",
        images: [
            "https://picsum.photos/400/300?random=11",
            "https://picsum.photos/400/300?random=12",
            "https://picsum.photos/400/300?random=13",
            "https://picsum.photos/400/300?random=14",
            "https://picsum.photos/400/300?random=15"
        ],
        suitable: ["lunch", "dinner"],
        availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
    },
    {
        id: 4,
        name: "Mama Lise (Chez Mamie Lise)",
        cuisine: "Traditional Savoyard",
        priceRange: "€€",
        distance: "0.4 km",
        reservation: "https://www.tripadvisor.com/Restaurant_Review-g187265-d1751389-Reviews-Chez_Mamie_Lise-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
        vibe: "Traditional mountain chalet atmosphere, rustic and cozy",
        notableDishes: "Fondue Savoyarde, Raclette, Tartiflette, Local cheeses",
        notes: "Family-run restaurant. Perfect for authentic alpine experience.",
        images: [
            "https://picsum.photos/400/300?random=16",
            "https://picsum.photos/400/300?random=17",
            "https://picsum.photos/400/300?random=18",
            "https://picsum.photos/400/300?random=19",
            "https://picsum.photos/400/300?random=20"
        ],
        suitable: ["lunch", "dinner"],
        availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
    },
    {
        id: 5,
        name: "Le Chalet",
        cuisine: "Swiss/Savoyard",
        priceRange: "€€",
        distance: "0.6 km",
        reservation: "https://maps.app.goo.gl/9tSxaDBjaZ4SgHUh9",
        vibe: "Alpine chalet setting, warm and traditional atmosphere",
        notableDishes: "Fondue, Raclette, Rösti, Boeuf Bourguignon",
        notes: "Cozy mountain restaurant. Great for cheese dishes and hearty meals.",
        images: [
            "https://picsum.photos/400/300?random=21",
            "https://picsum.photos/400/300?random=22",
            "https://picsum.photos/400/300?random=23",
            "https://picsum.photos/400/300?random=24",
            "https://picsum.photos/400/300?random=25"
        ],
        suitable: ["lunch", "dinner"],
        availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
    },
    {
        id: 6,
        name: "Le Biboquet",
        cuisine: "French Bistro",
        priceRange: "€€",
        distance: "0.2 km",
        reservation: "https://www.facebook.com/lebiboquetannecy/",
        vibe: "Classic French bistro, lively atmosphere, local favorite",
        notableDishes: "Steak frites, Coq au vin, French onion soup",
        notes: "Popular local bistro. Great for traditional French dishes.",
        images: [
            "https://picsum.photos/400/300?random=26",
            "https://picsum.photos/400/300?random=27",
            "https://picsum.photos/400/300?random=28",
            "https://picsum.photos/400/300?random=29",
            "https://picsum.photos/400/300?random=30"
        ],
        suitable: ["lunch", "dinner"],
        availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
    },
    {
        id: 7,
        name: "Le Freti",
        cuisine: "Savoyard",
        priceRange: "€€",
        distance: "0.3 km",
        reservation: "https://maps.app.goo.gl/sv9QakyBWpxxdzq96",
        vibe: "Authentic mountain restaurant, cozy wooden interior",
        notableDishes: "Tartiflette, Diots (local sausages), Reblochon cheese dishes",
        notes: "Specializes in local Savoyard cuisine. Known for cheese dishes.",
        images: [
            "https://picsum.photos/400/300?random=31",
            "https://picsum.photos/400/300?random=32",
            "https://picsum.photos/400/300?random=33",
            "https://picsum.photos/400/300?random=34",
            "https://picsum.photos/400/300?random=35"
        ],
        suitable: ["lunch", "dinner"],
        availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
    },
    {
        id: 8,
        name: "Le Vertumne",
        cuisine: "Modern French",
        priceRange: "€€€",
        distance: "0.7 km",
        reservation: "https://www.opentable.com/r/le-vertumne-annecy",
        vibe: "Contemporary fine dining, elegant and sophisticated",
        notableDishes: "Seasonal tasting menu, Lake fish, Innovative French cuisine",
        notes: "Creative modern French cuisine. Seasonal ingredients focus.",
        images: [
            "https://picsum.photos/400/300?random=36",
            "https://picsum.photos/400/300?random=37",
            "https://picsum.photos/400/300?random=38",
            "https://picsum.photos/400/300?random=39",
            "https://picsum.photos/400/300?random=40"
        ],
        suitable: ["dinner"],
        availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
    },
    {
        id: 9,
        name: "Bon Pain Bon Vin",
        cuisine: "Wine Bar/French",
        priceRange: "€€",
        distance: "0.2 km",
        reservation: "https://www.facebook.com/bonpainbonvin/",
        vibe: "Cozy wine bar, relaxed atmosphere, perfect for drinks",
        notableDishes: "Charcuterie boards, Wine selection, Small plates",
        notes: "Great wine selection. Perfect for aperitifs and light meals.",
        images: [
            "https://picsum.photos/400/300?random=41",
            "https://picsum.photos/400/300?random=42",
            "https://picsum.photos/400/300?random=43",
            "https://picsum.photos/400/300?random=44",
            "https://picsum.photos/400/300?random=45"
        ],
        suitable: ["lunch", "dinner"],
        availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
    },
    {
        id: 10,
        name: "Mazette",
        cuisine: "Contemporary French",
        priceRange: "€€€",
        distance: "0.5 km",
        reservation: "https://www.facebook.com/mazetteannecy/",
        vibe: "Trendy bistro, modern decor, young and dynamic atmosphere",
        notableDishes: "Creative small plates, Seasonal menu, Modern French classics",
        notes: "Hip and trendy spot. Great for modern French cuisine with a twist.",
        images: [
            "https://picsum.photos/400/300?random=46",
            "https://picsum.photos/400/300?random=47",
            "https://picsum.photos/400/300?random=48",
            "https://picsum.photos/400/300?random=49",
            "https://picsum.photos/400/300?random=50"
        ],
        suitable: ["lunch", "dinner"],
        availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
    },
    {
        id: 11,
        name: "Saba",
        cuisine: "Asian Fusion",
        priceRange: "€€€",
        distance: "0.4 km",
        reservation: "https://www.opentable.com/r/saba-annecy",
        vibe: "Modern Asian fusion, sleek design, sophisticated atmosphere",
        notableDishes: "Thai curry, Vietnamese pho, Asian fusion dishes",
        notes: "High-quality Asian fusion cuisine. Great for those wanting variety.",
        images: [
            "https://picsum.photos/400/300?random=51",
            "https://picsum.photos/400/300?random=52",
            "https://picsum.photos/400/300?random=53",
            "https://picsum.photos/400/300?random=54",
            "https://picsum.photos/400/300?random=55"
        ],
        suitable: ["lunch", "dinner"],
        availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
    },
    {
        id: 12,
        name: "Le Verriere",
        cuisine: "French/International",
        priceRange: "€€",
        distance: "0.6 km",
        reservation: "https://www.facebook.com/leverriereannecy/",
        vibe: "Glass-enclosed terrace, bright and airy, lake views",
        notableDishes: "Fresh salads, Grilled fish, International dishes",
        notes: "Beautiful terrace with lake views. Great for lighter meals.",
        images: [
            "https://picsum.photos/400/300?random=56",
            "https://picsum.photos/400/300?random=57",
            "https://picsum.photos/400/300?random=58",
            "https://picsum.photos/400/300?random=59",
            "https://picsum.photos/400/300?random=60"
        ],
        suitable: ["lunch", "dinner"],
        availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
    },
    {
        id: 13,
        name: "Le Petit Thiou",
        cuisine: "Traditional French",
        priceRange: "€€",
        distance: "0.1 km",
        reservation: "https://www.tripadvisor.com/Restaurant_Review-g187265-d8011847-Reviews-Le_Petit_Thiou-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
        vibe: "Quaint riverside location, traditional French decor, romantic",
        notableDishes: "Duck confit, Escargot, Traditional French desserts",
        notes: "Charming location by the Thiou river. Classic French cuisine.",
        images: [
            "https://picsum.photos/400/300?random=61",
            "https://picsum.photos/400/300?random=62",
            "https://picsum.photos/400/300?random=63",
            "https://picsum.photos/400/300?random=64",
            "https://picsum.photos/400/300?random=65"
        ],
        suitable: ["lunch", "dinner"],
        availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
    }
];

// Make it globally available
window.restaurantDatabase = restaurantDatabase;
