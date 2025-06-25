/**
 * This is the Google Apps Script code that should be added to your Google Sheet.
 * It creates a web app that handles requests from your GitHub Pages site.
 * Copy and paste this code into the Apps Script editor in your Google Sheet.
 * 
 * Deployment instructions:
 * 1. Go to your Google Sheet
 * 2. Click on Extensions > Apps Script
 * 3. Copy and paste this entire code
 * 4. Click on Deploy > New deployment
 * 5. Select type: Web app
 * 6. Set execute as: Me
 * 7. Set who has access: Anyone
 * 8. Click Deploy
 * 9. Copy the Web app URL and use it in your frontend code
 */

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function doOptions(e) {
  // Create output with CORS headers
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify({status: 'ok'}));
  
  // Set CORS headers
  return output.setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function handleRequest(e) {
  try {
    // Parse request parameters
    var params = e.parameter;
    var action = params.action;
    
    // Handle different actions
    if (e.postData && e.postData.contents) {
      var postData = JSON.parse(e.postData.contents);
      action = postData.action || action;
    }
    
    var result;
    if (action === 'save') {
      result = saveData(e);
    } else if (action === 'load') {
      result = loadData();
    } else if (action === 'getTrainOptions') {
      result = getTrainOptions();
    } else if (action === 'getRestaurantOptions') {
      result = getRestaurantOptions();
    } else {
      result = { success: false, error: 'Invalid action' };
    }
    
    // Response with CORS headers
    var response = ContentService.createTextOutput();
    response.setMimeType(ContentService.MimeType.JSON);
    response.setContent(JSON.stringify(result));
    
    // Add CORS headers
    return response.setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  } catch (error) {
    // Error response with CORS headers
    var errorResponse = ContentService.createTextOutput();
    errorResponse.setMimeType(ContentService.MimeType.JSON);
    errorResponse.setContent(JSON.stringify({ success: false, error: error.toString() }));
    
    return errorResponse.setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

function saveData(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    const data = postData.data;
    
    // Get the userSelections sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('userSelections');
    
    if (!sheet) {
      return { success: false, error: 'Sheet not found' };
    }
    
    // Save the data in a timestamped format
    const timestamp = new Date().toISOString();
    const userId = Session.getActiveUser().getEmail() || 'anonymous';
    
    // Prepare data for saving
    let trainData = 'No train selected';
    if (data.train) {
      trainData = JSON.stringify(data.train);
    }
    
    let restaurantsData = 'No restaurants selected';
    if (data.restaurants) {
      restaurantsData = JSON.stringify(data.restaurants);
    }
    
    // Insert the data into the sheet
    sheet.appendRow([timestamp, userId, trainData, restaurantsData]);
    
    return { success: true, message: 'Data saved successfully' };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

function loadData() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('userSelections');
    
    if (!sheet) {
      return { success: false, error: 'Sheet not found' };
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) { // Only header row exists
      return { success: true, data: null };
    }
    
    // Get the last saved row (most recent)
    const dataRange = sheet.getRange(lastRow, 1, 1, 4);
    const values = dataRange.getValues()[0];
    
    let train = null;
    let restaurants = null;
    
    // Parse train data if available
    if (values[2] && values[2] !== 'No train selected') {
      try {
        train = JSON.parse(values[2]);
      } catch (e) {
        console.error('Error parsing train data:', e);
      }
    }
    
    // Parse restaurants data if available
    if (values[3] && values[3] !== 'No restaurants selected') {
      try {
        restaurants = JSON.parse(values[3]);
      } catch (e) {
        console.error('Error parsing restaurants data:', e);
      }
    }
    
    return { 
      success: true, 
      data: {
        timestamp: values[0],
        userId: values[1],
        train: train,
        restaurants: restaurants
      }
    };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Get train options from the trainOptions sheet
 */
function getTrainOptions() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('trainOptions');
    
    if (!sheet) {
      return { success: false, error: 'Train options sheet not found' };
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) { // Only header row exists
      return { success: true, data: [] };
    }
    
    // Get all rows excluding header
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 15);
    const values = dataRange.getValues();
    
    // Get headers
    const headers = sheet.getRange(1, 1, 1, 15).getValues()[0];
    
    // Map data to objects
    const trainOptions = values.map(row => {
      const train = {};
      headers.forEach((header, index) => {
        // Special handling for arrays
        train[header] = row[index];
      });
      return train;
    });
    
    return { success: true, data: trainOptions };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Get restaurant options from the restaurantOptions sheet
 */
function getRestaurantOptions() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('restaurantOptions');
    
    if (!sheet) {
      return { success: false, error: 'Restaurant options sheet not found' };
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) { // Only header row exists
      return { success: true, data: [] };
    }
    
    // Get all rows excluding header
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 11);
    const values = dataRange.getValues();
    
    // Get headers
    const headers = sheet.getRange(1, 1, 1, 11).getValues()[0];
    
    // Map data to objects
    const restaurantOptions = values.map(row => {
      const restaurant = {};
      headers.forEach((header, index) => {
        if (header === 'suitable') {
          // Convert comma-separated string to array
          restaurant[header] = row[index].split(',');
        } else if (header === 'availableDates') {
          // Convert comma-separated string to array
          restaurant[header] = row[index].split(',');
        } else {
          restaurant[header] = row[index];
        }
      });
      return restaurant;
    });
    
    return { success: true, data: restaurantOptions };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Create necessary sheets if they don't exist
 * This function runs automatically when the script is installed
 */
function onOpen() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('userSelections');
  
  // Create userSelections sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet('userSelections');
    // Add headers
    sheet.appendRow(['Timestamp', 'User', 'Train', 'Restaurants']);
    // Format headers
    sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  }
  
  // Create trainOptions sheet if it doesn't exist
  let trainSheet = ss.getSheetByName('trainOptions');
  if (!trainSheet) {
    trainSheet = ss.insertSheet('trainOptions');
    // Add headers
    trainSheet.appendRow([
      'id', 'departure', 'arrival', 'departureDate', 'departureTime', 
      'arrivalTime', 'duration', 'priceRegularUSD', 'priceFirstClassUSD', 
      'totalPriceUSD', 'priceRegularEUR', 'priceFirstClassEUR', 
      'totalPriceEUR', 'tag', 'link'
    ]);
    // Format headers
    trainSheet.getRange(1, 1, 1, 15).setFontWeight('bold');
    
    // Train data will be added by the admin manually
  }
  
  // Create restaurantOptions sheet if it doesn't exist
  let restaurantSheet = ss.getSheetByName('restaurantOptions');
  if (!restaurantSheet) {
    restaurantSheet = ss.insertSheet('restaurantOptions');
    // Add headers
    restaurantSheet.appendRow([
      'id', 'name', 'cuisine', 'price', 'location', 'rating', 
      'mapLink', 'website', 'description', 'suitable', 'availableDates'
    ]);
    // Format headers
    restaurantSheet.getRange(1, 1, 1, 11).setFontWeight('bold');
    
    // Add restaurant data from PDF
    restaurantSheet.appendRow([
      1, 'Cozna', 'Contemporary', '€€€', 'Annecy', 4.6, 
      'https://maps.app.goo.gl/qsHULaNXYMhf5ein8', 
      'https://restaurantcozna.com/', 
      'Elegant dining with local ingredients and creative dishes in the old town of Annecy, run by Sandra & Léo', 
      'dinner', '2025-07-09,2025-07-10,2025-07-11'
    ]);
    
    restaurantSheet.appendRow([
      2, 'La Ciboulette', 'French', '€€€', 'Annecy', 4.8, 
      'https://maps.app.goo.gl/Wxsf655N2RcnTtxa8', 
      'https://bookings.zenchef.com/results?rid=374570&pid=1001', 
      'Michelin-starred restaurant with elegant French cuisine', 
      'dinner', '2025-07-09,2025-07-11'
    ]);
    
    restaurantSheet.appendRow([
      3, "L'Esquisse", 'French', '€€€', 'Annecy', 4.7, 
      'https://maps.app.goo.gl/K4rJALs11whwvYCMA', 
      'https://bookings.zenchef.com/results?rid=359839&pid=1001', 
      'Creative French cuisine with local ingredients and a beautiful view', 
      'dinner', '2025-07-09,2025-07-10,2025-07-11'
    ]);
    
    restaurantSheet.appendRow([
      4, 'Le Chalet', 'Swiss/Savoyard', '€€', 'Annecy', 4.5, 
      'https://maps.app.goo.gl/9tSxaDBjaZ4SgHUh9', 
      'https://www.le-chalet-annecy.com/', 
      'Traditional alpine cuisine featuring fondue and raclette', 
      'lunch,dinner', '2025-07-09,2025-07-10,2025-07-11'
    ]);
    
    restaurantSheet.appendRow([
      5, 'Le Freti', 'Savoyard', '€€', 'Annecy', 4.4, 
      'https://maps.app.goo.gl/sv9QakyBWpxxdzq96', 
      'https://www.lefreti.fr/', 
      'Authentic Savoyard cuisine specializing in cheese dishes', 
      'lunch,dinner', '2025-07-09,2025-07-10,2025-07-11'
    ]);
    
    restaurantSheet.appendRow([
      6, 'Le Belvédère', 'French/Modern', '€€€', 'Annecy', 4.6, 
      'https://maps.app.goo.gl/7V1DD1fByDx9pBvs6', 
      'https://www.belvedere-annecy.com/', 
      'Panoramic views with sophisticated French cuisine', 
      'dinner', '2025-07-10,2025-07-11'
    ]);
    
    restaurantSheet.appendRow([
      7, 'Café de la Place', 'French/Casual', '€€', 'Annecy', 4.3, 
      'https://maps.app.goo.gl/F8jw6nk9ZG1kmxWM6', 
      'https://cafedelaplace-annecy.com/', 
      'Relaxed bistro fare in a central location', 
      'lunch', '2025-07-09,2025-07-10,2025-07-11'
    ]);
    
    restaurantSheet.appendRow([
      8, 'Auberge du Lac', 'French/Seafood', '€€€', 'Annecy', 4.7, 
      'https://maps.app.goo.gl/ue5i2r3S2PVAc14b9', 
      'https://auberge-du-lac.com/', 
      'Lakeside dining featuring fresh seafood and lake fish', 
      'lunch,dinner', '2025-07-10,2025-07-11'
    ]);
    
    restaurantSheet.appendRow([
      9, 'Le Bistrot des Tilleuls', 'French', '€€', 'Annecy', 4.4, 
      'https://maps.app.goo.gl/7ESamMNH6zNprVzp6', 
      'https://bistrot-tilleuls.com/', 
      'Cozy bistro with traditional French dishes', 
      'lunch', '2025-07-09,2025-07-10,2025-07-11'
    ]);
    
    restaurantSheet.appendRow([
      10, 'La Coupole', 'Italian/Pizza', '€', 'Annecy', 4.2, 
      'https://maps.app.goo.gl/xwMT8cneQVjbyyoj9', 
      'https://lacoupole-annecy.com/', 
      'Casual Italian cuisine with authentic pizzas', 
      'lunch', '2025-07-09,2025-07-10,2025-07-11'
    ]);
    
    restaurantSheet.appendRow([
      11, "L'Étage", 'French/Modern', '€€', 'Annecy', 4.5, 
      'https://maps.app.goo.gl/U8aVgRu3MC7evLx76', 
      'https://letage-annecy.com/', 
      'Contemporary French cuisine with a creative touch', 
      'dinner', '2025-07-09,2025-07-10'
    ]);
  }
}