// Data functions implementation
console.log('Loading data-functions.js');

// Alias the functions from window-data-functions.js for backward compatibility
// and add debug logging

window.loadTrainOptions = async function() {
    console.log('loadTrainOptions called via data-functions.js');
    if (!window.dataFunctions) {
        console.error('window.dataFunctions is not defined!');
        return [];
    }
    return await window.dataFunctions.loadTrainOptions();
};

window.loadRestaurantOptions = async function() {
    console.log('loadRestaurantOptions called via data-functions.js');
    if (!window.dataFunctions) {
        console.error('window.dataFunctions is not defined!');
        return [];
    }
    return await window.dataFunctions.loadRestaurantOptions();
};

console.log('data-functions.js loaded successfully');