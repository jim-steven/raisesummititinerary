// Fixed HTML5 drag and drop implementation with proper Google Sheets integration
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing fixed HTML5 drag and drop...');
    
    setTimeout(function() {
        try {
            // Global variable to track selected restaurants
            window.selectedRestaurants = window.selectedRestaurants || {
                "2025-07-08": { lunch: [], dinner: [] },
                "2025-07-09": { lunch: [], dinner: [] },
                "2025-07-10": { lunch: [], dinner: [] },
                "2025-07-11": { lunch: [], dinner: [] },
                "2025-07-12": { lunch: [], dinner: [] }
            };
            
            // 1. Make restaurant rows draggable
            document.querySelectorAll('.restaurant-item').forEach(row => {
                row.setAttribute('draggable', 'true');
                
                // Add drag start event
                row.addEventListener('dragstart', function(e) {
                    const restaurantId = parseInt(row.getAttribute('data-id'));
                    const restaurantName = row.querySelector('strong').textContent;
                    const suitable = row.getAttribute('data-suitable');
                    
                    // Store the data for the drag operation
                    e.dataTransfer.setData('text/plain', JSON.stringify({
                        id: restaurantId,
                        name: restaurantName,
                        suitable: suitable
                    }));
                    e.dataTransfer.effectAllowed = 'copy';
                    
                    // Visual feedback
                    row.classList.add('dragging');
                    console.log('Started dragging restaurant:', restaurantName);
                });
                
                row.addEventListener('dragend', function() {
                    row.classList.remove('dragging');
                });
            });
            
            // 2. Make meal cells drop targets
            document.querySelectorAll('.meal-cell').forEach(cell => {
                const cellDate = cell.getAttribute('data-date');
                const cellMealType = cell.getAttribute('data-meal-type');
                
                // Handle dragover event
                cell.addEventListener('dragover', function(e) {
                    e.preventDefault(); // Allow drop
                    e.dataTransfer.dropEffect = 'copy';
                    cell.classList.add('drag-over');
                });
                
                // Handle dragleave event
                cell.addEventListener('dragleave', function() {
                    cell.classList.remove('drag-over');
                });
                
                // Handle drop event
                cell.addEventListener('drop', function(e) {
                    e.preventDefault();
                    cell.classList.remove('drag-over');
                    
                    try {
                        // Get the dropped data
                        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                        const restaurantId = parseInt(data.id);
                        const restaurantName = data.name;
                        
                        console.log('Dropped data:', data);
                        
                        // Remove placeholder if it exists
                        const placeholder = cell.querySelector('.meal-placeholder');
                        if (placeholder) {
                            placeholder.remove();
                        }
                        
                        // Check if we already have this restaurant in this cell
                        if (window.selectedRestaurants[cellDate][cellMealType].includes(restaurantId)) {
                            console.log('Restaurant already in this cell');
                            return; // Don't add duplicates
                        }
                        
                        // Update the global selectedRestaurants object
                        window.selectedRestaurants[cellDate][cellMealType].push(restaurantId);
                        
                        // Refresh the entire cell content based on the current state
                        updateCellDisplay(cell, cellDate, cellMealType);
                        
                        console.log('Dropped restaurant:', {
                            name: restaurantName,
                            id: restaurantId,
                            date: cellDate,
                            mealType: cellMealType
                        });
                    } catch (error) {
                        console.error('Error handling drop:', error);
                    }
                });
            });
            
            // Function to update the display of a meal cell
            function updateCellDisplay(cell, date, mealType) {
                // Clear the cell
                cell.innerHTML = '';
                
                // Get the restaurant IDs for this cell
                const restaurantIds = window.selectedRestaurants[date][mealType];
                
                if (restaurantIds.length === 0) {
                    // If no restaurants, show placeholder
                    cell.innerHTML = `<div class="meal-placeholder" data-date="${date}" data-meal-type="${mealType}">Drop ${mealType} options here</div>`;
                    return;
                }
                
                // Add each restaurant to the cell with proper numbering
                restaurantIds.forEach((restaurantId, index) => {
                    // Try to find the restaurant data from the app
                    const restaurantData = window.restaurantData || [];
                    let restaurantName = 'Restaurant';
                    
                    // Look for the restaurant name in the data
                    const restaurant = restaurantData.find(r => r.id === restaurantId);
                    if (restaurant) {
                        restaurantName = restaurant.name;
                    } else {
                        // Try to get it from the DOM if data is not available
                        const row = document.querySelector(`.restaurant-item[data-id="${restaurantId}"]`);
                        if (row) {
                            const nameEl = row.querySelector('strong');
                            if (nameEl) restaurantName = nameEl.textContent;
                        }
                    }
                    
                    // Create position text and class
                    const positionText = index === 0 ? 'Top Choice' : `Option ${index + 1}`;
                    const positionClass = index === 0 ? 'top-choice' : '';
                    
                    // Create the restaurant element
                    const restaurantElement = document.createElement('div');
                    restaurantElement.className = 'draggable-item';
                    restaurantElement.setAttribute('data-id', restaurantId);
                    restaurantElement.innerHTML = `
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="drag-handle">u2630</span>
                            <div class="d-flex align-items-center justify-content-between" style="width: 65%;">
                                <strong style="margin-right: 20px;">${restaurantName}</strong>
                                <span class="position-badge ${positionClass}" style="margin: 0 15px;">${positionText}</span>
                            </div>
                            <button class="btn btn-sm btn-outline-danger remove-btn">u00d7</button>
                        </div>
                    `;
                    
                    cell.appendChild(restaurantElement);
                    
                    // Add event listener for remove button
                    const removeBtn = restaurantElement.querySelector('.remove-btn');
                    if (removeBtn) {
                        removeBtn.addEventListener('click', function() {
                            // Remove from tracking object
                            const index = window.selectedRestaurants[date][mealType].indexOf(restaurantId);
                            if (index > -1) {
                                window.selectedRestaurants[date][mealType].splice(index, 1);
                            }
                            
                            // Update the display
                            updateCellDisplay(cell, date, mealType);
                        });
                    }
                });
            }
            
            // 3. Add CSS for drag and drop
            const style = document.createElement('style');
            style.textContent = `
                .dragging {
                    opacity: 0.5;
                }
                .drag-over {
                    background-color: rgba(76, 175, 80, 0.1);
                    border: 2px dashed #4CAF50;
                }
            `;
            document.head.appendChild(style);
            
            // 4. Add global method to update the itinerary display
            // Preserve the original updateItinerary function
            const originalUpdateItinerary = window.updateItinerary;
            
            window.updateItinerary = function() {
                // Call the original function if it exists
                if (typeof originalUpdateItinerary === 'function') {
                    originalUpdateItinerary();
                }
                
                // Update our train display manually if needed
                const trainDisplay = document.getElementById('selectedTrainDisplay');
                const selectedTrain = window.selectedTrain;
                
                if (trainDisplay && selectedTrain) {
                    // Format the display with the train information
                    const currencyDisplay = window.currencyDisplay || 'USD';
                    const currencySymbol = currencyDisplay === 'USD' ? '$' : '€';
                    const regularPrice = currencyDisplay === 'USD' ? selectedTrain.priceRegularUSD : selectedTrain.priceRegularEUR;
                    
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
                                    </div>
                                    <p class="mb-0">Total Price (2 people): ${currencySymbol}${(regularPrice * 2).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
            };
            
            // 5. Fix the Save Itinerary button to save to Google Sheets
            const saveButton = document.getElementById('saveItineraryBtn');
            if (saveButton) {
                // Clone the button to remove any existing event listeners
                const newSaveButton = saveButton.cloneNode(true);
                saveButton.parentNode.replaceChild(newSaveButton, saveButton);
                
                // Add our event handler
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
                            totalPriceUSD: 218.48,
                            priceRegularEUR: 99.25,
                            priceFirstClassEUR: 120.60,
                            totalPriceEUR: 202.10
                        },
                        restaurants: window.selectedRestaurants,
                        lastUpdated: new Date().toISOString()
                    };
                    
                    console.log('Saving itinerary data to Google Sheets:', JSON.stringify(itineraryData, null, 2));
                    
                    // Save to Google Sheets - use a different approach for local testing
                    const API_URL = window.dataFunctions?.API_URL || 
                        'https://script.google.com/macros/s/AKfycbxUTSzyMC7OBiAznFbcOpXzbmvwB6_cjId-a4Nvve5PEI2b-TerwWnjXNNdXB5EDlIt/exec';
                    
                    // Use the sendSampleData function if available (it's designed to work with CORS)
                    if (typeof sendSampleData === 'function') {
                        // We'll use the sendSampleData function but with our custom data
                        console.log('Using sendSampleData to avoid CORS issues');
                        const originalSendSampleData = sendSampleData;
                        window.sendSampleData = function() {
                            console.log('Sending custom itinerary data...');
                            
                            const GOOGLE_SHEETS_API_URL = API_URL;
                            
                            fetch(GOOGLE_SHEETS_API_URL, {
                                method: 'POST',
                                body: JSON.stringify({
                                    action: 'save',
                                    data: itineraryData
                                }),
                                headers: {'Content-Type': 'application/json'}
                            })
                            .then(response => {
                                console.log('Response status:', response.status);
                                return response.json();
                            })
                            .then(result => {
                                console.log('Success:', result);
                                alert('Itinerary saved successfully to Google Sheets!');
                                // Restore original function
                                window.sendSampleData = originalSendSampleData;
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                alert('Error saving itinerary to Google Sheets: ' + error.message);
                                // Restore original function
                                window.sendSampleData = originalSendSampleData;
                            });
                            
                            return "Saving custom itinerary data to Google Sheets...";
                        };
                        
                        // Call the function
                        window.sendSampleData();
                    } else {
                        // Try the direct approach
                        try {
                            // For local testing with CORS issues, create a form and submit it
                            const form = document.createElement('form');
                            form.method = 'POST';
                            form.action = API_URL;
                            form.target = '_blank';
                            
                            const hiddenField = document.createElement('input');
                            hiddenField.type = 'hidden';
                            hiddenField.name = 'data';
                            hiddenField.value = JSON.stringify({
                                action: 'save',
                                data: itineraryData
                            });
                            
                            form.appendChild(hiddenField);
                            document.body.appendChild(form);
                            form.submit();
                            document.body.removeChild(form);
                            
                            alert('Itinerary data submitted to Google Sheets!');
                        } catch (error) {
                            console.error('Error saving to Google Sheets:', error);
                            alert('Error saving to Google Sheets: ' + error.message + '\n\nPlease try the Save Sample Data function from the browser console.');
                        }
                    }
                });
            }
            
            // Helper functions for formatting
            function formatDate(dateString) {
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                return new Date(dateString).toLocaleDateString(undefined, options);
            }
            
            function convertTo12Hour(time24h) {
                if (!time24h) return '';
                const [hours, minutes] = time24h.split(':');
                const hour = parseInt(hours, 10);
                const suffix = hour >= 12 ? 'PM' : 'AM';
                const hour12 = hour % 12 || 12;
                return `${hour12}:${minutes} ${suffix}`;
            }
            
            console.log('Fixed HTML5 drag and drop initialized with Google Sheets integration');
        } catch (error) {
            console.error('Error setting up drag and drop:', error);
        }
    }, 1000);
});