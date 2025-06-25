// Direct global function definition
function sendSampleData() {
    console.log('Sending sample data to Google Sheets...');
    
    // Sample data based on PDF content
    const sampleData = {
        train: {
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
        restaurants: {
            "2025-07-09": { 
                lunch: [4, 9], // Le Chalet and Le Bistrot des Tilleuls
                dinner: [1, 2]  // Cozna and La Ciboulette
            },
            "2025-07-10": { 
                lunch: [7, 10], // Café de la Place and La Coupole
                dinner: [3, 6]   // L'Esquisse and Le Belvédère
            },
            "2025-07-11": { 
                lunch: [5, 8],  // Le Freti and Auberge du Lac
                dinner: [3]      // L'Esquisse
            }
        },
        lastUpdated: new Date().toISOString()
    };

    // API URL
    const GOOGLE_SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbxUTSzyMC7OBiAznFbcOpXzbmvwB6_cjId-a4Nvve5PEI2b-TerwWnjXNNdXB5EDlIt/exec';
    
    // Make AJAX request directly
    fetch(GOOGLE_SHEETS_API_URL, {
        method: 'POST',
        body: JSON.stringify({
            action: 'save',
            data: sampleData
        }),
        headers: {'Content-Type': 'application/json'}
    }).then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(result => {
        console.log('Success:', result);
        alert('Sample data sent successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error sending sample data: ' + error.message);
    });
    
    return "Sample data sending initiated. Check console for results.";
}

// Test function for Google Sheets integration
function testGoogleSheetsIntegration() {
    console.log('Testing Google Sheets integration...');
    const GOOGLE_SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbxUTSzyMC7OBiAznFbcOpXzbmvwB6_cjId-a4Nvve5PEI2b-TerwWnjXNNdXB5EDlIt/exec';
    
    // Test data
    const testData = {
        train: {
            id: 1,
            departure: "Paris Lyon",
            arrival: "Annecy",
            departureDate: "2025-07-09",
            departureTime: "09:46",
            arrivalTime: "13:29",
            duration: "4h"
        },
        restaurants: {
            "2025-07-09": { lunch: [4], dinner: [1] },
            "2025-07-10": { lunch: [7], dinner: [3] }
        },
        lastUpdated: new Date().toISOString()
    };
    
    // Test saving
    console.log('Testing save...');
    fetch(GOOGLE_SHEETS_API_URL, {
        method: 'POST',
        body: JSON.stringify({
            action: 'save',
            data: testData
        }),
        headers: {'Content-Type': 'application/json'}
    }).then(response => {
        console.log('Save response status:', response.status);
        return response.json();
    }).then(result => {
        console.log('Save result:', result);
        
        // Now test loading
        console.log('Testing load...');
        return fetch(GOOGLE_SHEETS_API_URL + '?action=load');
    }).then(response => {
        console.log('Load response status:', response.status);
        return response.json();
    }).then(result => {
        console.log('Load result:', result);
        alert('Test completed successfully! Check console for details.');
    }).catch(error => {
        console.error('Test error:', error);
        alert('Test error: ' + error.message);
    });
    
    return "Test initiated. Check console for details.";
}

// Fix the Save Itinerary button to save to Google Sheets
document.addEventListener('DOMContentLoaded', function() {
    // Wait until page is fully loaded
    setTimeout(function() {
        console.log('Fixing Save Itinerary button to use Google Sheets...');
        
        // Find the save button
        const saveButton = document.getElementById('saveItineraryBtn');
        if (saveButton) {
            // Replace the existing click handler
            saveButton.addEventListener('click', function() {
                // Get the currently selected train and restaurants
                const selectedTrain = window.selectedTrain; // This should be set elsewhere in the app
                
                // Get the selected restaurants from our global state if available
                const selectedRestaurants = window.selectedRestaurants || {
                    "2025-07-08": { lunch: [], dinner: [] },
                    "2025-07-09": { lunch: [], dinner: [] },
                    "2025-07-10": { lunch: [], dinner: [] },
                    "2025-07-11": { lunch: [], dinner: [] },
                    "2025-07-12": { lunch: [], dinner: [] }
                };
                
                // Use fallback data if needed for testing
                if (!selectedTrain) {
                    console.log('No train selected, using sample data');
                }
                
                // Create the payload
                const itineraryData = {
                    train: selectedTrain || {
                        id: 2,
                        departure: "Paris Lyon",
                        arrival: "Annecy",
                        departureDate: "2025-07-09",
                        departureTime: "12:46",
                        arrivalTime: "16:32",
                        duration: "4h",
                        priceRegularUSD: 107.31,
                        priceFirstClassUSD: 130.39,
                        totalPriceUSD: 218.48
                    },
                    restaurants: selectedRestaurants,
                    lastUpdated: new Date().toISOString()
                };
                
                console.log('Saving itinerary to Google Sheets:', itineraryData);
                
                // API URL
                const API_URL = window.dataFunctions?.API_URL || 
                    'https://script.google.com/macros/s/AKfycbxUTSzyMC7OBiAznFbcOpXzbmvwB6_cjId-a4Nvve5PEI2b-TerwWnjXNNdXB5EDlIt/exec';
                
                // Try to save to Google Sheets
                fetch(API_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'save',
                        data: itineraryData
                    }),
                    headers: {'Content-Type': 'application/json'}
                })
                .then(response => {
                    console.log('Save response status:', response.status);
                    return response.json();
                })
                .then(result => {
                    console.log('Save successful:', result);
                    showSaveConfirmation(true);
                })
                .catch(error => {
                    console.error('Error saving to Google Sheets:', error);
                    showSaveConfirmation(false);
                });
            });
            
            console.log('Save button handler updated to use Google Sheets');
        } else {
            console.error('Save button not found on page');
        }
    }, 1500); // Wait 1.5 seconds to ensure page is loaded
});

// Helper function to show save confirmation message
function showSaveConfirmation(success) {
    // Check if notification element exists
    let notification = document.getElementById('saveNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'saveNotification';
        notification.className = 'position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(notification);
    }
    
    notification.innerHTML = `
        <div class="toast ${success ? 'bg-success' : 'bg-danger'} text-white" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">${success ? 'Success' : 'Error'}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${success ? 'Itinerary saved successfully to Google Sheets!' : 'Error saving itinerary. Please try again.'}
            </div>
        </div>
    `;
    
    const toast = new bootstrap.Toast(notification.querySelector('.toast'));
    toast.show();
}