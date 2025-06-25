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
            "https://media-cdn.tripadvisor.com/media/photo-s/15/33/f5/5a/le-denti.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/15/33/f5/59/le-denti.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/15/33/f5/58/le-denti.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/15/33/f5/57/le-denti.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/15/33/f5/56/le-denti.jpg"
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
            "https://media-cdn.tripadvisor.com/media/photo-s/1a/8b/3c/2d/cozna.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1a/8b/3c/2c/cozna.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1a/8b/3c/2b/cozna.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1a/8b/3c/2a/cozna.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1a/8b/3c/29/cozna.jpg"
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
            "https://media-cdn.tripadvisor.com/media/photo-s/1c/2d/4e/5f/minami-annecy.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1c/2d/4e/5e/minami-annecy.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1c/2d/4e/5d/minami-annecy.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1c/2d/4e/5c/minami-annecy.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1c/2d/4e/5b/minami-annecy.jpg"
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
            "https://media-cdn.tripadvisor.com/media/photo-s/0f/8a/2c/1d/chez-mamie-lise.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/0f/8a/2c/1c/chez-mamie-lise.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/0f/8a/2c/1b/chez-mamie-lise.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/0f/8a/2c/1a/chez-mamie-lise.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/0f/8a/2c/19/chez-mamie-lise.jpg"
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
            "https://media-cdn.tripadvisor.com/media/photo-s/12/4f/8c/2a/le-chalet-annecy.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/12/4f/8c/29/le-chalet-annecy.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/12/4f/8c/28/le-chalet-annecy.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/12/4f/8c/27/le-chalet-annecy.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/12/4f/8c/26/le-chalet-annecy.jpg"
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
            "https://media-cdn.tripadvisor.com/media/photo-s/16/a2/3f/4d/le-biboquet.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/16/a2/3f/4c/le-biboquet.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/16/a2/3f/4b/le-biboquet.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/16/a2/3f/4a/le-biboquet.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/16/a2/3f/49/le-biboquet.jpg"
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
            "https://media-cdn.tripadvisor.com/media/photo-s/13/2a/1b/5f/le-freti.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/13/2a/1b/5e/le-freti.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/13/2a/1b/5d/le-freti.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/13/2a/1b/5c/le-freti.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/13/2a/1b/5b/le-freti.jpg"
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
            "https://media-cdn.tripadvisor.com/media/photo-s/1d/4e/2a/3f/le-vertumne.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1d/4e/2a/3e/le-vertumne.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1d/4e/2a/3d/le-vertumne.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1d/4e/2a/3c/le-vertumne.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1d/4e/2a/3b/le-vertumne.jpg"
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
            "https://media-cdn.tripadvisor.com/media/photo-s/18/7c/4d/2f/bon-pain-bon-vin.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/18/7c/4d/2e/bon-pain-bon-vin.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/18/7c/4d/2d/bon-pain-bon-vin.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/18/7c/4d/2c/bon-pain-bon-vin.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/18/7c/4d/2b/bon-pain-bon-vin.jpg"
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
            "https://media-cdn.tripadvisor.com/media/photo-s/1a/2f/5c/4d/mazette.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1a/2f/5c/4c/mazette.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1a/2f/5c/4b/mazette.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1a/2f/5c/4a/mazette.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1a/2f/5c/49/mazette.jpg"
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
            "https://media-cdn.tripadvisor.com/media/photo-s/1b/6c/3d/2f/saba-annecy.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1b/6c/3d/2e/saba-annecy.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1b/6c/3d/2d/saba-annecy.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1b/6c/3d/2c/saba-annecy.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/1b/6c/3d/2b/saba-annecy.jpg"
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
            "https://media-cdn.tripadvisor.com/media/photo-s/17/8b/4c/3f/le-verriere.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/17/8b/4c/3e/le-verriere.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/17/8b/4c/3d/le-verriere.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/17/8b/4c/3c/le-verriere.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/17/8b/4c/3b/le-verriere.jpg"
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
            "https://media-cdn.tripadvisor.com/media/photo-s/14/6f/2a/5d/le-petit-thiou.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/14/6f/2a/5c/le-petit-thiou.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/14/6f/2a/5b/le-petit-thiou.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/14/6f/2a/5a/le-petit-thiou.jpg",
            "https://media-cdn.tripadvisor.com/media/photo-s/14/6f/2a/59/le-petit-thiou.jpg"
        ],
        suitable: ["lunch", "dinner"],
        availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
    }
];

// Make it globally available
window.restaurantDatabase = restaurantDatabase;
