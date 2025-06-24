document.addEventListener('DOMContentLoaded', function() {
    // Key task details
    const taskDetails = {
        title: "RAISE Summit - Annecy",
        dates: "July 9-11, 2025",
        location: "Annecy, France",
        description: "Planning for the RAISE Summit in Annecy including travel and dining options."
    };
    
    // Data structure for trains
    const trainOptions = [
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
    
    // Global settings for price display
    let currencyDisplay = "USD"; // Default currency (USD or EUR)
    let classType = "regular"; // Default class type (regular or firstClass)

    // Data structure for restaurants
    const restaurantOptions = [
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
            description: "Authentic Savoyard cuisine specializing in cheese dishes",
            suitable: ["lunch", "dinner"],
            availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
        },
        {
            id: 6,
            name: "Le Belvédère",
            cuisine: "French/Modern",
            price: "€€€",
            location: "Annecy",
            rating: 4.6,
            mapLink: "https://maps.app.goo.gl/7V1DD1fByDx9pBvs6",
            description: "Panoramic views with sophisticated French cuisine",
            suitable: ["dinner"],
            availableDates: ["2025-07-10", "2025-07-11"]
        },
        {
            id: 7,
            name: "Café de la Place",
            cuisine: "French/Casual",
            price: "€€",
            location: "Annecy",
            rating: 4.3,
            mapLink: "https://maps.app.goo.gl/F8jw6nk9ZG1kmxWM6",
            description: "Relaxed bistro fare in a central location",
            suitable: ["lunch"],
            availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
        },
        {
            id: 8,
            name: "Auberge du Lac",
            cuisine: "French/Seafood",
            price: "€€€",
            location: "Annecy",
            rating: 4.7,
            mapLink: "https://maps.app.goo.gl/ue5i2r3S2PVAc14b9",
            description: "Lakeside dining featuring fresh seafood and lake fish",
            suitable: ["lunch", "dinner"],
            availableDates: ["2025-07-10", "2025-07-11"]
        },
        {
            id: 9,
            name: "Le Bistrot des Tilleuls",
            cuisine: "French",
            price: "€€",
            location: "Annecy",
            rating: 4.4,
            mapLink: "https://maps.app.goo.gl/7ESamMNH6zNprVzp6",
            description: "Cozy bistro with traditional French dishes",
            suitable: ["lunch"],
            availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
        },
        {
            id: 10,
            name: "La Coupole",
            cuisine: "Italian/Pizza",
            price: "€",
            location: "Annecy",
            rating: 4.2,
            mapLink: "https://maps.app.goo.gl/xwMT8cneQVjbyyoj9",
            description: "Casual Italian cuisine with authentic pizzas",
            suitable: ["lunch"],
            availableDates: ["2025-07-09", "2025-07-10", "2025-07-11"]
        },
        {
            id: 11,
            name: "L'Étage",
            cuisine: "French/Modern",
            price: "€€",
            location: "Annecy",
            rating: 4.5,
            mapLink: "https://maps.app.goo.gl/U8aVgRu3MC7evLx76",
            description: "Contemporary French cuisine with a creative touch",
            suitable: ["dinner"],
            availableDates: ["2025-07-09", "2025-07-10"]
        }
    ];

    // Days of the trip
    const tripDays = [
        { date: "2025-07-08", day: "Tuesday" },
        { date: "2025-07-09", day: "Wednesday" },
        { date: "2025-07-10", day: "Thursday" },
        { date: "2025-07-11", day: "Friday" },
        { date: "2025-07-12", day: "Saturday" }
    ];

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
        
        trainOptions.forEach(train => {
            const trainCard = document.createElement('div');
            trainCard.className = `col-md-4 mb-4`;
            
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
                            <a href="https://www.google.com/travel/clk/tr?pcurl=https://www.sncf-connect.com/app/en-en/redirect?redirection_type%253DSEARCH%2526prex%253DGoogleTrain%2526outward_date%253D2025-07-09-12-46%2526origin_transporter_code%253DFRPLY%2526destination_transporter_code%253DFRNCY&pc=ChMI1dH49YD5jQMVdiG3AB34vy6hEgdmcl9zbmNmIAMqAQEyAmVuOgJVU0ABSAFSUgpQEgVGUlBMWRoFRlJOQ1kiBwjpDxAHGAkqDQjpDxAHGAkgCiguQgAyDQjpDxAHGAkgDiggQgA45PaiiKO4qB5Al_iBkLDnsvtxSgJGUlICRlJaBwoDRVVSEGBitwFodHRwczovL3d3dy5zbmNmLWNvbm5lY3QuY29tL2FwcC9lbi1lbi9yZWRpcmVjdD9yZWRpcmVjdGlvbl90eXBlPVNFQVJDSCZwcmV4PUdvb2dsZVRyYWluJm91dHdhcmRfZGF0ZT0yMDI1LTA3LTA5LTEyLTQ2Jm9yaWdpbl90cmFuc3BvcnRlcl9jb2RlPUZSUExZJmRlc3RpbmF0aW9uX3RyYW5zcG9ydGVyX2NvZGU9RlJOQ1loAXiwAw" target="_blank" class="btn btn-sm btn-outline-secondary">Book</a>
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
                const currencySymbol = currencyDisplay === 'USD' ? '$' : 'u20ac';
                
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

        // Remove any existing compare buttons before adding a new one
        const existingCompareRows = document.querySelectorAll('.compare-class-row');
        existingCompareRows.forEach(row => row.remove());
        
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
        // Check if modal already exists
        let modal = document.getElementById('classComparisonModal');
        if (!modal) {
            // Create modal
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
    
    // Keep the original function for backward compatibility
    function showTrainComparison() {
        showClassComparison();
    }

    // Render restaurant options
    function renderRestaurantOptions() {
        const restaurantContainer = document.getElementById('restaurantOptionsContainer');
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
        restaurantOptions.forEach(restaurant => {
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
            const restaurant = restaurantOptions.find(r => r.id === restaurantId);
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



    // Update the itinerary display
    function updateItinerary() {
        const trainDisplay = document.getElementById('selectedTrainDisplay');
        const mealScheduleBody = document.getElementById('mealScheduleBody');

        // Update train display
        if (selectedTrain) {
            // Get prices for the selected train
            const regularPrice = currencyDisplay === 'USD' ? selectedTrain.priceRegularUSD : selectedTrain.priceRegularEUR;
            const firstClassPrice = currencyDisplay === 'USD' ? selectedTrain.priceFirstClassUSD : selectedTrain.priceFirstClassEUR;
            // Calculate total price for 2 people based on regular price initially
            const totalPrice = regularPrice * 2;
            const currencySymbol = currencyDisplay === 'USD' ? '$' : '€';
            
            trainDisplay.innerHTML = `
                <h5>Selected Train:</h5>
                <div class="card mb-3">
                    <div class="card-body">
                        <h6>${selectedTrain.departure} → ${selectedTrain.arrival}</h6>
                        <div class="d-flex align-items-center mb-2">
                            <p class="mb-0 me-2">Date: ${formatDate(selectedTrain.departureDate)}</p>
                            ${selectedTrain.tag ? `<span class="train-tag badge bg-${selectedTrain.tag === 'Earliest' ? 'success' : 'warning'}">${selectedTrain.tag}</span>` : ''}
                        </div>
                        <p class="mb-3">Time: ${convertTo12Hour(selectedTrain.departureTime)} - ${convertTo12Hour(selectedTrain.arrivalTime)} (${selectedTrain.duration})</p>
                        <div class="price-container mb-3">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div class="price-info">
                                    <span class="price-label">Price (per person):</span>
                                    <span class="price-value ms-2" id="selected-price">${currencySymbol}${regularPrice.toFixed(2)}</span>
                                </div>
                                <button class="btn btn-sm btn-outline-info" id="selected-class-toggle" data-class-type="regular">Regular</button>
                            </div>
                            <p class="mb-0">Total Price (2 people): ${currencySymbol}${totalPrice.toFixed(2)}</p>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <a href="https://www.google.com/travel/clk/tr?pcurl=https://www.sncf-connect.com/app/en-en/redirect?redirection_type%253DSEARCH%2526prex%253DGoogleTrain%2526outward_date%253D2025-07-09-12-46%2526origin_transporter_code%253DFRPLY%2526destination_transporter_code%253DFRNCY&pc=ChMI1dH49YD5jQMVdiG3AB34vy6hEgdmcl9zbmNmIAMqAQEyAmVuOgJVU0ABSAFSUgpQEgVGUlBMWRoFRlJOQ1kiBwjpDxAHGAkqDQjpDxAHGAkgCiguQgAyDQjpDxAHGAkgDiggQgA45PaiiKO4qB5Al_iBkLDnsvtxSgJGUlICRlJaBwoDRVVSEGBitwFodHRwczovL3d3dy5zbmNmLWNvbm5lY3QuY29tL2FwcC9lbi1lbi9yZWRpcmVjdD9yZWRpcmVjdGlvbl90eXBlPVNFQVJDSCZwcmV4PUdvb2dsZVRyYWluJm91dHdhcmRfZGF0ZT0yMDI1LTA3LTA5LTEyLTQ2Jm9yaWdpbl90cmFuc3BvcnRlcl9jb2RlPUZSUExZJmRlc3RpbmF0aW9uX3RyYW5zcG9ydGVyX2NvZGU9RlJOQ1loAXiwAw" target="_blank" class="btn btn-sm btn-primary">Book This Train</a>
                        </div>
                    </div>
                </div>
            `;
            
            // Add event listener for the selected train's class toggle button
            document.getElementById('selected-class-toggle').addEventListener('click', function() {
                const currentClassType = this.getAttribute('data-class-type');
                const priceDisplay = document.getElementById('selected-price');
                const totalPriceElement = priceDisplay.closest('.price-container').querySelector('.mb-0');
                
                if (currentClassType === 'regular') {
                    // Switch to first class
                    priceDisplay.textContent = `${currencySymbol}${firstClassPrice.toFixed(2)}`;
                    totalPriceElement.textContent = `Total Price (2 people): ${currencySymbol}${(firstClassPrice * 2).toFixed(2)}`;
                    this.textContent = 'First Class';
                    this.setAttribute('data-class-type', 'firstClass');
                    this.classList.remove('btn-outline-info');
                    this.classList.add('btn-info');
                } else {
                    // Switch to regular
                    priceDisplay.textContent = `${currencySymbol}${regularPrice.toFixed(2)}`;
                    totalPriceElement.textContent = `Total Price (2 people): ${currencySymbol}${(regularPrice * 2).toFixed(2)}`;
                    this.textContent = 'Regular';
                    this.setAttribute('data-class-type', 'regular');
                    this.classList.remove('btn-info');
                    this.classList.add('btn-outline-info');
                }
            });
        } else {
            trainDisplay.innerHTML = 'No train selected yet';
        }

        // Update meal schedule table
        mealScheduleBody.innerHTML = '';
        
        // Create table rows for each day
        tripDays.forEach(day => {
            const row = document.createElement('tr');
            const lunchItems = selectedRestaurants[day.date].lunch;
            const dinnerItems = selectedRestaurants[day.date].dinner;
            
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
            
            if (lunchItems.length > 0) {
                lunchItems.forEach(restaurantId => {
                    const lunch = restaurantOptions.find(r => r.id === restaurantId);
                    if (lunch) {
                        const restaurantElement = document.createElement('div');
                        restaurantElement.className = 'draggable-item';
                        restaurantElement.setAttribute('data-id', lunch.id);
                        restaurantElement.setAttribute('data-date', day.date);
                        restaurantElement.setAttribute('data-meal-type', 'lunch');
                        
                        // Determine position badge
                        const lunchPosition = lunchItems.indexOf(restaurantId);
                        const lunchBadgeText = lunchPosition === 0 ? 'Top Choice' : `Option ${lunchPosition}`;
                        
                        restaurantElement.innerHTML = `
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="drag-handle">☰</span>
                                <div class="d-flex align-items-center justify-content-between" style="width: 65%;">
                                    <strong style="margin-right: 20px;">${lunch.name}</strong>
                                    <span class="position-badge ${lunchPosition === 0 ? 'top-choice' : ''}" style="margin: 0 15px;">${lunchBadgeText}</span>
                                    ${lunch.website ? `<a href="${lunch.website}" target="_blank" class="btn btn-sm btn-outline-primary">Book</a>` : ''}
                                </div>
                                <button class="btn btn-sm btn-outline-danger remove-btn">×</button>
                            </div>
                        `;
                        
                        lunchCell.appendChild(restaurantElement);
                    }
                });
            } else {
                lunchCell.innerHTML = `<div class="meal-placeholder" data-date="${day.date}" data-meal-type="lunch">Drop lunch options here</div>`;
            }
            row.appendChild(lunchCell);
            
            // Dinner cell
            const dinnerCell = document.createElement('td');
            dinnerCell.setAttribute('data-date', day.date);
            dinnerCell.setAttribute('data-meal-type', 'dinner');
            dinnerCell.className = 'meal-cell dinner-cell';
            
            if (dinnerItems.length > 0) {
                dinnerItems.forEach(restaurantId => {
                    const dinner = restaurantOptions.find(r => r.id === restaurantId);
                    if (dinner) {
                        const restaurantElement = document.createElement('div');
                        restaurantElement.className = 'draggable-item';
                        restaurantElement.setAttribute('data-id', dinner.id);
                        restaurantElement.setAttribute('data-date', day.date);
                        restaurantElement.setAttribute('data-meal-type', 'dinner');
                        
                        // Determine position badge
                        const dinnerPosition = dinnerItems.indexOf(restaurantId);
                        const dinnerBadgeText = dinnerPosition === 0 ? 'Top Choice' : `Option ${dinnerPosition}`;
                        
                        restaurantElement.innerHTML = `
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="drag-handle">☰</span>
                                <div class="d-flex align-items-center justify-content-between" style="width: 65%;">
                                    <strong style="margin-right: 20px;">${dinner.name}</strong>
                                    <span class="position-badge ${dinnerPosition === 0 ? 'top-choice' : ''}" style="margin: 0 15px;">${dinnerBadgeText}</span>
                                    ${dinner.website ? `<a href="${dinner.website}" target="_blank" class="btn btn-sm btn-outline-primary">Book</a>` : ''}
                                </div>
                                <button class="btn btn-sm btn-outline-danger remove-btn">×</button>
                            </div>
                        `;
                        
                        dinnerCell.appendChild(restaurantElement);
                    }
                });
            } else {
                dinnerCell.innerHTML = `<div class="meal-placeholder" data-date="${day.date}" data-meal-type="dinner">Drop dinner options here</div>`;
            }
            row.appendChild(dinnerCell);
            
            // Add row to table
            mealScheduleBody.appendChild(row);
        });
        
        // Add event listeners for remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const item = this.closest('.draggable-item');
                const date = item.getAttribute('data-date');
                const mealType = item.getAttribute('data-meal-type');
                const restaurantId = parseInt(item.getAttribute('data-id'));
                
                // Remove from selection
                const index = selectedRestaurants[date][mealType].indexOf(restaurantId);
                if (index > -1) {
                    selectedRestaurants[date][mealType].splice(index, 1);
                }
                
                // Update UI
                updateItinerary();
            });
        });

        // Initialize drag and drop
        initDragAndDrop();
    }

    // Initialize drag and drop functionality
    function initDragAndDrop() {
        // Make table cells sortable for drag and drop
        document.querySelectorAll('.meal-cell').forEach(cell => {
            new Sortable(cell, {
                animation: 150,
                group: 'restaurants',
                // Allow dragging from anywhere on the row
                filter: '.meal-placeholder',  // Don't drag placeholders
                onAdd: function(evt) {
                    // Get the item that was moved
                    const item = evt.item;
                    const targetCell = evt.to;
                    const date = targetCell.getAttribute('data-date');
                    const mealType = targetCell.getAttribute('data-meal-type');
                    const restaurantId = parseInt(item.getAttribute('data-id'));
                    const suitableTypes = item.getAttribute('data-suitable')?.split(',') || [];
                    
                    // Check if restaurant is suitable for this meal type
                    if (!suitableTypes.includes(mealType)) {
                        console.log(`Restaurant is not suitable for ${mealType}`);
                        // Allow it anyway since the user explicitly dragged it there
                    }
                    
                    // Update item attributes
                    item.setAttribute('data-date', date);
                    item.setAttribute('data-meal-type', mealType);
                    
                    // Add to selectedRestaurants array if not already there
                    if (!selectedRestaurants[date][mealType].includes(restaurantId)) {
                        selectedRestaurants[date][mealType].push(restaurantId);
                        
                        // Sort to ensure 'Top Choice' is first if user drags a new item to position 0
                        const existingItems = targetCell.querySelectorAll('.draggable-item');
                        if (existingItems.length > 1) { // If there are multiple items
                            // Check if item was dropped at the top
                            const wasDroppedFirst = item === existingItems[0];
                            if (wasDroppedFirst) {
                                // Reorder the array to match visual order
                                const newOrder = Array.from(existingItems).map(el => parseInt(el.getAttribute('data-id')));
                                selectedRestaurants[date][mealType] = newOrder;
                            }
                        }
                    }
                    
                    // Handle placeholders
                    const placeholder = targetCell.querySelector('.meal-placeholder');
                    if (placeholder) {
                        placeholder.remove();
                    }
                    
                    // Update the UI
                    updateItinerary();
                }
            });
        });
        
        // Allow dragging restaurants from options to table
        const restaurantContainer = document.querySelector('#restaurantOptionsContainer tbody');
        new Sortable(restaurantContainer, {
            animation: 150,
            group: {
                name: 'restaurants',
                pull: 'clone',
                put: false
            },
            sort: false,
            // Allow dragging from anywhere on the row
            onEnd: function(evt) {
                // Only process if item was successfully dropped elsewhere
                if (evt.to !== evt.from) {
                    const item = evt.item;
                    const restaurantId = parseInt(item.getAttribute('data-id'));
                    
                    // Find target cell
                    const targetCell = evt.to;
                    if (targetCell.classList.contains('meal-cell')) {
                        const targetDate = targetCell.getAttribute('data-date');
                        const targetMealType = targetCell.getAttribute('data-meal-type');
                        
                        // Check if restaurant is suitable for this meal type
                        const suitableTypes = item.getAttribute('data-suitable')?.split(',') || [];
                        if (!suitableTypes.includes(targetMealType)) {
                            console.log(`Restaurant is not suitable for ${targetMealType}, but allowing it as user's choice`);
                            // Continue anyway since the user explicitly dragged it there
                        }
                        
                        // Add to selectedRestaurants array if not already there
                        if (!selectedRestaurants[targetDate][targetMealType].includes(restaurantId)) {
                            selectedRestaurants[targetDate][targetMealType].push(restaurantId);
                            
                            // Sort to ensure 'Top Choice' is first if user drags a new item to position 0
                            // This ensures that if a new restaurant is dragged to the top of the list, it becomes 'Top Choice'
                            const existingItems = document.querySelectorAll(`.meal-cell[data-date="${targetDate}"][data-meal-type="${targetMealType}"] .draggable-item`);
                            if (existingItems.length > 0) {
                                // If item was dropped at the beginning, make it 'Top Choice'
                                const wasDroppedFirst = item === existingItems[0];
                                if (wasDroppedFirst) {
                                    // Reorder the array to match visual order
                                    const newOrder = Array.from(existingItems).map(el => parseInt(el.getAttribute('data-id')));
                                    selectedRestaurants[targetDate][targetMealType] = newOrder;
                                }
                            }
                        }
                        
                        // Mark the original row as selected in the options table
                        const originalRow = document.querySelector(`.restaurant-item[data-id="${restaurantId}"]`);
                        if (originalRow) {
                            originalRow.classList.add('selected');
                        }
                        
                        // Update the UI
                        updateItinerary();
                    }
                }
            });
    }

    // Format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Initialize Google Sheets API for backend storage
    function initGoogleSheetsBackend() {
        const GOOGLE_SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbxUTSzyMC7OBiAznFbcOpXzbmvwB6_cjId-a4Nvve5PEI2b-TerwWnjXNNdXB5EDlIt/exec';
        
        // Add Google Sheets API script
        if (!document.getElementById('google-sheets-api')) {
            const script = document.createElement('script');
            script.id = 'google-sheets-api';
            script.src = 'https://apis.google.com/js/api.js';
            script.onload = initGoogleSheetsAPI;
            document.head.appendChild(script);
        } else {
            loadSavedData();
        }
        
        function initGoogleSheetsAPI() {
            console.log('Google Sheets API loaded');
            gapi.load('client:auth2', initClient);
        }
        
        function initClient() {
            console.log('Google API client initialized');
            loadSavedData();
        }
        
        // Save itinerary to Google Sheets or localStorage as fallback
        document.getElementById('saveItineraryBtn').addEventListener('click', function() {
            const itineraryData = {
                train: selectedTrain,
                restaurants: selectedRestaurants,
                lastUpdated: new Date().toISOString()
            };
            
            // Save to localStorage as a backup
            localStorage.setItem('savedItinerary', JSON.stringify(itineraryData));
            
            // Try to save to Google Sheets
            saveToGoogleSheets(itineraryData);
        });
        
        // Save data to Google Sheets
        function saveToGoogleSheets(data) {
            try {
                console.log('Saving to Google Sheets:', data);
                // Real implementation using fetch to Google Apps Script Web App
                fetch(GOOGLE_SHEETS_API_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'save',
                        data: data
                    }),
                    headers: {'Content-Type': 'application/json'}
                }).then(response => {
                    console.log('Response status:', response.status);
                    return response.json();
                })
                .then(result => {
                    console.log('Success:', result);
                    showSaveConfirmation(true);
                })
                .catch(error => {
                    console.error('Error:', error);
                    showSaveConfirmation(false);
                });
                
            } catch (e) {
                console.error('Error saving to Google Sheets:', e);
                showSaveConfirmation(false);
            }
    }
    
    // Test function for Google Sheets integration
    window.testGoogleSheetsIntegration = function() {
        console.log('Testing Google Sheets integration...');
        console.log('API URL:', GOOGLE_SHEETS_API_URL);
        
        // Test data
        const testData = {
            train: trainOptions[0],
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
        }).catch(error => {
            console.error('Test error:', error);
        });
    }
        
        // Show save confirmation message
        function showSaveConfirmation(success) {
            // Check if notification element exists
            let notification = document.getElementById('saveNotification');
            if (!notification) {
                notification = document.createElement('div');
                notification.id = 'saveNotification';
                notification.className = 'position-fixed bottom-0 end-0 p-3';
                document.body.appendChild(notification);
            }
            
            notification.innerHTML = `
                <div class="toast ${success ? 'bg-success' : 'bg-danger'} text-white" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="me-auto">${success ? 'Success' : 'Error'}</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        ${success ? 'Itinerary saved successfully!' : 'Error saving itinerary. Please try again.'}
                    </div>
                </div>
            `;
            
            const toast = new bootstrap.Toast(notification.querySelector('.toast'));
            toast.show();
        }
        
        // Load previously saved itinerary
        function loadSavedData() {
            // Try loading from localStorage first
            const savedItinerary = localStorage.getItem('savedItinerary');
            if (savedItinerary) {
                try {
                    const data = JSON.parse(savedItinerary);
                    if (data.train) {
                        selectedTrain = data.train;
                    }
                    if (data.restaurants) {
                        selectedRestaurants = data.restaurants;
                    }
                    updateItinerary();
                    
                    // Update UI to show selected items after slight delay to ensure DOM is ready
                    setTimeout(() => {
                        if (selectedTrain) {
                            const trainCard = document.querySelector(`.train-card[data-id="${selectedTrain.id}"]`);
                            if (trainCard) trainCard.classList.add('selected');
                        }
                        
                        // Update restaurant selections
                        for (const date in selectedRestaurants) {
                            for (const mealType in selectedRestaurants[date]) {
                                const restaurantId = selectedRestaurants[date][mealType];
                                if (restaurantId) {
                                    const restaurantItem = document.querySelector(
                                        `.restaurant-item[data-date="${date}"][data-meal-type="${mealType}"][data-id="${restaurantId}"]`
                                    );
                                    if (restaurantItem) restaurantItem.classList.add('selected');
                                }
                            }
                        }
                    }, 100);
                    
                } catch (e) {
                    console.error('Error loading saved itinerary:', e);
                }
            }
            
            // Then try to load from Google Sheets
            loadFromGoogleSheets();
        }
        
        // Load data from Google Sheets
        function loadFromGoogleSheets() {
            console.log('Loading from Google Sheets...');
            fetch(GOOGLE_SHEETS_API_URL + '?action=load')
                .then(response => response.json())
                .then(result => {
                    if (result.success && result.data) {
                        console.log('Data loaded from Google Sheets:', result.data);
                        if (result.data.train) {
                            selectedTrain = result.data.train;
                        }
                        if (result.data.restaurants) {
                            selectedRestaurants = result.data.restaurants;
                        }
                        updateItinerary();
                        
                        // Update UI to show selected items
                        setTimeout(() => {
                            if (selectedTrain) {
                                const trainCard = document.querySelector(`.train-card[data-id="${selectedTrain.id}"]`);
                                if (trainCard) trainCard.classList.add('selected');
                            }
                            
                            // Update restaurant selections
                            for (const date in selectedRestaurants) {
                                for (const mealType in selectedRestaurants[date]) {
                                    const restaurantIds = selectedRestaurants[date][mealType];
                                    if (restaurantIds && restaurantIds.length > 0) {
                                        restaurantIds.forEach(id => {
                                            const restaurantItem = document.querySelector(`.restaurant-item[data-id="${id}"]`);
                                            if (restaurantItem) restaurantItem.classList.add('selected');
                                        });
                                    }
                                }
                            }
                        }, 100);
                    }
                })
                .catch(error => {
                    console.error('Error loading from Google Sheets:', error);
                });
        }
    }

    // Initialize the application
    function init() {
        // Display task details
        document.getElementById('taskTitle').textContent = taskDetails.title;
        document.getElementById('taskDates').textContent = taskDetails.dates;
        document.getElementById('taskDescription').textContent = taskDetails.description;
        
        renderTrainOptions();
        renderRestaurantOptions();
        initGoogleSheetsBackend();
    }

    // Start the application
    init();
});