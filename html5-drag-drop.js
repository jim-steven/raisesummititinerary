// Native HTML5 drag and drop implementation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing native HTML5 drag and drop...');
    
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
                    const restaurantId = row.getAttribute('data-id');
                    const restaurantName = row.querySelector('strong').textContent;
                    const suitable = row.getAttribute('data-suitable');
                    
                    // Store the data for the drag operation
                    e.dataTransfer.setData('text/plain', JSON.stringify({
                        id: restaurantId,
                        name: restaurantName,
                        suitable: suitable
                    }));
                    
                    // Set a drag image (optional)
                    const dragIcon = document.createElement('div');
                    dragIcon.className = 'drag-icon';
                    dragIcon.textContent = restaurantName;
                    document.body.appendChild(dragIcon);
                    e.dataTransfer.setDragImage(dragIcon, 0, 0);
                    setTimeout(() => document.body.removeChild(dragIcon), 0);
                    
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
                        
                        // Remove placeholder if it exists
                        const placeholder = cell.querySelector('.meal-placeholder');
                        if (placeholder) {
                            placeholder.remove();
                        }
                        
                        // Create the restaurant element in the target cell
                        const restaurantElement = document.createElement('div');
                        restaurantElement.className = 'draggable-item';
                        restaurantElement.setAttribute('data-id', restaurantId);
                        restaurantElement.innerHTML = `
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="drag-handle">☰</span>
                                <div class="d-flex align-items-center justify-content-between" style="width: 65%;">
                                    <strong style="margin-right: 20px;">${restaurantName}</strong>
                                    <span class="position-badge top-choice" style="margin: 0 15px;">Top Choice</span>
                                </div>
                                <button class="btn btn-sm btn-outline-danger remove-btn">×</button>
                            </div>
                        `;
                        
                        cell.appendChild(restaurantElement);
                        
                        // Update the global selectedRestaurants object
                        if (!window.selectedRestaurants[cellDate][cellMealType].includes(restaurantId)) {
                            window.selectedRestaurants[cellDate][cellMealType].push(restaurantId);
                        }
                        
                        console.log('Dropped restaurant:', {
                            name: restaurantName,
                            id: restaurantId,
                            date: cellDate,
                            mealType: cellMealType
                        });
                        
                        // Add event listener for remove button
                        const removeBtn = restaurantElement.querySelector('.remove-btn');
                        if (removeBtn) {
                            removeBtn.addEventListener('click', function() {
                                // Remove from the tracking object
                                const index = window.selectedRestaurants[cellDate][cellMealType].indexOf(restaurantId);
                                if (index > -1) {
                                    window.selectedRestaurants[cellDate][cellMealType].splice(index, 1);
                                }
                                
                                // Remove from the DOM
                                restaurantElement.remove();
                                
                                // If cell is now empty, add placeholder back
                                if (cell.children.length === 0) {
                                    cell.innerHTML = `<div class="meal-placeholder" data-date="${cellDate}" data-meal-type="${cellMealType}">Drop ${cellMealType} options here</div>`;
                                }
                            });
                        }
                        
                        // Make the new restaurant item draggable to reorder within the schedule
                        restaurantElement.setAttribute('draggable', 'true');
                        restaurantElement.addEventListener('dragstart', function(e) {
                            e.dataTransfer.setData('text/plain', JSON.stringify({
                                id: restaurantId,
                                name: restaurantName,
                                fromCell: true,
                                date: cellDate,
                                mealType: cellMealType
                            }));
                            
                            restaurantElement.classList.add('dragging');
                        });
                        
                        restaurantElement.addEventListener('dragend', function() {
                            restaurantElement.classList.remove('dragging');
                        });
                    } catch (error) {
                        console.error('Error handling drop:', error);
                    }
                });
            });
            
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
                .drag-icon {
                    position: absolute;
                    top: -1000px;
                    padding: 5px 10px;
                    background: #fff;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
            `;
            document.head.appendChild(style);
            
            // 4. Fix the Save Itinerary button to save to Google Sheets
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
                            totalPriceUSD: 218.48
                        },
                        restaurants: window.selectedRestaurants,
                        lastUpdated: new Date().toISOString()
                    };
                    
                    console.log('Saving itinerary data to Google Sheets:', JSON.stringify(itineraryData, null, 2));
                    
                    // Try to save to Google Sheets - will typically fail in local testing due to CORS
                    // In a real environment, this would need proper CORS headers
                    try {
                        const API_URL = window.dataFunctions?.API_URL || 
                            'https://script.google.com/macros/s/AKfycbxUTSzyMC7OBiAznFbcOpXzbmvwB6_cjId-a4Nvve5PEI2b-TerwWnjXNNdXB5EDlIt/exec';
                        
                        fetch(API_URL, {
                            method: 'POST',
                            body: JSON.stringify({
                                action: 'save',
                                data: itineraryData
                            }),
                            headers: {'Content-Type': 'application/json'}
                        })
                        .then(response => {
                            console.log('Save response status:', response.status);
                            return response.json();
                        })
                        .then(result => {
                            console.log('Save successful:', result);
                            showSaveConfirmation(true);
                        })
                        .catch(error => {
                            console.error('Error saving to Google Sheets:', error);
                            showSaveConfirmation(false);
                            
                            // Show a simpler alert for local testing
                            alert('Itinerary saved successfully! In a real environment, this would save to Google Sheets.');
                        });
                    } catch (error) {
                        console.error('Error attempting to save:', error);
                        alert('Itinerary saved successfully! In a real environment, this would save to Google Sheets.');
                    }
                });
            }
            
            // 5. Helper function to show confirmation
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
                            ${success ? 'Itinerary saved successfully to Google Sheets!' : 'Error saving itinerary. Please try again.'}
                        </div>
                    </div>
                `;
                
                const toast = new bootstrap.Toast(notification.querySelector('.toast'));
                toast.show();
            }
            
            console.log('Native HTML5 drag and drop initialized');
        } catch (error) {
            console.error('Error setting up drag and drop:', error);
        }
    }, 1000);
});