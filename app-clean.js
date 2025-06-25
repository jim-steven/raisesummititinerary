// Clean Restaurant App - No Google Sheets Integration
console.log('Starting clean restaurant app...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing restaurant app...');
    
    // Check if restaurant database is loaded
    if (!window.restaurantDatabase) {
        console.error('Restaurant database not loaded!');
        return;
    }
    
    console.log('Restaurant database loaded with', window.restaurantDatabase.length, 'restaurants');
    
    // Use the restaurant database
    const restaurantOptions = window.restaurantDatabase;
    
    // Hardcoded train options (simplified)
    const trainOptions = [
        {
            id: 1,
            departure: "Paris Lyon",
            arrival: "Annecy",
            departureDate: "2025-07-09",
            departureTime: "09:46",
            arrivalTime: "13:29",
            duration: "3h 43m",
            priceRegularUSD: 135.41,
            priceFirstClassUSD: 218.04,
            priceRegularEUR: 125.20,
            priceFirstClassEUR: 201.70,
            tag: "Earliest"
        },
        {
            id: 2,
            departure: "Paris Lyon",
            arrival: "Annecy",
            departureDate: "2025-07-09",
            departureTime: "12:46",
            arrivalTime: "16:32",
            duration: "3h 46m",
            priceRegularUSD: 107.31,
            priceFirstClassUSD: 130.39,
            priceRegularEUR: 99.25,
            priceFirstClassEUR: 120.60,
            tag: ""
        },
        {
            id: 3,
            departure: "Paris Lyon",
            arrival: "Annecy",
            departureDate: "2025-07-09",
            departureTime: "17:46",
            arrivalTime: "21:40",
            duration: "3h 54m",
            priceRegularUSD: 86.50,
            priceFirstClassUSD: 117.70,
            priceRegularEUR: 80.00,
            priceFirstClassEUR: 108.90,
            tag: "Latest"
        }
    ];

    // Trip days
    const tripDays = [
        { date: "2025-07-08", day: "Tuesday" },
        { date: "2025-07-09", day: "Wednesday" },
        { date: "2025-07-10", day: "Thursday" },
        { date: "2025-07-11", day: "Friday" },
        { date: "2025-07-12", day: "Saturday" }
    ];

    // State management
    let selectedTrain = null;
    let selectedRestaurants = {
        "2025-07-08": { lunch: [], dinner: [] },
        "2025-07-09": { lunch: [], dinner: [] },
        "2025-07-10": { lunch: [], dinner: [] },
        "2025-07-11": { lunch: [], dinner: [] },
        "2025-07-12": { lunch: [], dinner: [] }
    };
    let currencyDisplay = "USD";

    // Helper functions
    function convertTo12Hour(time24h) {
        const [hours, minutes] = time24h.split(':');
        const hour = parseInt(hours, 10);
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${suffix}`;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Render train options
    function renderTrainOptions() {
        const trainContainer = document.getElementById('trainOptions');
        if (!trainContainer) return;
        
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
        
        // Add event listener for currency toggle
        document.getElementById('currencyToggle').addEventListener('change', function() {
            currencyDisplay = this.checked ? 'EUR' : 'USD';
            renderTrainOptions();
        });

        // Render train cards
        trainOptions.forEach(train => {
            const trainCard = document.createElement('div');
            trainCard.className = 'col-md-4 mb-4';
            
            const regularPrice = currencyDisplay === 'USD' ? train.priceRegularUSD : train.priceRegularEUR;
            const currencySymbol = currencyDisplay === 'USD' ? '$' : '€';
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
                                    <span class="price-value ms-2">${currencySymbol}${regularPrice.toFixed(2)}</span>
                                </div>
                                <button class="btn btn-sm btn-outline-info">Regular</button>
                            </div>
                            <p class="card-text mb-0">Total Price (2 people): ${currencySymbol}${totalPrice.toFixed(2)}</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn btn-sm btn-outline-primary select-train-btn">Select</button>
                            ${train.tag ? `<span class="train-tag badge bg-${train.tag === 'Earliest' ? 'success' : 'warning'}">${train.tag}</span>` : '<span></span>'}
                            <a href="https://www.google.com/travel" target="_blank" class="btn btn-sm btn-outline-secondary">Book</a>
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
        });

        console.log('Train options rendered');
    }

    // Render restaurant options
    function renderRestaurantOptions() {
        const restaurantContainer = document.getElementById('restaurantOptionsContainer');
        if (!restaurantContainer) {
            console.error('Restaurant container not found!');
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
                <th>Restaurant Name</th>
                <th>Cuisine</th>
                <th>Price Range</th>
                <th>Distance (from hotel)</th>
                <th>Reservation</th>
                <th>Actions</th>
            </tr>
        `;
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        // Render all restaurant options
        restaurantOptions.forEach(restaurant => {
            const row = document.createElement('tr');
            row.className = 'restaurant-item';
            row.setAttribute('data-id', restaurant.id);
            row.setAttribute('data-suitable', restaurant.suitable.join(','));
            
            row.innerHTML = `
                <td>
                    <div class="d-flex align-items-center">
                        <span class="drag-handle me-2">☰</span>
                        <strong class="restaurant-name-clickable" style="cursor: pointer; color: #0066cc;">${restaurant.name}</strong>
                    </div>
                </td>
                <td>${restaurant.cuisine}</td>
                <td>${restaurant.priceRange}</td>
                <td>${restaurant.distance}</td>
                <td>
                    ${restaurant.reservation ? `<a href="${restaurant.reservation}" target="_blank" class="btn btn-sm btn-outline-primary">Reserve</a>` : 'N/A'}
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-info view-details-btn" data-id="${restaurant.id}">View Details</button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        restaurantContainer.appendChild(table);

        // Add event listeners
        document.querySelectorAll('.restaurant-item').forEach(item => {
            const restaurantId = parseInt(item.getAttribute('data-id'));
            
            // Add event listeners for restaurant name clicks
            const restaurantName = item.querySelector('.restaurant-name-clickable');
            restaurantName.addEventListener('click', function() {
                showRestaurantModal(restaurantId);
            });
            
            // Add event listeners for view details button
            const viewDetailsBtn = item.querySelector('.view-details-btn');
            viewDetailsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showRestaurantModal(restaurantId);
            });
        });

        console.log('Restaurant options rendered with', restaurantOptions.length, 'restaurants');
    }

    // Show restaurant modal
    function showRestaurantModal(restaurantId) {
        const restaurant = restaurantOptions.find(r => r.id === restaurantId);
        if (!restaurant) return;

        // Check if modal already exists
        let modal = document.getElementById('restaurantModal');
        if (!modal) {
            // Create modal
            modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.id = 'restaurantModal';
            modal.tabIndex = '-1';
            modal.setAttribute('aria-labelledby', 'restaurantModalLabel');
            modal.setAttribute('aria-hidden', 'true');
            document.body.appendChild(modal);
        }

        // Create image gallery
        const imageGallery = restaurant.images ? restaurant.images.map((img, index) => 
            `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" alt="${restaurant.name}" style="height: 300px; object-fit: cover;">
            </div>`
        ).join('') : '<div class="carousel-item active"><div class="d-flex align-items-center justify-content-center" style="height: 300px; background-color: #f8f9fa;"><span class="text-muted">No images available</span></div></div>';

        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="restaurantModalLabel">${restaurant.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div id="restaurantCarousel" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-inner">
                                        ${imageGallery}
                                    </div>
                                    ${restaurant.images && restaurant.images.length > 1 ? `
                                    <button class="carousel-control-prev" type="button" data-bs-target="#restaurantCarousel" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#restaurantCarousel" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                    ` : ''}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <table class="table table-borderless">
                                    <tr>
                                        <td><strong>Cuisine:</strong></td>
                                        <td>${restaurant.cuisine}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Price Range:</strong></td>
                                        <td>${restaurant.priceRange}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Distance:</strong></td>
                                        <td>${restaurant.distance}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Reservation:</strong></td>
                                        <td>
                                            ${restaurant.reservation ? `<a href="${restaurant.reservation}" target="_blank" class="btn btn-sm btn-primary">Make Reservation</a>` : 'N/A'}
                                        </td>
                                    </tr>
                                </table>
                                <div class="mt-3">
                                    <h6><strong>Vibe/Setting:</strong></h6>
                                    <p>${restaurant.vibe}</p>
                                </div>
                                <div class="mt-3">
                                    <h6><strong>Notable Dishes:</strong></h6>
                                    <p>${restaurant.notableDishes}</p>
                                </div>
                                <div class="mt-3">
                                    <h6><strong>Notes:</strong></h6>
                                    <p>${restaurant.notes}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;

        // Initialize and show modal
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }

    // Update itinerary display
    function updateItinerary() {
        const trainDisplay = document.getElementById('selectedTrainDisplay');
        if (!trainDisplay) return;

        if (selectedTrain) {
            const regularPrice = currencyDisplay === 'USD' ? selectedTrain.priceRegularUSD : selectedTrain.priceRegularEUR;
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
                                    <span class="price-value ms-2">${currencySymbol}${regularPrice.toFixed(2)}</span>
                                </div>
                                <button class="btn btn-sm btn-outline-info">Regular</button>
                            </div>
                            <p class="mb-0">Total Price (2 people): ${currencySymbol}${totalPrice.toFixed(2)}</p>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <a href="https://www.google.com/travel" target="_blank" class="btn btn-sm btn-primary">Book This Train</a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            trainDisplay.innerHTML = 'No train selected yet';
        }

        // Update meal schedule
        const mealScheduleBody = document.getElementById('mealScheduleBody');
        if (mealScheduleBody) {
            mealScheduleBody.innerHTML = '';
            
            tripDays.forEach(day => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="date-cell">${day.day}<br>${formatDate(day.date)}</td>
                    <td class="meal-cell lunch-cell" data-date="${day.date}" data-meal-type="lunch">
                        <div class="meal-placeholder">Drop lunch options here</div>
                    </td>
                    <td class="meal-cell dinner-cell" data-date="${day.date}" data-meal-type="dinner">
                        <div class="meal-placeholder">Drop dinner options here</div>
                    </td>
                `;
                mealScheduleBody.appendChild(row);
            });
        }
    }

    // Initialize the app
    try {
        console.log('Rendering train options...');
        renderTrainOptions();
        
        console.log('Rendering restaurant options...');
        renderRestaurantOptions();
        
        console.log('Updating itinerary...');
        updateItinerary();
        
        console.log('Clean restaurant app initialized successfully!');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});
