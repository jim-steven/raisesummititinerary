// Clean Restaurant App - No Google Sheets Integration - Fixed Drag and Drop
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
    
    // Helper function to get restaurant ranking tag based on position in meal slot
    function getRankingTag(restaurantId, mealRestaurants) {
        const index = mealRestaurants.findIndex(id => id === restaurantId);
        if (index === -1) return '';
        if (index === 0) return 'Top';
        return `Option ${index + 1}`;
    }
    
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
            priceFirstClassUSD: 130.39,
            priceRegularEUR: 80.00,
            priceFirstClassEUR: 120.60,
            tag: "Latest"
        }
    ];

    // State management
    let selectedTrain = trainOptions.find(t => t.id === 2); // Default to 12:46 → 16:32 train
    let showEuroPrices = false;
    let selectedTrainClass = 'regular'; // 'regular' or 'firstClass'
    let selectedRestaurants = {
        '2025-07-08': { 
            lunch: [], // Summit lunch (not a restaurant)
            dinner: [] // Summer Soirée event (not a restaurant)
        },
        '2025-07-09': { 
            lunch: [], // Traveling/transit
            dinner: [4, 5, 7] // Savoyard & Hearty: Mama Lise, Le Chalet, Le Freti
        },
        '2025-07-10': { 
            lunch: [1, 8, 13], // Le Denti, Le Vertumne, Le Petit Thiou
            dinner: [2, 5, 7] // Elegant & Filling: Cozna, Le Chalet, Le Freti
        },
        '2025-07-11': { 
            lunch: [12, 8], // Le Verriere, Le Vertumne  
            dinner: [4, 5] // Hearty Regional: Mama Lise, Le Chalet
        },
        '2025-07-12': { 
            lunch: [1, 6], // Le Denti, Le Biboquet
            dinner: [11, 2] // Refined Finish: Saba, Cozna
        }
    };

    // Event listeners
    function initEventListeners() {
        // Currency toggle
        const currencyToggle = document.getElementById('currencyToggle');
        if (currencyToggle) {
            currencyToggle.addEventListener('change', function(e) {
                showEuroPrices = e.target.checked;
                renderTrainOptions();
            });
        }

        // Train selection and class toggle
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('select-train-btn')) {
                const trainId = parseInt(e.target.getAttribute('data-train-id'));
                selectTrain(trainId);
            }
            
            if (e.target.classList.contains('train-class-btn')) {
                const trainId = parseInt(e.target.getAttribute('data-train-id'));
                const currentClass = e.target.getAttribute('data-class');
                toggleTrainClass(trainId, e.target);
            }
            
            if (e.target.classList.contains('view-details-btn')) {
                const restaurantId = parseInt(e.target.getAttribute('data-id'));
                showRestaurantModal(restaurantId);
            }
        });
    }

    // Train functionality
    function renderTrainOptions() {
        console.log('Rendering train options...');
        const container = document.getElementById('trainOptionsContainer');
        if (!container) return;

        container.innerHTML = '';

        trainOptions.forEach(train => {
            // Default to regular class for pricing, but check if this train has been customized
            const price = showEuroPrices ? train.priceRegularEUR : train.priceRegularUSD;
            const currency = showEuroPrices ? '€' : '$';
            const totalPrice = (price * 2).toFixed(2);
            
            // Check if this train is selected
            const isSelected = selectedTrain && selectedTrain.id === train.id;
            const cardClass = isSelected ? 'border-primary bg-light' : '';
            const selectBtnClass = isSelected ? 'btn-success' : 'btn-primary';
            const selectBtnText = isSelected ? 'Selected' : 'Select';

            const trainCard = document.createElement('div');
            trainCard.className = 'col-md-4 mb-3 train-option';
            trainCard.innerHTML = `
                <div class="card train-card h-100 ${cardClass}" data-id="${train.id}">
                    <div class="card-body">
                        <h5 class="card-title">${train.departure} → ${train.arrival}</h5>
                        <div class="time-display mb-2">
                            <span class="time">${train.departureTime}</span>
                            <span class="arrow">→</span>
                            <span class="time">${train.arrivalTime}</span>
                        </div>
                        <p class="duration">Duration: ${train.duration}</p>
                        <div class="price-info mb-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <div class="price-label">Price (per person):</div>
                                    <div class="price">${currency}${price}</div>
                                </div>
                                <button class="btn btn-outline-secondary btn-sm train-class-btn" 
                                        data-train-id="${train.id}" 
                                        data-class="regular">Regular</button>
                            </div>
                            <p class="total-price">Total Price (2 people): ${currency}${totalPrice}</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <button class="btn ${selectBtnClass} select-train-btn" data-train-id="${train.id}">${selectBtnText}</button>
                            ${train.tag ? `<span class="badge bg-secondary">${train.tag}</span>` : ''}
                            <a href="https://www.google.com/travel" target="_blank" class="btn btn-outline-primary btn-sm">Book</a>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(trainCard);
        });
        
        console.log('Train options rendered');
    }

    function selectTrain(trainId) {
        selectedTrain = trainOptions.find(t => t.id === trainId);
        updateItinerary();
        renderTrainOptions(); // Re-render to show selection
    }

    function toggleTrainClass(trainId, buttonElement) {
        const currentClass = buttonElement.getAttribute('data-class');
        const newClass = currentClass === 'regular' ? 'firstClass' : 'regular';
        
        // Update the button
        buttonElement.setAttribute('data-class', newClass);
        buttonElement.textContent = newClass === 'regular' ? 'Regular' : 'First Class';
        
        // Update the pricing for this specific train card
        const trainCard = buttonElement.closest('.train-card');
        const train = trainOptions.find(t => t.id === trainId);
        
        if (train && trainCard) {
            const price = showEuroPrices ? 
                (newClass === 'regular' ? train.priceRegularEUR : train.priceFirstClassEUR) :
                (newClass === 'regular' ? train.priceRegularUSD : train.priceFirstClassUSD);
            const currency = showEuroPrices ? '€' : '$';
            const totalPrice = (price * 2).toFixed(2);
            
            // Update price display
            const priceElement = trainCard.querySelector('.price');
            const totalPriceElement = trainCard.querySelector('.total-price');
            
            if (priceElement) priceElement.textContent = `${currency}${price}`;
            if (totalPriceElement) totalPriceElement.textContent = `Total Price (2 people): ${currency}${totalPrice}`;
        }
    }

    // Restaurant functionality
    function renderRestaurantOptions() {
        console.log('Rendering restaurant options...');
        const container = document.getElementById('restaurantOptionsContainer');
        if (!container) return;

        const tbody = container.querySelector('tbody');
        if (!tbody) return;

        tbody.innerHTML = '';

        restaurantOptions.forEach((restaurant, index) => {
            const row = document.createElement('tr');
            row.className = 'restaurant-row';
            row.setAttribute('data-id', restaurant.id);
            row.style.cursor = 'grab';
            
            row.innerHTML = `
                <td class="text-center"><strong>${index + 1}</strong></td>
                <td>
                    <div class="d-flex align-items-center">
                        <span class="drag-handle me-2">☰</span>
                        ${restaurant.tripadvisor ? 
                            `<strong><a href="${restaurant.tripadvisor}" target="_blank" class="restaurant-name text-decoration-none" style="cursor: pointer;">${restaurant.name}</a></strong>` : 
                            `<strong class="restaurant-name" data-bs-toggle="modal" data-bs-target="#restaurantModal" style="cursor: pointer;">${restaurant.name}</strong>`}
                    </div>
                </td>
                <td>${restaurant.cuisine}</td>
                <td>${restaurant.priceRange}</td>
                <td>
                    ${restaurant.distance}${restaurant.travelTime ? ` <a href="${restaurant.directions || `https://maps.google.com/maps?daddr=${encodeURIComponent(restaurant.name + ', Annecy, France')}`}" target="_blank" class="text-decoration-none">[${restaurant.travelTime}]</a>` : ''}
                </td>
                <td>
                    ${restaurant.reservation ? `<a href="${restaurant.reservation}" target="_blank" class="btn btn-sm btn-outline-primary me-1">Book</a>` : ''}
                    ${restaurant.phone ? `<a href="tel:${restaurant.phone}" class="btn btn-sm btn-outline-secondary me-1">📞</a>` : ''}
                    <button class="btn btn-sm btn-outline-info view-details-btn" data-id="${restaurant.id}">View Details</button>
                </td>
            `;
            
            tbody.appendChild(row);
        });
        
        console.log('Restaurant options rendered with', restaurantOptions.length, 'restaurants');
    }

    function showRestaurantModal(restaurantId) {
        const restaurant = restaurantOptions.find(r => r.id === restaurantId);
        if (!restaurant) return;

        const modal = document.getElementById('restaurantModal');
        if (!modal) return;

        const modalTitle = modal.querySelector('#restaurantModalLabel');
        const modalBody = modal.querySelector('.modal-body');

        modalTitle.innerHTML = restaurant.tripadvisor ? 
            `<a href="${restaurant.tripadvisor}" target="_blank" class="text-decoration-none">${restaurant.name}</a>` : 
            restaurant.name;
        
        // Build images carousel
        let carouselHTML = '';
        if (restaurant.images && restaurant.images.length > 0) {
            carouselHTML = `
                <div id="restaurantCarousel" class="carousel slide mb-3" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${restaurant.images.map((img, index) => `
                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img src="${img}" class="d-block w-100" alt="${restaurant.name}" style="height: 200px; object-fit: cover;">
                            </div>
                        `).join('')}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#restaurantCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#restaurantCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </button>
                </div>
            `;
        }

        modalBody.innerHTML = `
            ${carouselHTML}
            <div class="row">
                <div class="col-md-6">
                    <h6>Cuisine</h6>
                    <p>${restaurant.cuisine}</p>
                    
                    <h6>Price Range</h6>
                    <p>${restaurant.priceRange}</p>
                    
                    <h6>Distance from Hotel</h6>
                    <p>${restaurant.distance}</p>
                </div>
                <div class="col-md-6">
                    <h6>Vibe/Setting</h6>
                    <p>${restaurant.vibe || 'Not specified'}</p>
                    
                    <h6>Notable Dishes</h6>
                    <p>${restaurant.notableDishes || 'Not specified'}</p>
                    
                    <h6>Notes</h6>
                    <p>${restaurant.notes || 'No additional notes'}</p>
                </div>
            </div>
            <div class="mt-3">
                ${restaurant.reservation ? 
                    `<a href="${restaurant.reservation}" target="_blank" class="btn btn-primary me-2">Book Online</a>` : ''}
                ${restaurant.phone ? 
                    `<a href="tel:${restaurant.phone}" class="btn btn-outline-secondary me-2">📞 Call ${restaurant.phone}</a>` : ''}
                ${!restaurant.reservation && !restaurant.phone ? 
                    '<p class="text-muted">No reservations needed</p>' : ''}
                ${restaurant.directions || restaurant.travelTime ? 
                    `<a href="${restaurant.directions || `https://maps.google.com/maps?daddr=${encodeURIComponent(restaurant.name + ', Annecy, France')}`}" target="_blank" class="btn btn-outline-info">Get Directions${restaurant.travelTime ? ` (${restaurant.travelTime})` : ''}</a>` : 
                    ''}
            </div>
        `;

        // Show modal
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    }

    // Itinerary functionality
    function updateItinerary() {
        console.log('Updating itinerary...');
        
        const container = document.getElementById('itineraryContainer');
        if (!container) return;

        const trainInfo = container.querySelector('.train-info');
        const tbody = container.querySelector('#itineraryTable tbody');
        
        if (!tbody) return;

        // Update train info
        if (trainInfo) {
            trainInfo.textContent = selectedTrain 
                ? `Selected Train: ${selectedTrain.departure} → ${selectedTrain.arrival} (${selectedTrain.departureTime} - ${selectedTrain.arrivalTime})`
                : 'No train selected yet';
        }

        // Update meal schedule
        tbody.innerHTML = '';

        const dates = [
            { date: '2025-07-08', day: 'Monday', label: 'Jul 8, 2025' },
            { date: '2025-07-09', day: 'Tuesday', label: 'Jul 9, 2025' },
            { date: '2025-07-10', day: 'Wednesday', label: 'Jul 10, 2025' },
            { date: '2025-07-11', day: 'Thursday', label: 'Jul 11, 2025' },
            { date: '2025-07-12', day: 'Friday', label: 'Jul 12, 2025' }
        ];

        dates.forEach(day => {
            const row = document.createElement('tr');
            
            // Date cell
            const dateCell = document.createElement('td');
            dateCell.innerHTML = `<strong>${day.day}</strong><br>${day.label}`;
            row.appendChild(dateCell);

            // Get selected restaurants for this date
            const lunchItems = selectedRestaurants[day.date].lunch || [];
            const dinnerItems = selectedRestaurants[day.date].dinner || [];
            
            // Lunch cell
            const lunchCell = document.createElement('td');
            lunchCell.setAttribute('data-date', day.date);
            lunchCell.setAttribute('data-meal-type', 'lunch');
            lunchCell.className = 'meal-cell lunch-cell';
            
            // Special handling for specific dates
            if (day.date === '2025-07-08') {
                // Monday 7/8 - Summit lunch
                lunchCell.innerHTML = `<div class="meal-event alert alert-info">Lunch at Summit</div>`;
            } else if (day.date === '2025-07-09' && lunchItems.length === 0) {
                // Tuesday 7/9 - Travel day lunch
                lunchCell.innerHTML = `<div class="meal-event alert alert-warning">Might be traveling or still in transit</div>`;
            } else if (lunchItems.length > 0) {
                lunchItems.forEach(restaurantId => {
                    const lunch = restaurantOptions.find(r => r.id === restaurantId);
                    if (lunch) {
                        const restaurantElement = document.createElement('div');
                        restaurantElement.className = 'draggable-item';
                        restaurantElement.setAttribute('data-id', lunch.id);
                        restaurantElement.setAttribute('data-date', day.date);
                        restaurantElement.setAttribute('data-meal-type', 'lunch');
                        
                        const rankingTag = getRankingTag(lunch.id, lunchItems);
                        restaurantElement.innerHTML = `
                            <div class="d-flex justify-content-between align-items-center p-2 mb-2 border rounded">
                                <span class="drag-handle">☰</span>
                                <div class="d-flex align-items-center flex-grow-1">
                                    <div>
                                        <strong>${lunch.name}</strong>
                                        ${rankingTag ? `<span class="badge bg-primary ms-2">${rankingTag}</span>` : ''}
                                    </div>
                                    <div class="ms-auto">
                                        ${lunch.reservation ? `<a href="${lunch.reservation}" target="_blank" class="btn btn-xs btn-outline-primary me-1">Book</a>` : ''}
                                        ${lunch.phone ? `<a href="tel:${lunch.phone}" class="btn btn-xs btn-outline-secondary me-1">📞</a>` : ''}
                                    </div>
                                </div>
                                <button class="btn btn-sm btn-outline-danger remove-btn">×</button>
                            </div>
                        `;
                        
                        lunchCell.appendChild(restaurantElement);
                    }
                });
            } else {
                lunchCell.innerHTML = `<div class="meal-placeholder">Drop lunch options here</div>`;
            }
            row.appendChild(lunchCell);
            
            // Dinner cell
            const dinnerCell = document.createElement('td');
            dinnerCell.setAttribute('data-date', day.date);
            dinnerCell.setAttribute('data-meal-type', 'dinner');
            dinnerCell.className = 'meal-cell dinner-cell';
            
            // Special handling for Monday dinner
            if (day.date === '2025-07-08' && dinnerItems.length === 0) {
                // Monday 7/8 - Summer Soirée event
                dinnerCell.innerHTML = `<div class="meal-event alert alert-info">Summer Soirée – Hosted by Sequoia & Drysdale</div>`;
            } else if (dinnerItems.length > 0) {
                dinnerItems.forEach(restaurantId => {
                    const dinner = restaurantOptions.find(r => r.id === restaurantId);
                    if (dinner) {
                        const restaurantElement = document.createElement('div');
                        restaurantElement.className = 'draggable-item';
                        restaurantElement.setAttribute('data-id', dinner.id);
                        restaurantElement.setAttribute('data-date', day.date);
                        restaurantElement.setAttribute('data-meal-type', 'dinner');
                        
                        const rankingTag = getRankingTag(dinner.id, dinnerItems);
                        restaurantElement.innerHTML = `
                            <div class="d-flex justify-content-between align-items-center p-2 mb-2 border rounded">
                                <span class="drag-handle">☰</span>
                                <div class="d-flex align-items-center flex-grow-1">
                                    <div>
                                        <strong>${dinner.name}</strong>
                                        ${rankingTag ? `<span class="badge bg-primary ms-2">${rankingTag}</span>` : ''}
                                    </div>
                                    <div class="ms-auto">
                                        ${dinner.reservation ? `<a href="${dinner.reservation}" target="_blank" class="btn btn-xs btn-outline-primary me-1">Book</a>` : ''}
                                        ${dinner.phone ? `<a href="tel:${dinner.phone}" class="btn btn-xs btn-outline-secondary me-1">📞</a>` : ''}
                                    </div>
                                </div>
                                <button class="btn btn-sm btn-outline-danger remove-btn">×</button>
                            </div>
                        `;
                        
                        dinnerCell.appendChild(restaurantElement);
                    }
                });
            } else {
                dinnerCell.innerHTML = `<div class="meal-placeholder">Drop dinner options here</div>`;
            }
            row.appendChild(dinnerCell);
            
            tbody.appendChild(row);
        });

        // Add remove button functionality
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const item = e.target.closest('.draggable-item');
                const restaurantId = parseInt(item.getAttribute('data-id'));
                const date = item.getAttribute('data-date');
                const mealType = item.getAttribute('data-meal-type');
                
                // Remove from selectedRestaurants
                const index = selectedRestaurants[date][mealType].indexOf(restaurantId);
                if (index > -1) {
                    selectedRestaurants[date][mealType].splice(index, 1);
                }
                
                // Update UI
                updateItinerary();
            });
        });
        
        // Re-initialize drag and drop after DOM update
        setTimeout(() => {
            initDragAndDrop();
        }, 50);
    }

    // Drag and Drop functionality
    function initDragAndDrop() {
        console.log('Setting up drag and drop...');
        
        // Check if meal cells exist
        const mealCells = document.querySelectorAll('.meal-cell');
        console.log(`Found ${mealCells.length} meal cells`);
        
        // Make table cells sortable for drag and drop
        mealCells.forEach((cell, index) => {
            console.log(`Setting up Sortable for meal cell ${index}:`, {
                date: cell.getAttribute('data-date'),
                mealType: cell.getAttribute('data-meal-type')
            });
            
            new Sortable(cell, {
                animation: 150,
                group: 'restaurants',
                filter: '.meal-placeholder',
                ghostClass: 'sortable-ghost',
                chosenClass: 'sortable-chosen',
                dragClass: 'sortable-drag',
                onAdd: function(evt) {
                    const item = evt.item;
                    const targetCell = evt.to;
                    const date = targetCell.getAttribute('data-date');
                    const mealType = targetCell.getAttribute('data-meal-type');
                    const restaurantId = parseInt(item.getAttribute('data-id'));
                    
                    console.log(`Adding restaurant ${restaurantId} to ${mealType} on ${date}`);
                    
                    // Add to selectedRestaurants array if not already there
                    if (!selectedRestaurants[date][mealType].includes(restaurantId)) {
                        selectedRestaurants[date][mealType].push(restaurantId);
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
        if (restaurantContainer) {
            console.log('Setting up Sortable for restaurant container');
            new Sortable(restaurantContainer, {
                animation: 150,
                group: {
                    name: 'restaurants',
                    pull: 'clone',
                    put: false
                },
                sort: false,
                ghostClass: 'sortable-ghost',
                chosenClass: 'sortable-chosen',
                dragClass: 'sortable-drag',
                onStart: function(evt) {
                    console.log('Drag started for restaurant:', evt.item.getAttribute('data-id'));
                },
                onClone: function(evt) {
                    console.log('Cloning restaurant for drag');
                },
                onEnd: function(evt) {
                    console.log('Drag ended, checking target...');
                    
                    // Check if dropped on a meal cell
                    if (evt.to && evt.to.classList && evt.to.classList.contains('meal-cell')) {
                        const restaurantId = parseInt(evt.item.getAttribute('data-id'));
                        const targetDate = evt.to.getAttribute('data-date');
                        const targetMealType = evt.to.getAttribute('data-meal-type');
                        
                        console.log(`Dropped restaurant ${restaurantId} to ${targetMealType} on ${targetDate}`);
                        
                        // Add to selectedRestaurants array if not already there
                        if (!selectedRestaurants[targetDate][targetMealType].includes(restaurantId)) {
                            selectedRestaurants[targetDate][targetMealType].push(restaurantId);
                        }
                        
                        // Remove placeholder from target cell
                        const placeholder = evt.to.querySelector('.meal-placeholder');
                        if (placeholder) {
                            placeholder.remove();
                        }
                        
                        // Update the UI
                        updateItinerary();
                    }
                    
                    // Clean up any cloned items that didn't make it to a meal cell
                    if (evt.item && evt.to === restaurantContainer) {
                        // Item was dropped back on the restaurant table - this is ok
                    } else if (evt.item && !evt.to.classList.contains('meal-cell')) {
                        // Item was dropped somewhere else - remove it
                        evt.item.remove();
                    }
                }
            });
        } else {
            console.error('Restaurant container not found');
        }
        
        console.log('Drag and drop setup complete');
    }

    // Initialize the app
    try {
        console.log('Rendering train options...');
        renderTrainOptions();
        
        console.log('Rendering restaurant options...');
        renderRestaurantOptions();
        
        console.log('Updating itinerary...');
        updateItinerary();
        
        console.log('Initializing event listeners...');
        initEventListeners();
        
        console.log('Clean restaurant app initialized successfully!');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});
