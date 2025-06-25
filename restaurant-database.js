// Hardcoded restaurant database
const restaurantDatabase = [
    {
        id: 1,
        name: "Le Denti",
        cuisine: "French/Mediterranean",
        priceRange: "$$$",
        distance: "0.3km",
        travelTime: "17min",
        directions: "https://maps.google.com/maps?daddr=Le+Denti,+Annecy,+France",
        tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g187260-d1322253-Reviews-Le_Denti-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
        reservation: "https://bookings.zenchef.com/results?rid=359839&pid=1001",
        phone: "+33 4 50 64 21 17",
        vibe: "Relaxed, unpretentious, seasonal seafood focus",
        notableDishes: "Mediterranean fish (denti, skrei), tartare, paninis, salads",
        notes: "$$‑$$$. Michelin-recommended. Best for lunch & dinner.",
        images: [
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/f7/3a/90/le-denti.jpg?w=2000&h=-1&s=1",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/f4/fb/c5/restaurant-layout.jpg?w=600&h=-1&s=1",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-s/02/7d/71/f1/filename-300153-16246332716448.jpg?w=600&h=-1&s=1",
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
        priceRange: "$$$$",
        distance: "0.8km",
        travelTime: "12min",
        tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g187260-d14788334-Reviews-Cozna-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
        phone: "+33 4 50 65 00 25",
        vibe: "Cozy old‑town, traditional Savoyard cuisine",
        notableDishes: "Poultry, carrot medley, candied apple sablé Breton, vanilla ice cream",
        notes: "€€–€€€. Michelin Guide entry. Best for lunch & dinner.",
        images: [
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/10/a5/cb/facade-restaurant.jpg?w=1400&h=-1&s=1",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/ba/aa/8f/caption.jpg?w=1100&h=-1&s=1",
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
        priceRange: "$$$",
        distance: "0.5km",
        travelTime: "8min",
        directions: "https://maps.google.com/maps?daddr=Minami,+Annecy,+France",
        tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g187260-d3489456-Reviews-Minami-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
        phone: "+33 4 50 45 75 42",
        vibe: "Compact, minimalist Japanese vibe",
        notableDishes: "Soft-shell crab, udon hotpot, foie gras sushi, caramelized eel, jasmine crème brûlée",
        notes: "€€. Michelin-starred. Best for lunch & dinner.",
        images: [
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/a7/0c/20/photo3jpg.jpg?w=1400&h=-1&s=1",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/aa/f8/ac/minami.jpg?w=900&h=-1&s=1",
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
        priceRange: "$$",
        distance: "0.4km",
        travelTime: "6min",
        tripadvisor: "https://en.tripadvisor.com.hk/Restaurant_Review-g187260-d1324996-Reviews-or45-Chez_Mamie_Lise-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
        reservation: "https://bookings.zenchef.com/results?rid=374570&pid=1001",
        vibe: "Rustic alpine space, warm and traditional",
        notableDishes: "Raclette, tartiflette, diots in white wine, alpine soups",
        notes: "€€–€€€. Local favorite. Best for lunch & dinner daily.",
        images: [
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npQTK01IMY_RjneKYXRYt-tlyNXm7xEi5KbyJEKpMu5kkhXMmNpgaU6mk8ovgXliVGcmyi3VPLQD2U_SzaYJpwWS4DaXuLIj5qZZQxHKIfLC2lTiDKshu9UVliopLNTFzJRzdGy=s1360-w1360-h1020-rw",
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
        priceRange: "$$",
        distance: "0.6km",
        travelTime: "9min",
        tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g187260-d5799201-Reviews-Le_Chalet_Restaurant-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
        reservation: "https://bookings.zenchef.com/results?rid=361200&pid=1001",
        vibe: "Cozy chalet interior, canal-side patio",
        notableDishes: "Tartiflette, fondue savoyarde, snails pastry",
        notes: "€€–€€€. Best for lunch & dinner.",
        images: [
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npjgL7c_AaGsuP0vusQsDQGZ00JnpDfQq1uNKhDtpDHuerC3HuOJEPikxxNwo_Eesk_eyy-wN3_rqNT_oWj5J1oYSU3Ti7xieSDcvTMM4ReTCIRhGslsxNcIdnIJnxY1pr1-oDWtw=s1360-w1360-h1020-rw",
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noDhdF-HdiV543kCOALbnvNFHb4fE8uWN97io7SRcgGfXrT3isywjW3UnwFOEXyzSdeqthsYmnVthjlWCinr9BmLZE_rkLIjsIvWOaU8dl8EZKHQ5B_BTnIJwsoAHBn-zP_R6c=s1360-w1360-h1020-rw",
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
        priceRange: "$$",
        distance: "0.2km",
        travelTime: "3min",
        tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g187260-d1324994-Reviews-Bilboquet-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
        vibe: "Rustic stone‑walled, Mediterranean touches",
        notableDishes: "Seasonal French dishes",
        notes: "€€–€€€. Great for lunch & dinner.",
        images: [
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/02/e9/f8/bilboquet.jpg?w=900&h=500&s=1",
            "https://media-cdn.tripadvisor.com/media/photo-s/2a/8f/6f/33/caption.jpg",
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
        priceRange: "$$",
        distance: "0.3km",
        travelTime: "5min",
        tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g187260-d1058291-Reviews-Le_Freti-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
        reservation: "https://www.lefreti.fr/reserver-une-table",
        vibe: "Classic alpine cheese-focused spot",
        notableDishes: "Fondue, raclette, various cheese platters",
        notes: "€€. Iconic since 1974. Best for dinner & lunch (open daily).",
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
        priceRange: "$$$",
        distance: "0.7km",
        travelTime: "10min",
        tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g187260-d1326681-Reviews-Le_Vertumne-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
        vibe: "Neo‑retro bistrot, cosy and generous",
        notableDishes: "Pâté croûte, julienne fish, blanc de boudin with foie gras, classic desserts",
        notes: "€€€. Michelin Guide (Gault&Millau). Best for lunch & dinner Tues–Sat.",
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
        priceRange: "$$",
        distance: "0.2km",
        travelTime: "3min",
        tripadvisor: "https://www.tripadvisor.com/LocationPhotoDirectLink-g187260-d17370248-i389812541-Bon_Pain_Bon_Vin-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
        vibe: "Casual all-day café",
        notableDishes: "Charcuterie boards, tartines, pastries",
        notes: "€€. Best for lunch & snacks.",
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
        priceRange: "$$$",
        distance: "0.5km",
        travelTime: "7min",
        tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g187260-d23520868-Reviews-Mazette_Restaurant-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
        vibe: "Modern bistro, seasonal and Alsatian twists",
        notableDishes: "Pâté croûte, Comté tourte, spaetzle, pork belly, apple tart",
        notes: "€€. Michelin Guide listed. Best for lunch & dinner (Tue–Sat).",
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
        priceRange: "$$$",
        distance: "0.4km",
        travelTime: "6min",
        tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g187260-d23973091-Reviews-Saba-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
        reservation: "https://bookings.zenchef.com/results?rid=360481&pid=1001",
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
        priceRange: "$$",
        distance: "0.6km",
        travelTime: "8min",
        tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g187260-d18220636-Reviews-La_Verriere-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
        phone: "+33 4 38 80 05 64",
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
        priceRange: "$$",
        distance: "0.1km",
        travelTime: "2min",
        tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g187260-d8011847-Reviews-Le_Petit_Thiou-Annecy_Haute_Savoie_Auvergne_Rhone_Alpes.html",
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
