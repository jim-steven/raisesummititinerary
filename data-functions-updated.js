// Data functions implementation
console.log('Loading data-functions-updated.js');

// Alias the functions from window-data-functions.js for backward compatibility
// These functions now only use Google Sheets data with no fallbacks

window.loadTrainOptions = async function() {
    console.log('loadTrainOptions called via data-functions.js');
    if (!window.dataFunctions) {
        console.error('window.dataFunctions is not defined!');
        throw new Error('dataFunctions is not defined - check script loading order');
    }
    return await window.dataFunctions.loadTrainOptions();
};

window.loadRestaurantOptions = async function() {
    console.log('loadRestaurantOptions called via data-functions.js');
    if (!window.dataFunctions) {
        console.error('window.dataFunctions is not defined!');
        throw new Error('dataFunctions is not defined - check script loading order');
    }
    return await window.dataFunctions.loadRestaurantOptions();
};

console.log('data-functions-updated.js loaded successfully');