// Define data functions for client-side use
console.log('Loading window-data-functions.js');
window.dataFunctions = {
    // API URL for the Google Sheets Web App
    // IMPORTANT: Replace with your actual deployment URL from your Google Sheet
    API_URL: 'https://script.google.com/macros/s/AKfycbxUTSzyMC7OBiAznFbcOpXzbmvwB6_cjId-a4Nvve5PEI2b-TerwWnjXNNdXB5EDlIt/exec',
    
    // Debug function to log the current API URL
    logApiUrl: function() {
        console.log('Current API URL:', this.API_URL);
        return this.API_URL;
    },
    
    // Load train options from Google Sheets
    loadTrainOptions: async function() {
        console.log('loadTrainOptions called - fetching from Google Sheets only');
        try {
            const response = await fetch(`${this.API_URL}?action=getTrainOptions`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.success && result.data) {
                console.log('Train options loaded successfully:', result.data.length);
                return result.data;
            } else {
                console.error('Error loading train options:', result.error);
                throw new Error(result.error || 'Unable to load train options from Google Sheets');
            }
        } catch (error) {
            console.error('Failed to load train options from Google Sheets:', error);
            // No fallback - show error to user
            document.getElementById('trainOptions').innerHTML = `
                <div class="alert alert-danger">
                    <h4>Error Loading Train Data</h4>
                    <p>Unable to load train options from Google Sheets. Please check your connection and try again.</p>
                    <p>Error details: ${error.message}</p>
                </div>
            `;
            throw error; // Re-throw to be handled by caller
        }
                {
                    id: 1,
                    departure: "Paris Lyon",
                    arrival: "Annecy",
                    departureDate: "2025-07-09",
                    departureTime: "09:46",
                    arrivalTime: "13:29",
                    duration: "4h",
                    priceRegularUSD: 135.41,
                    priceFirstClassUSD: 218.04,
                    totalPriceUSD: 270.82,
                    priceRegularEUR: 125.20,
                    priceFirstClassEUR: 201.70,
                    totalPriceEUR: 250.50,
                    tag: "Earliest",
                    link: "https://www.google.com/travel"
                },
                {
                    id: 2,
                    departure: "Paris Lyon",
                    arrival: "Annecy",
                    departureDate: "2025-07-09",
                    departureTime: "12:46",
                    arrivalTime: "16:32",
                    duration: "4h",
                    priceRegularUSD: 107.31,
                    priceFirstClassUSD: 130.39,
                    totalPriceUSD: 218.48,
                    priceRegularEUR: 99.25,
                    priceFirstClassEUR: 120.60,
                    totalPriceEUR: 202.10,
                    tag: "",
                    link: "https://www.google.com/travel"
                },
                {
                    id: 3,
                    departure: "Paris Lyon",
                    arrival: "Annecy",
                    departureDate: "2025-07-09",
                    departureTime: "17:46",
                    arrivalTime: "21:40",
                    duration: "4h",
                    priceRegularUSD: 86.50,
                    priceFirstClassUSD: 117.70,
                    totalPriceUSD: 170.68,
                    priceRegularEUR: 80.00,
                    priceFirstClassEUR: 108.90,
                    totalPriceEUR: 157.90,
                    tag: "Latest",
                    link: "https://www.google.com/travel"
                }
            ];
        }
    },
    
    // Load restaurant options from Google Sheets
    loadRestaurantOptions: async function() {
        console.log('loadRestaurantOptions called - fetching from Google Sheets only');
        try {
            const response = await fetch(`${this.API_URL}?action=getRestaurantOptions`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.success && result.data) {
                console.log('Restaurant options loaded successfully:', result.data.length);
                return result.data;
            } else {
                console.error('Error loading restaurant options:', result.error);
                throw new Error(result.error || 'Unable to load restaurant options from Google Sheets');
            }
        } catch (error) {
            console.error('Failed to load restaurant options from Google Sheets:', error);
            // No fallback - show error to user
            document.getElementById('restaurantOptionsContainer').innerHTML = `
                <div class="alert alert-danger">
                    <h4>Error Loading Restaurant Data</h4>
                    <p>Unable to load restaurant options from Google Sheets. Please check your connection and try again.</p>
                    <p>Error details: ${error.message}</p>
                </div>
            `;
            throw error; // Re-throw to be handled by caller
        }
                {
                    id: 1,
                    name: "Cozna",
                    cuisine: "Contemporary",
                    price: "€€€",
                    location: "Annecy",
                    rating: 4.6,
                    mapLink: "https://maps.app.goo.gl/qsHULaNXYMhf5ein8",
                    website: "https://restaurantcozna.com/",
                    description: "Elegant dining with local ingredients and creative dishes",
                    suitable: ["dinner"],
                    availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
                },
                {
                    id: 2,
                    name: "La Ciboulette",
                    cuisine: "French",
                    price: "€€€",
                    location: "Annecy",
                    rating: 4.8,
                    mapLink: "https://maps.app.goo.gl/Wxsf655N2RcnTtxa8",
                    website: "https://bookings.zenchef.com/results?rid=374570&pid=1001",
                    description: "Michelin-starred restaurant with elegant French cuisine",
                    suitable: ["dinner"],
                    availableDates: ["2025-07-09", "2025-07-11"]
                }
            ];
        }
    }
};

// Add a direct test function to render data without relying on API calls
window.dataFunctions.testRender = function() {
    console.log('Test render function called');
    // Get the train options container
    const trainContainer = document.getElementById('trainOptions');
    if (trainContainer) {
        trainContainer.innerHTML = '<div class="col-md-4 mb-4"><div class="card train-card h-100"><div class="card-body"><h5 class="card-title">Test Train Card</h5><p>This is a test train option that appears because the testRender function was called.</p></div></div></div>';
    }
    
    // Get the restaurant options container
    const restaurantContainer = document.getElementById('restaurantOptionsContainer');
    if (restaurantContainer) {
        restaurantContainer.innerHTML = '<div><p>Test restaurant option</p></div>';
    }
    
    console.log('Test render complete');
};

console.log('window.dataFunctions defined with testRender function');