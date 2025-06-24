# RAISE Summit - Annecy Trip Planner

A GitHub Pages website to help plan travel and dining for the RAISE Summit in Annecy, France (July 9-11, 2025).

## Features

- Interactive train selection with comparison feature
- Restaurant options organized by day and meal type
- Drag-and-drop itinerary planning
- Google Sheets integration for data storage
- Responsive design for desktop and mobile

## Setup Instructions

### Local Development

1. Clone this repository
2. Open index.html in your browser

### Google Sheets Integration

To fully enable the Google Sheets backend:

1. Create a new Google Sheet
2. Create a Google Apps Script project connected to your sheet
3. Set up a web app with the appropriate CORS settings
4. Replace the placeholder URL in app.js with your Apps Script web app URL

## Usage

- Select trains and restaurants by clicking or using drag-and-drop
- Compare train options using the comparison feature
- Rearrange your selected restaurants by dragging them between days
- Save your itinerary to Google Sheets (or locally if sheets integration is not set up)

## Technology

- HTML/CSS/JavaScript
- Bootstrap 5 for UI components
- SortableJS for drag-and-drop functionality
- Google Sheets API for data storage

## License

MIT