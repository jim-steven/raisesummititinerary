# RAISE Summit - Annecy Google Apps Script Project Memory

## Commands
- Deploy: Use Google Apps Script Editor > Deploy > New deployment
- Test locally: clasp push (after setup with .clasp.json)
- Preview: clasp open

## Code Style
- Use ES6 features (const/let, arrow functions) where supported by Apps Script
- 2-space indentation
- camelCase for variables and function names
- JSDoc comments for functions
- Return JSON objects with success/error properties for API responses
- Wrap functions in try/catch blocks for error handling
- Parse JSON safely with try/catch when handling user data
- Use ContentService for API responses with proper MIME types
- Handle CORS properly with setHeader in doOptions function
- Sheet operations: use SpreadsheetApp.getActiveSpreadsheet() consistently