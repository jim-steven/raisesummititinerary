/**
 * This is the Google Apps Script code that should be added to your Google Sheet.
 * It creates a web app that handles requests from your GitHub Pages site.
 * Copy and paste this code into the Apps Script editor in your Google Sheet.
 */

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function doOptions(e) {
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Set CORS headers
  output.setContent(JSON.stringify({status: 'ok'}));
  return output;
}

function handleRequest(e) {
  // Set up CORS headers for cross-origin requests
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Add CORS headers
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
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
    } else {
      result = { success: false, error: 'Invalid action' };
    }
    
    output.setContent(JSON.stringify(result));
    // Apply headers
    for (var key in headers) {
      output.addHeader(key, headers[key]);
    }
    return output;
  } catch (error) {
    output.setContent(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    }));
    // Apply headers even for error responses
    for (var key in headers) {
      output.addHeader(key, headers[key]);
    }
    return output;
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
}