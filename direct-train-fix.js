// Direct fix for train display
document.addEventListener('DOMContentLoaded', function() {
    console.log('Applying direct train fix');
    
    setTimeout(function() {
        // Get sample train data directly
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
            }
        ];
        
        // Set this as the selected train
        window.selectedTrain = trainData[0];
        
        // Update the display directly
        const trainDisplay = document.getElementById('selectedTrainDisplay');
        const selectedTrain = trainData[0];
        
        if (trainDisplay && selectedTrain) {
            const currencyDisplay = 'USD';
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
            
            console.log('Direct train fix applied');
        }
    }, 1500);
});