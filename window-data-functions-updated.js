// Define data functions for client-side use
console.log('Loading window-data-functions.js');
window.dataFunctions = {
    // API URL for the Google Sheets Web App
    // This should be the deployed web app URL from your Google Sheet
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
    },
    
    // Test render function 
    testRender: function() {
        console.log('Test render function called');
        // Display error message since we no longer support hardcoded data
        document.getElementById('trainOptions').innerHTML = `
            <div class="alert alert-warning">
                <h4>Testing Mode</h4>
                <p>Test render function called, but hardcoded data is no longer supported.</p>
                <p>Please ensure your Google Sheets connection is properly configured.</p>
            </div>
        `;
        
        document.getElementById('restaurantOptionsContainer').innerHTML = `
            <div class="alert alert-warning">
                <h4>Testing Mode</h4>
                <p>Test render function called, but hardcoded data is no longer supported.</p>
                <p>Please ensure your Google Sheets connection is properly configured.</p>
            </div>
        `;
        
        console.log('Test render complete with warning message');
    }
};

console.log('window.dataFunctions defined with Google Sheets integration only');