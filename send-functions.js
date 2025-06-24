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