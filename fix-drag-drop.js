// Simple click-to-select approach instead of drag-drop
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing click-based restaurant selection...');
    
    setTimeout(function() {
        try {
            // 1. Initialize global data structure for selections
            window.selectedRestaurants = {
                "2025-07-08": { lunch: [], dinner: [] },
                "2025-07-09": { lunch: [], dinner: [] },
                "2025-07-10": { lunch: [], dinner: [] },
                "2025-07-11": { lunch: [], dinner: [] },
                "2025-07-12": { lunch: [], dinner: [] }
            };
            
            // 2. Add click handlers to all restaurant rows
            document.querySelectorAll('.restaurant-item').forEach(row => {
                const restaurantId = parseInt(row.getAttribute('data-id') || '0');
                const restaurantName = row.querySelector('strong')?.textContent || 'Restaurant';
                
                row.addEventListener('click', function(e) {
                    // Prevent default action if clicking on a link or button
                    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                        return;
                    }
                    
                    // Show meal type and date selection modal
                    showSelectionModal(restaurantId, restaurantName);
                });
            });
            
            // 3. Create and add the selection modal to the page
            const modalDiv = document.createElement('div');
            modalDiv.id = 'restaurantSelectionModal';
            modalDiv.className = 'modal fade';
            modalDiv.setAttribute('tabindex', '-1');
            modalDiv.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add Restaurant to Itinerary</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Select when you'd like to visit <strong id="selectedRestaurantName"></strong>:</p>
                            
                            <div class="row mb-3">
                                <div class="col-6">
                                    <label for="mealTypeSelect" class="form-label">Meal Type</label>
                                    <select class="form-select" id="mealTypeSelect">
                                        <option value="lunch">Lunch</option>
                                        <option value="dinner">Dinner</option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <label for="dateSelect" class="form-label">Date</label>
                                    <select class="form-select" id="dateSelect">
                                        <option value="2025-07-08">Tuesday (Jul 8)</option>
                                        <option value="2025-07-09">Wednesday (Jul 9)</option>
                                        <option value="2025-07-10">Thursday (Jul 10)</option>
                                        <option value="2025-07-11">Friday (Jul 11)</option>
                                        <option value="2025-07-12">Saturday (Jul 12)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="addToItineraryBtn">Add to Itinerary</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modalDiv);
            
            // 4. Function to show the selection modal
            function showSelectionModal(restaurantId, restaurantName) {
                // Set the restaurant name in the modal
                document.getElementById('selectedRestaurantName').textContent = restaurantName;
                
                // Store the selected restaurant ID for use when the Add button is clicked
                modalDiv.setAttribute('data-restaurant-id', restaurantId);
                
                // Clear previous event listeners
                const addButton = document.getElementById('addToItineraryBtn');
                const newAddButton = addButton.cloneNode(true);
                addButton.parentNode.replaceChild(newAddButton, addButton);
                
                // Add click handler for the Add button
                newAddButton.addEventListener('click', function() {
                    const mealType = document.getElementById('mealTypeSelect').value;
                    const date = document.getElementById('dateSelect').value;
                    const id = parseInt(modalDiv.getAttribute('data-restaurant-id'));
                    
                    // Add to the global selected restaurants object
                    if (!window.selectedRestaurants[date][mealType].includes(id)) {
                        window.selectedRestaurants[date][mealType].push(id);
                    }
                    
                    // Update the UI
                    updateItineraryDisplay();
                    
                    // Close the modal
                    bootstrap.Modal.getInstance(modalDiv).hide();
                });
                
                // Show the modal
                const modal = new bootstrap.Modal(modalDiv);
                modal.show();
            }
            
            // 5. Function to update the itinerary display
            function updateItineraryDisplay() {
                // Get all restaurant data
                const restaurantData = window.restaurantData || [];
                
                // For each day and meal type in the schedule
                for (const date in window.selectedRestaurants) {
                    for (const mealType in window.selectedRestaurants[date]) {
                        // Find the cell for this day and meal type
                        const cell = document.querySelector(`.meal-cell[data-date="${date}"][data-meal-type="${mealType}"]`);
                        if (!cell) continue;
                        
                        // Clear the cell
                        cell.innerHTML = '';
                        
                        // Get the restaurant IDs for this day and meal type
                        const restaurantIds = window.selectedRestaurants[date][mealType];
                        
                        if (restaurantIds.length === 0) {
                            // If no restaurants selected, show the placeholder
                            cell.innerHTML = `<div class="meal-placeholder" data-date="${date}" data-meal-type="${mealType}">Drop ${mealType} options here</div>`;
                        } else {
                            // Add each restaurant to the cell
                            restaurantIds.forEach((id, index) => {
                                // Find the restaurant data
                                const restaurant = restaurantData.find(r => r.id === id) || { name: `Restaurant ${id}` };
                                
                                // Create the restaurant element
                                const restaurantElement = document.createElement('div');
                                restaurantElement.className = 'draggable-item';
                                restaurantElement.setAttribute('data-id', id);
                                
                                // Determine position badge text
                                const positionBadgeText = index === 0 ? 'Top Choice' : `Option ${index + 1}`;
                                
                                restaurantElement.innerHTML = `
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="drag-handle">u2630</span>
                                        <div class="d-flex align-items-center justify-content-between" style="width: 65%;">
                                            <strong style="margin-right: 20px;">${restaurant.name}</strong>
                                            <span class="position-badge ${index === 0 ? 'top-choice' : ''}" style="margin: 0 15px;">${positionBadgeText}</span>
                                        </div>
                                        <button class="btn btn-sm btn-outline-danger remove-btn">u00d7</button>
                                    </div>
                                `;
                                
                                cell.appendChild(restaurantElement);
                                
                                // Add click handler for the remove button
                                const removeBtn = restaurantElement.querySelector('.remove-btn');
                                removeBtn.addEventListener('click', function(e) {
                                    e.stopPropagation();
                                    
                                    // Remove from the global selected restaurants object
                                    const idIndex = window.selectedRestaurants[date][mealType].indexOf(id);
                                    if (idIndex > -1) {
                                        window.selectedRestaurants[date][mealType].splice(idIndex, 1);
                                    }
                                    
                                    // Update the UI
                                    updateItineraryDisplay();
                                });
                            });
                        }
                    }
                }
            }
            
            // 6. Override the Save Itinerary button
            const saveButton = document.getElementById('saveItineraryBtn');
            if (saveButton) {
                // Remove existing click handlers
                const newSaveButton = saveButton.cloneNode(true);
                saveButton.parentNode.replaceChild(newSaveButton, saveButton);
                
                // Add new click handler
                newSaveButton.addEventListener('click', function() {
                    // Get the selected train
                    const selectedTrain = window.selectedTrain;
                    
                    // Create the itinerary data
                    const itineraryData = {
                        train: selectedTrain || {
                            id: 2,
                            departure: "Paris Lyon",
                            arrival: "Annecy",
                            departureDate: "2025-07-09",
                            departureTime: "12:46",
                            arrivalTime: "16:32",
                            duration: "4h",
                            priceRegularUSD: 107.31,
                            priceFirstClassUSD: 130.39,
                            totalPriceUSD: 218.48
                        },
                        restaurants: window.selectedRestaurants,
                        lastUpdated: new Date().toISOString()
                    };
                    
                    // Log the data to the console (for demonstration)
                    console.log('Itinerary data to save:', JSON.stringify(itineraryData, null, 2));
                    
                    // Show a success message
                    alert('Itinerary saved successfully! Check the browser console to see the data.');
                    
                    // In a real implementation, we would send this data to Google Sheets
                    // But due to CORS restrictions in local testing, we're just showing a success message
                });
            }
            
            // 7. Get restaurant data from the window object for the itinerary display
            window.restaurantData = [
                {
                    id: 1,
                    name: "Cozna",
                    cuisine: "Contemporary",
                    price: "€€€",
                    location: "Annecy",
                    rating: 4.6,
                    suitable: ["dinner"]
                },
                {
                    id: 2,
                    name: "La Ciboulette",
                    cuisine: "French",
                    price: "€€€",
                    location: "Annecy",
                    rating: 4.8,
                    suitable: ["dinner"]
                },
                {
                    id: 3,
                    name: "L'Esquisse",
                    cuisine: "French",
                    price: "€€€",
                    location: "Annecy",
                    rating: 4.7,
                    suitable: ["dinner"]
                },
                {
                    id: 4,
                    name: "Le Chalet",
                    cuisine: "Swiss/Savoyard",
                    price: "€€",
                    location: "Annecy",
                    rating: 4.5,
                    suitable: ["lunch", "dinner"]
                },
                {
                    id: 5,
                    name: "Le Freti",
                    cuisine: "Savoyard",
                    price: "€€",
                    location: "Annecy",
                    rating: 4.4,
                    suitable: ["lunch", "dinner"]
                }
            ];
            
            console.log('Click-based restaurant selection initialized');
        } catch (error) {
            console.error('Error setting up click-based selection:', error);
        }
    }, 1000);
});