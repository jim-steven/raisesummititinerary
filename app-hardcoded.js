document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded');
    
    // Train data
    const trainData = [
        {
            id: 1,
            departure: "Paris Lyon",
            arrival: "Annecy",
            departureDate: "2025-07-09",
            departureTime: "09:46",
            arrivalTime: "13:29",
            duration: "4h",
            priceRegularUSD: 135.41,
            priceFirstClassUSD: 218.04,
            totalPriceUSD: 270.82,
            priceRegularEUR: 125.20,
            priceFirstClassEUR: 201.70,
            totalPriceEUR: 250.50,
            tag: "Earliest",
            link: "https://www.google.com/travel"
        },
        {
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
        {
            id: 3,
            departure: "Paris Lyon",
            arrival: "Annecy",
            departureDate: "2025-07-09",
            departureTime: "17:46",
            arrivalTime: "21:40",
            duration: "4h",
            priceRegularUSD: 86.50,
            priceFirstClassUSD: 117.70,
            totalPriceUSD: 170.68,
            priceRegularEUR: 80.00,
            priceFirstClassEUR: 108.90,
            totalPriceEUR: 157.90,
            tag: "Latest",
            link: "https://www.google.com/travel"
        }
    ];
    
    // Restaurant data
    const restaurantData = [
        {
            id: 1,
            name: "Cozna",
            cuisine: "Contemporary",
            price: "€€€",
            location: "Annecy",
            rating: 4.6,
            mapLink: "https://maps.app.goo.gl/qsHULaNXYMhf5ein8",
            website: "https://restaurantcozna.com/",
            description: "Elegant dining with local ingredients and creative dishes",
            suitable: ["dinner"],
            availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
        },
        {
            id: 2,
            name: "La Ciboulette",
            cuisine: "French",
            price: "€€€",
            location: "Annecy",
            rating: 4.8,
            mapLink: "https://maps.app.goo.gl/Wxsf655N2RcnTtxa8",
            website: "https://bookings.zenchef.com/results?rid=374570&pid=1001",
            description: "Michelin-starred restaurant with elegant French cuisine",
            suitable: ["dinner"],
            availableDates: ["2025-07-09", "2025-07-11"]
        },
        {
            id: 3,
            name: "L'Esquisse",
            cuisine: "French",
            price: "€€€",
            location: "Annecy",
            rating: 4.7,
            mapLink: "https://maps.app.goo.gl/K4rJALs11whwvYCMA",
            website: "https://bookings.zenchef.com/results?rid=359839&pid=1001",
            description: "Creative French cuisine with local ingredients and a beautiful view",
            suitable: ["dinner"],
            availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
        },
        {
            id: 4,
            name: "Le Chalet",
            cuisine: "Swiss/Savoyard",
            price: "€€",
            location: "Annecy",
            rating: 4.5,
            mapLink: "https://maps.app.goo.gl/9tSxaDBjaZ4SgHUh9",
            website: "https://www.le-chalet-annecy.com/",
            description: "Traditional alpine cuisine featuring fondue and raclette",
            suitable: ["lunch", "dinner"],
            availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
        },
        {
            id: 5,
            name: "Le Freti",
            cuisine: "Savoyard",
            price: "€€",
            location: "Annecy",
            rating: 4.4,
            mapLink: "https://maps.app.goo.gl/sv9QakyBWpxxdzq96",
            website: "https://www.lefreti.fr/",
            description: "Authentic Savoyard cuisine specializing in cheese dishes",
            suitable: ["lunch", "dinner"],
            availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
        }
    ];
    
    // Task details
    const taskDetails = {
        title: "RAISE Summit - Annecy",
        dates: "July 9-11, 2025",
        location: "Annecy, France",
        description: "Planning for the RAISE Summit in Annecy including travel and dining options."
    };
    
    // Days of the trip
    const tripDays = [
        { date: "2025-07-08", day: "Tuesday" },
        { date: "2025-07-09", day: "Wednesday" },
        { date: "2025-07-10", day: "Thursday" },
        { date: "2025-07-11", day: "Friday" },
        { date: "2025-07-12", day: "Saturday" }
    ];
    
    // Global settings for price display
    let currencyDisplay = "USD";
    let classType = "regular";
    
    // State management for selected items
    let selectedTrain = null;
    let selectedRestaurants = {
        "2025-07-08": { lunch: [], dinner: [] },
        "2025-07-09": { lunch: [], dinner: [] },
        "2025-07-10": { lunch: [], dinner: [] },
        "2025-07-11": { lunch: [], dinner: [] },
        "2025-07-12": { lunch: [], dinner: [] }
    };
    
    // Function to convert 24h time to 12h format with AM/PM
    function convertTo12Hour(time24h) {
        const [hours, minutes] = time24h.split(':');
        const hour = parseInt(hours, 10);
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${suffix}`;
    }
    
    // Function to get current price based on settings
    function getCurrentPrice(train) {
        const priceKey = classType === 'regular' ? 'priceRegular' : 'priceFirstClass';
        const currencyKey = currencyDisplay === 'USD' ? 'USD' : 'EUR';
        return train[priceKey + currencyKey];
    }
    
    // Render train options
    function renderTrainOptions() {
        const trainContainer = document.getElementById('trainOptions');
        if (!trainContainer) {
            console.error('Train container not found');
            return;
        }
        
        trainContainer.innerHTML = '';
        
        // Add currency toggle
        const toggleRow = document.createElement('div');
        toggleRow.className = 'row mb-4';
        toggleRow.innerHTML = `
            <div class="col-md-6">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="currencyToggle" ${currencyDisplay === 'EUR' ? 'checked' : ''}>
                    <label class="form-check-label" for="currencyToggle">Show prices in ${currencyDisplay === 'USD' ? 'EUR' : 'USD'}</label>
                </div>
            </div>
        `;
        trainContainer.appendChild(toggleRow);
        
        // Add event listeners for currency toggle
        document.getElementById('currencyToggle').addEventListener('change', function() {
            currencyDisplay = this.checked ? 'EUR' : 'USD';
            renderTrainOptions();
        });
        
        trainData.forEach(train => {
            const trainCard = document.createElement('div');
            trainCard.className = 'col-md-4 mb-4';
            
            // Get current price based on selected options
            const currentPrice = getCurrentPrice(train);
            const currencySymbol = currencyDisplay === 'USD' ? '$' : '€';
            const classLabel = classType === 'firstClass' ? 'First Class' : 'Regular';
            
            const regularPrice = currencyDisplay === 'USD' ? train.priceRegularUSD : train.priceRegularEUR;
            const firstClassPrice = currencyDisplay === 'USD' ? train.priceFirstClassUSD : train.priceFirstClassEUR;
            // Calculate total price for 2 people based on regular price
            const totalPrice = regularPrice * 2;
            
            trainCard.innerHTML = `
                <div class="card train-card h-100" data-id="${train.id}">
                    <div class="card-body">
                        <h5 class="card-title">${train.departure} → ${train.arrival}</h5>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="time-badge">${convertTo12Hour(train.departureTime)}</span>
                            <span>→</span>
                            <span class="time-badge">${convertTo12Hour(train.arrivalTime)}</span>
                        </div>
                        <p class="card-text">Duration: ${train.duration}</p>
                        <div class="price-container mb-3">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div class="price-info">
                                    <span class="price-label">Price (per person):</span>
                                    <span class="price-value ms-2" id="price-${train.id}">${currencySymbol}${regularPrice.toFixed(2)}</span>
                                </div>
                                <button class="btn btn-sm btn-outline-info class-toggle-btn" data-train-id="${train.id}" data-class-type="regular">Regular</button>
                            </div>
                            <p class="card-text mb-0">Total Price (2 people): ${currencySymbol}${totalPrice.toFixed(2)}</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn btn-sm btn-outline-primary select-train-btn">Select</button>
                            ${train.tag ? `<span class="train-tag badge bg-${train.tag === 'Earliest' ? 'success' : 'warning'}">${train.tag}</span>` : '<span></span>'}
                            <a href="${train.link}" target="_blank" class="btn btn-sm btn-outline-secondary">Book</a>
                        </div>
                    </div>
                </div>
            `;
            trainContainer.appendChild(trainCard);
            
            // Add event listener for train selection
            const selectBtn = trainCard.querySelector('.select-train-btn');
            selectBtn.addEventListener('click', () => {
                document.querySelectorAll('.train-card').forEach(card => {
                    card.classList.remove('selected');
                });
                trainCard.querySelector('.card').classList.add('selected');
                selectedTrain = train;
                updateItinerary();
            });
            
            // Add event listener for class toggle button
            const classToggleBtn = trainCard.querySelector('.class-toggle-btn');
            classToggleBtn.addEventListener('click', function() {
                const trainId = this.getAttribute('data-train-id');
                const currentClassType = this.getAttribute('data-class-type');
                const priceDisplay = document.getElementById(`price-${trainId}`);
                const currencySymbol = currencyDisplay === 'USD' ? '$' : '€';
                
                if (currentClassType === 'regular') {
                    // Switch to first class
                    const firstClassPrice = currencyDisplay === 'USD' ? train.priceFirstClassUSD : train.priceFirstClassEUR;
                    priceDisplay.textContent = `${currencySymbol}${firstClassPrice.toFixed(2)}`;
                    // Update total price (2 people)
                    const totalPriceElement = priceDisplay.closest('.price-container').querySelector('.card-text');
                    totalPriceElement.textContent = `Total Price (2 people): ${currencySymbol}${(firstClassPrice * 2).toFixed(2)}`;
                    this.textContent = 'First Class';
                    this.setAttribute('data-class-type', 'firstClass');
                    this.classList.remove('btn-outline-info');
                    this.classList.add('btn-info');
                } else {
                    // Switch to regular
                    const regularPrice = currencyDisplay === 'USD' ? train.priceRegularUSD : train.priceRegularEUR;
                    priceDisplay.textContent = `${currencySymbol}${regularPrice.toFixed(2)}`;
                    // Update total price (2 people)
                    const totalPriceElement = priceDisplay.closest('.price-container').querySelector('.card-text');
                    totalPriceElement.textContent = `Total Price (2 people): ${currencySymbol}${(regularPrice * 2).toFixed(2)}`;
                    this.textContent = 'Regular';
                    this.setAttribute('data-class-type', 'regular');
                    this.classList.remove('btn-info');
                    this.classList.add('btn-outline-info');
                }
            });
        });
        
        // Add compare button
        const compareRow = document.createElement('div');
        compareRow.className = 'row compare-class-row';
        compareRow.innerHTML = `
            <div class="col-12 text-center mt-3 mb-4">
                <button id="compareClassBtn" class="btn btn-outline-primary">Compare Class</button>
            </div>
        `;
        trainContainer.parentNode.appendChild(compareRow);
        
        // Add event listener for compare button
        document.getElementById('compareClassBtn').addEventListener('click', showClassComparison);
    }
    
    // Show class comparison modal
    function showClassComparison() {
        // Create modal if it doesn't exist
        let modal = document.getElementById('classComparisonModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.id = 'classComparisonModal';
            modal.tabIndex = '-1';
            modal.setAttribute('aria-labelledby', 'classComparisonModalLabel');
            modal.setAttribute('aria-hidden', 'true');
            
            modal.innerHTML = `
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="classComparisonModalLabel">Comparison</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Feature</th>
                                            <th>1st Class</th>
                                            <th>2nd Class</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Luggage Included</td>
                                            <td><i class="bi bi-check-circle-fill text-success"></i></td>
                                            <td><i class="bi bi-check-circle-fill text-success"></i></td>
                                        </tr>
                                        <tr>
                                            <td>Electrical Outlet</td>
                                            <td>Individual outlet</td>
                                            <td>Shared outlet</td>
                                        </tr>
                                        <tr>
                                            <td>TGV INOUI Portal Access</td>
                                            <td><i class="bi bi-check-circle-fill text-success"></i> News articles & content</td>
                                            <td><i class="bi bi-check-circle-fill text-success"></i> News articles & content</td>
                                        </tr>
                                        <tr>
                                            <td>Seat Selection</td>
                                            <td><i class="bi bi-check-circle-fill text-success"></i></td>
                                            <td>Not specified</td>
                                        </tr>
                                        <tr>
                                            <td>Comfort Level</td>
                                            <td>Enhanced (1st class comfort)</td>
                                            <td>Standard</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        
        // Initialize and show modal
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }
    
    // Render restaurant options
    function renderRestaurantOptions() {
        const restaurantContainer = document.getElementById('restaurantOptionsContainer');
        if (!restaurantContainer) {
            console.error('Restaurant container not found');
            return;
        }
        
        restaurantContainer.innerHTML = '';
        
        // Create a table for restaurant options
        const table = document.createElement('table');
        table.className = 'table table-hover restaurant-table';
        
        // Create table header
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Restaurant</th>
                <th>Cuisine</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Suitable For</th>
                <th>Actions</th>
            </tr>
        `;
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        // Render all restaurant options
        restaurantData.forEach(restaurant => {
            const suitableFor = [];
            if (restaurant.suitable.includes('lunch')) suitableFor.push('Lunch');
            if (restaurant.suitable.includes('dinner')) suitableFor.push('Dinner');
            
            const row = document.createElement('tr');
            row.className = 'restaurant-item';
            row.setAttribute('data-id', restaurant.id);
            row.setAttribute('data-suitable', restaurant.suitable.join(','));
            
            row.innerHTML = `
                <td>
                    <div class="d-flex align-items-center">
                        <span class="drag-handle me-2">☰</span>
                        <strong>${restaurant.name}</strong>
                    </div>
                </td>
                <td>${restaurant.cuisine}</td>
                <td>${restaurant.price}</td>
                <td>${restaurant.rating} ★</td>
                <td><span class="meal-badge">${suitableFor.join(' & ')}</span></td>
                <td>
                    <div class="d-flex">
                        <a href="${restaurant.mapLink}" target="_blank" class="btn btn-sm btn-outline-secondary me-1">Map</a>
                        ${restaurant.website ? `<a href="${restaurant.website}" target="_blank" class="btn btn-sm btn-outline-secondary">Web</a>` : ''}
                    </div>
                </td>
            `;
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        restaurantContainer.appendChild(table);
        
        // Add tooltip with description
        document.querySelectorAll('.restaurant-item').forEach(item => {
            const restaurantId = parseInt(item.getAttribute('data-id'));
            const restaurant = restaurantData.find(r => r.id === restaurantId);
            if (restaurant) {
                const restaurantName = item.querySelector('strong');
                restaurantName.setAttribute('title', restaurant.description);
            }
            
            // Add event listeners for restaurant selection
            item.addEventListener('click', function() {
                const restaurantId = parseInt(this.getAttribute('data-id'));
                
                // Toggle the selected class
                this.classList.toggle('selected');
                
                updateItinerary();
            });
        });
    }
    
    // Initialize the application
    function init() {
        try {
            console.log('Initializing app...');
            // Display task details
            document.getElementById('taskTitle').textContent = taskDetails.title;
            document.getElementById('taskDates').textContent = taskDetails.dates;
            document.getElementById('taskDescription').textContent = taskDetails.description;
            
            console.log('About to render train options...');
            renderTrainOptions();
            console.log('Train options rendered');
            
            console.log('About to render restaurant options...');
            renderRestaurantOptions();
            console.log('Restaurant options rendered');
            
            // Initialize meal schedule table
            const mealScheduleBody = document.getElementById('mealScheduleBody');
            if (mealScheduleBody) {
                // Create table rows for each day
                tripDays.forEach(day => {
                    const row = document.createElement('tr');
                    
                    // Date cell
                    const dateCell = document.createElement('td');
                    dateCell.className = 'date-cell';
                    dateCell.innerHTML = `${day.day}<br>${formatDate(day.date)}`;
                    row.appendChild(dateCell);
                    
                    // Lunch cell
                    const lunchCell = document.createElement('td');
                    lunchCell.setAttribute('data-date', day.date);
                    lunchCell.setAttribute('data-meal-type', 'lunch');
                    lunchCell.className = 'meal-cell lunch-cell';
                    lunchCell.innerHTML = `<div class="meal-placeholder" data-date="${day.date}" data-meal-type="lunch">Drop lunch options here</div>`;
                    row.appendChild(lunchCell);
                    
                    // Dinner cell
                    const dinnerCell = document.createElement('td');
                    dinnerCell.setAttribute('data-date', day.date);
                    dinnerCell.setAttribute('data-meal-type', 'dinner');
                    dinnerCell.className = 'meal-cell dinner-cell';
                    dinnerCell.innerHTML = `<div class="meal-placeholder" data-date="${day.date}" data-meal-type="dinner">Drop dinner options here</div>`;
                    row.appendChild(dinnerCell);
                    
                    // Add row to table
                    mealScheduleBody.appendChild(row);
                });
            }
            
            // Add event listener for save button
            const saveButton = document.getElementById('saveItineraryBtn');
            if (saveButton) {
                saveButton.addEventListener('click', function() {
                    alert('Saving functionality is using hardcoded data. In a real app, this would save to Google Sheets.');
                });
            }
            
            console.log('App initialized successfully with hardcoded data');
        } catch (error) {
            console.error('Error in init():', error);
        }
    }
    
    // Helper function to format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Call the init function to start the application
    init();
});