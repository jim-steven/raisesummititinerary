# RAISE Summit - Annecy Project Deployment Instructions

## Google Sheets Backend Setup

1. **Access the Google Sheet**
   - Open the Google Sheet at https://docs.google.com/spreadsheets/d/1FXtW9kpeUJLl0ne2FfN7evDPW24Ey187SM6NMDDYFwc/
   - Share the spreadsheet with the service account email: `gpt-to-calendar@gpt-to-sheets-452506.iam.gserviceaccount.com`
   - Give the service account "Editor" permissions

2. **Deploy the Apps Script**
   - Click on Extensions > Apps Script
   - Copy and paste the entire code from `google-sheets-backend.js` into the Apps Script editor
   - Click on Deploy > New deployment
   - Select type: Web app
   - Set execute as: Me
   - Set who has access: Anyone
   - Click Deploy
   - Copy the Web app URL

3. **Update Frontend Code**
   - Open `window-data-functions-updated.js`
   - Replace the API_URL value with your deployment URL:
     ```javascript
     API_URL: 'YOUR_DEPLOYMENT_URL_HERE',
     ```
   - Save the file
   - Use the updated JavaScript files that enforce Google Sheets data only:
     - window-data-functions-updated.js
     - data-functions-updated.js

## Debugging Common Issues

1. **Check Console Errors**
   - Open the browser's developer console to check for any errors
   - Look for CORS-related errors which may indicate a problem with the API URL or CORS headers

2. **Verify API URL**
   - Ensure the API URL in `window-data-functions.js` matches your actual deployment URL
   - Test the API URL directly in a browser to confirm it's accessible

3. **Check Sheet Structure**
   - Make sure your Google Sheet has the required sheets: `userSelections`, `trainOptions`, and `restaurantOptions`
   - Verify the sheet headers match what's expected in the code

4. **CORS Issues**
   - If you're seeing CORS errors, check that your Apps Script has the correct doOptions function with proper headers

## Testing the Connection

1. Open your browser's console (F12 or right-click > Inspect > Console)
2. Enter the following to test API connectivity:
   ```javascript
   fetch('YOUR_DEPLOYMENT_URL_HERE?action=getTrainOptions')
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error('Error:', error));
   ```
3. You should see the train options data if the connection is working properly