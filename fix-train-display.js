// Fix script for train display issue
document.addEventListener('DOMContentLoaded', function() {
    console.log('Applying train display fix');
    
    // Give the page time to load
    setTimeout(function() {
        console.log('Running train display fix');
        // Find all train selection buttons
        const trainSelectButtons = document.querySelectorAll('.select-train-btn');
        
        trainSelectButtons.forEach(button => {
            // Remove existing click handlers
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add new click handler
            newButton.addEventListener('click', function() {
                // Find the train card - first try the card itself, then the parent
                const trainCard = this.closest('.card') || this.closest('.col-md-4').querySelector('.card');
                const trainId = parseInt(trainCard.getAttribute('data-id'));
                
                // Remove selection from all cards
                document.querySelectorAll('.train-card').forEach(card => {
                    card.classList.remove('selected');
                });
                
                // Add selection to this card
                trainCard.classList.add('selected');
                
                // Find the train data
                const trainOptions = window.trainOptions || window.trainData;
                const selectedTrain = trainOptions.find(train => train.id === trainId);
                
                if (selectedTrain) {
                    console.log('Selected train:', selectedTrain);
                    window.selectedTrain = selectedTrain;
                    
                    // Update the display
                    const trainDisplay = document.getElementById('selectedTrainDisplay');
                    const currencyDisplay = window.currencyDisplay || 'USD';
                    const regularPrice = currencyDisplay === 'USD' ? selectedTrain.priceRegularUSD : selectedTrain.priceRegularEUR;
                    const firstClassPrice = currencyDisplay === 'USD' ? selectedTrain.priceFirstClassUSD : selectedTrain.priceFirstClassEUR;
                    const totalPrice = regularPrice * 2;
                    const currencySymbol = currencyDisplay === 'USD' ? '$' : '€';
                    
                    // Format date
                    const formatDate = function(dateString) {
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        return new Date(dateString).toLocaleDateString(undefined, options);
                    };
                    
                    // Convert to 12 hour format
                    const convertTo12Hour = function(time24h) {
                        const [hours, minutes] = time24h.split(':');
                        const hour = parseInt(hours, 10);
                        const suffix = hour >= 12 ? 'PM' : 'AM';
                        const hour12 = hour % 12 || 12;
                        return `${hour12}:${minutes} ${suffix}`;
                    };
                    
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
                                    <a href="${selectedTrain.link}" target="_blank" class="btn btn-sm btn-primary">Book This Train</a>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // Add event listener for class toggle
                    const classToggleBtn = document.getElementById('selected-class-toggle');
                    if (classToggleBtn) {
                        classToggleBtn.addEventListener('click', function() {
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
                    }
                }
            });
        });
        
        console.log('Train display fix applied');
    }, 2000); // Longer delay to ensure page is loaded
});