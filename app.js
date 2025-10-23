// Global state
let selectedCar = indianCarsData[0];
let selectedVariant = selectedCar.variants[0];
let comparisonVariants = []; // Array to store multiple variants for comparison
let userBudget = null;
let budgetRecommendations = [];

// DOM elements
const carShowcase = document.getElementById('carShowcase');
const carSelector = document.getElementById('carSelector');
const variantSelector = document.getElementById('variantSelector');
const specsPanel = document.getElementById('specsPanel');
const featuresPanel = document.getElementById('featuresPanel');
const carDetails = document.getElementById('carDetails');
const compareBtn = document.getElementById('compareBtn');
const comparisonModal = document.getElementById('comparisonModal');
const closeModal = document.getElementById('closeModal');
const comparisonContent = document.getElementById('comparisonContent');
const budgetModal = document.getElementById('budgetModal');
const budgetBtn = document.getElementById('budgetBtn');
const closeBudgetModal = document.getElementById('closeBudgetModal');
const budgetForm = document.getElementById('budgetForm');
const budgetRecommendationsDiv = document.getElementById('budgetRecommendations');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderCarShowcase();
    renderCarSelector();
    renderVariantSelector();
    renderSpecsPanel();
    renderFeaturesPanel();
    renderCarDetails();
    
    // Event listeners
    compareBtn.addEventListener('click', showVariantSelector);
    closeModal.addEventListener('click', hideComparison);
    budgetBtn.addEventListener('click', showBudgetModal);
    closeBudgetModal.addEventListener('click', hideBudgetModal);
    
    comparisonModal.addEventListener('click', function(e) {
        if (e.target === comparisonModal) {
            hideComparison();
        }
    });
    
    budgetModal.addEventListener('click', function(e) {
        if (e.target === budgetModal) {
            hideBudgetModal();
        }
    });
    
    budgetForm.addEventListener('submit', handleBudgetSubmit);
});

// Render car showcase
function renderCarShowcase() {
    const pricing = selectedVariant.pricing;
    carShowcase.innerHTML = `
        <div class="showcase-content">
            <div class="showcase-info">
                <div class="showcase-badges">
                    <span class="category-badge">${selectedCar.category}</span>
                    <div class="year-badge">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${selectedCar.year}</span>
                    </div>
                </div>
                <h1 class="showcase-title">${selectedCar.brand} ${selectedCar.model}</h1>
                <p class="showcase-variant">${selectedVariant.name} Variant</p>
                
                <div class="showcase-stats">
                    <div class="stat-card">
                        <div class="stat-header">
                            <i class="fas fa-tag stat-icon" style="color: #10b981;"></i>
                            <span class="stat-label">Ex-Showroom Price</span>
                        </div>
                        <div class="stat-value">₹${(pricing.exShowroom / 100000).toFixed(2)} Lakh</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <i class="fas fa-gas-pump stat-icon" style="color: #f59e0b;"></i>
                            <span class="stat-label">Mileage</span>
                        </div>
                        <div class="stat-value">${selectedVariant.mileage.combined} kmpl</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <i class="fas fa-cog stat-icon" style="color: #ef4444;"></i>
                            <span class="stat-label">Engine Power</span>
                        </div>
                        <div class="stat-value">${selectedVariant.engine.power}</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <i class="fas fa-users stat-icon" style="color: #8b5cf6;"></i>
                            <span class="stat-label">Seating</span>
                        </div>
                        <div class="stat-value">${selectedCar.seatingCapacity} Seater</div>
                    </div>
                </div>
            </div>
            
            <div class="showcase-image">
                <img src="${selectedVariant.image}" alt="${selectedCar.brand} ${selectedCar.model} ${selectedVariant.name}">
            </div>
        </div>
    `;
}

// Render car selector
function renderCarSelector() {
    carSelector.innerHTML = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-car card-icon" style="color: #2563eb;"></i>
                <h3 class="card-title">Select Car Model</h3>
            </div>
            <div class="car-list">
                ${indianCarsData.map(car => `
                    <div class="car-item ${car.id === selectedCar.id ? 'selected' : ''}" 
                         onclick="selectCar('${car.id}')">
                        <div class="car-item-content">
                            <div class="car-info">
                                <div class="car-header">
                                    <h4 class="car-name">${car.brand} ${car.model}</h4>
                                    <span class="year-badge-small">${car.year}</span>
                                </div>
                                <p class="car-body-type">${car.bodyType}</p>
                                <div class="car-meta">
                                    <div>
                                        <i class="fas fa-users"></i>
                                        <span>${car.seatingCapacity} Seater</span>
                                    </div>
                                    <div>
                                        <i class="fas fa-gas-pump"></i>
                                        <span>${car.variants[0].engine.fuelType}</span>
                                    </div>
                                </div>
                                <p class="car-price">₹${(car.variants[0].pricing.exShowroom / 100000).toFixed(2)} Lakh onwards</p>
                            </div>
                            <img src="${car.variants[0].image}" alt="${car.brand} ${car.model}" class="car-image">
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Render variant selector
function renderVariantSelector() {
    variantSelector.innerHTML = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-cogs card-icon" style="color: #2563eb;"></i>
                <h3 class="card-title">Select Variant</h3>
            </div>
            <div class="variant-list">
                ${selectedCar.variants.map(variant => `
                    <button class="variant-item ${variant.id === selectedVariant.id ? 'selected' : ''}" 
                            onclick="selectVariant('${variant.id}')">
                        <div class="variant-header">
                            <h4 class="variant-name">${variant.name}</h4>
                            ${variant.id === selectedVariant.id ? '<i class="fas fa-check check-icon"></i>' : ''}
                        </div>
                        <p class="variant-price">₹${(variant.pricing.exShowroom / 100000).toFixed(2)} Lakh</p>
                        <div class="variant-meta">
                            <div>
                                <i class="fas fa-gas-pump"></i>
                                <span>${variant.mileage.combined} kmpl</span>
                            </div>
                            <span>${variant.engine.transmission}</span>
                        </div>
                        <p class="variant-engine">${variant.engine.power} • ${variant.engine.fuelType}</p>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// Render specs panel
function renderSpecsPanel() {
    const variant = selectedVariant;
    const pricing = variant.pricing;
    
    specsPanel.innerHTML = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-clipboard-list card-icon" style="color: #2563eb;"></i>
                <h3 class="card-title">${variant.name} Specifications</h3>
            </div>
            <div class="specs-list">
                <!-- Pricing -->
                <div class="spec-item">
                    <div class="spec-icon-wrapper fuel">
                        <i class="fas fa-rupee-sign"></i>
                    </div>
                    <div class="spec-content">
                        <h4 class="spec-title">Pricing Breakdown</h4>
                        <div class="spec-grid">
                            <div class="spec-grid-item">
                                <span class="spec-value">₹${(pricing.exShowroom / 100000).toFixed(2)}</span>
                                <span class="spec-label">Ex-Showroom (Lakh)</span>
                            </div>
                            <div class="spec-grid-item">
                                <span class="spec-value">₹${(pricing.roadTax / 100000).toFixed(2)}</span>
                                <span class="spec-label">Road Tax (Lakh)</span>
                            </div>
                            <div class="spec-grid-item">
                                <span class="spec-value">₹${(pricing.insurance / 100000).toFixed(2)}</span>
                                <span class="spec-label">Insurance (Lakh)</span>
                            </div>
                            <div class="spec-grid-item highlight">
                                <span class="spec-value">₹${(pricing.total / 100000).toFixed(2)}</span>
                                <span class="spec-label">Total On-Road (Lakh)</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Mileage -->
                <div class="spec-item">
                    <div class="spec-icon-wrapper fuel">
                        <i class="fas fa-gas-pump"></i>
                    </div>
                    <div class="spec-content">
                        <h4 class="spec-title">Fuel Economy</h4>
                        <div class="spec-grid">
                            <div class="spec-grid-item">
                                <span class="spec-value">${variant.mileage.city}</span>
                                <span class="spec-label">City (kmpl)</span>
                            </div>
                            <div class="spec-grid-item">
                                <span class="spec-value">${variant.mileage.highway}</span>
                                <span class="spec-label">Highway (kmpl)</span>
                            </div>
                            <div class="spec-grid-item highlight">
                                <span class="spec-value">${variant.mileage.combined}</span>
                                <span class="spec-label">Combined (kmpl)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Engine -->
                <div class="spec-item">
                    <div class="spec-icon-wrapper engine">
                        <i class="fas fa-cog"></i>
                    </div>
                    <div class="spec-content">
                        <h4 class="spec-title">Engine</h4>
                        <div class="spec-details">
                            <div class="spec-detail">
                                <span class="spec-detail-label">Type:</span>
                                <span class="spec-detail-value">${variant.engine.type}</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Displacement:</span>
                                <span class="spec-detail-value">${variant.engine.displacement}</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Power:</span>
                                <span class="spec-detail-value">${variant.engine.power}</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Torque:</span>
                                <span class="spec-detail-value">${variant.engine.torque}</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Transmission:</span>
                                <span class="spec-detail-value">${variant.engine.transmission}</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Fuel Type:</span>
                                <span class="spec-detail-value">${variant.engine.fuelType}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Dimensions -->
                <div class="spec-item">
                    <div class="spec-icon-wrapper dimensions">
                        <i class="fas fa-expand-arrows-alt"></i>
                    </div>
                    <div class="spec-content">
                        <h4 class="spec-title">Dimensions (mm)</h4>
                        <div class="spec-details">
                            <div class="spec-detail">
                                <span class="spec-detail-label">Length:</span>
                                <span class="spec-detail-value">${variant.dimensions.length} mm</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Width:</span>
                                <span class="spec-detail-value">${variant.dimensions.width} mm</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Height:</span>
                                <span class="spec-detail-value">${variant.dimensions.height} mm</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Wheelbase:</span>
                                <span class="spec-detail-value">${variant.dimensions.wheelbase} mm</span>
                            </div>
                            ${variant.dimensions.bootSpace ? `
                                <div class="spec-detail">
                                    <span class="spec-detail-label">Boot Space:</span>
                                    <span class="spec-detail-value">${variant.dimensions.bootSpace} L</span>
                                </div>
                            ` : ''}
                            <div class="spec-detail">
                                <span class="spec-detail-label">Ground Clearance:</span>
                                <span class="spec-detail-value">${variant.dimensions.groundClearance} mm</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Safety -->
                <div class="spec-item">
                    <div class="spec-icon-wrapper safety">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="spec-content">
                        <h4 class="spec-title">Safety</h4>
                        <div class="safety-rating">
                            <div class="stars">
                                ${Array.from({length: 5}, (_, i) => 
                                    `<i class="fas fa-star star ${i < variant.safety.rating ? '' : 'empty'}"></i>`
                                ).join('')}
                            </div>
                            <span>${variant.safety.rating}/5 Star Rating</span>
                        </div>
                        <div class="safety-features">
                            ${variant.safety.features.slice(0, 4).map(feature => 
                                `<div class="safety-feature">• ${feature}</div>`
                            ).join('')}
                        </div>
                    </div>
                </div>

                <!-- Colors -->
                <div class="spec-item">
                    <div class="spec-icon-wrapper colors">
                        <i class="fas fa-palette"></i>
                    </div>
                    <div class="spec-content">
                        <h4 class="spec-title">Available Colors</h4>
                        <div class="color-list">
                            ${variant.colors.map(color => 
                                `<span class="color-tag">${color}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render features panel
function renderFeaturesPanel() {
    featuresPanel.innerHTML = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-star card-icon" style="color: #2563eb;"></i>
                <h3 class="card-title">Key Features</h3>
            </div>
            <div class="features-grid">
                ${selectedVariant.features.map(feature => `
                    <div class="feature-item">
                        <i class="fas ${getFeatureIcon(feature)} feature-icon"></i>
                        <span class="feature-text">${feature}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Render car details with video review
function renderCarDetails() {
    carDetails.innerHTML = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-info-circle card-icon" style="color: #2563eb;"></i>
                <h3 class="card-title">About ${selectedCar.brand} ${selectedCar.model}</h3>
            </div>
            
            <!-- Video Review Section -->
            <div class="video-review-section">
                <h4 class="video-title">
                    <i class="fab fa-youtube" style="color: #ff0000;"></i>
                    Video Review
                </h4>
                <div class="video-container">
                    <iframe 
                        src="${selectedCar.videoReview}" 
                        title="${selectedCar.brand} ${selectedCar.model} Review"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>

            <div class="car-description">
                ${selectedCar.description}
            </div>

            <div class="pros-cons-grid">
                <div class="pros-section">
                    <div class="pros-header">
                        <i class="fas fa-thumbs-up"></i>
                        <h4 class="section-title">Pros</h4>
                    </div>
                    <div class="pros-list">
                        ${selectedCar.pros.map(pro => `
                            <div class="pros-item">
                                <span class="pros-bullet"></span>
                                ${pro}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="cons-section">
                    <div class="cons-header">
                        <i class="fas fa-thumbs-down"></i>
                        <h4 class="section-title">Cons</h4>
                    </div>
                    <div class="cons-list">
                        ${selectedCar.cons.map(con => `
                            <div class="cons-item">
                                <span class="cons-bullet"></span>
                                ${con}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="quick-facts">
                <h4 class="quick-facts-title">Quick Facts</h4>
                <div class="quick-facts-grid">
                    <div class="quick-fact">
                        <span class="quick-fact-label">Category:</span>
                        <div class="quick-fact-value">${selectedCar.category}</div>
                    </div>
                    <div class="quick-fact">
                        <span class="quick-fact-label">Body Type:</span>
                        <div class="quick-fact-value">${selectedCar.bodyType}</div>
                    </div>
                    <div class="quick-fact">
                        <span class="quick-fact-label">Seating:</span>
                        <div class="quick-fact-value">${selectedCar.seatingCapacity} Seater</div>
                    </div>
                    <div class="quick-fact">
                        <span class="quick-fact-label">Variants:</span>
                        <div class="quick-fact-value">${selectedCar.variants.length} Options</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Select car function
function selectCar(carId) {
    selectedCar = indianCarsData.find(car => car.id === carId);
    selectedVariant = selectedCar.variants[0];
    
    renderCarShowcase();
    renderCarSelector();
    renderVariantSelector();
    renderSpecsPanel();
    renderFeaturesPanel();
    renderCarDetails();
}

// Select variant function
function selectVariant(variantId) {
    selectedVariant = selectedCar.variants.find(variant => variant.id === variantId);
    
    renderCarShowcase();
    renderVariantSelector();
    renderSpecsPanel();
    renderFeaturesPanel();
}

// Show variant selector for comparison
function showVariantSelector() {
    comparisonContent.innerHTML = `
        <div class="variant-selector-modal">
            <h3>Select Variants to Compare</h3>
            <p>Choose up to 3 variants from any car to compare their features and specifications.</p>
            
            <div class="comparison-car-selector">
                ${indianCarsData.map(car => `
                    <div class="comparison-car-group">
                        <h4 class="comparison-car-title">${car.brand} ${car.model}</h4>
                        <div class="comparison-variant-grid">
                            ${car.variants.map(variant => `
                                <label class="comparison-variant-option">
                                    <input type="checkbox" 
                                           value="${car.id}|${variant.id}" 
                                           onchange="toggleVariantForComparison(this, '${car.id}', '${variant.id}')"
                                           ${comparisonVariants.some(v => v.carId === car.id && v.variantId === variant.id) ? 'checked' : ''}>
                                    <div class="comparison-variant-card">
                                        <div class="comparison-variant-info">
                                            <h5>${variant.name}</h5>
                                            <p class="comparison-variant-price">₹${(variant.pricing.total / 100000).toFixed(2)} Lakh</p>
                                            <p class="comparison-variant-engine">${variant.engine.power} • ${variant.engine.fuelType}</p>
                                        </div>
                                    </div>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="comparison-actions">
                <button onclick="clearComparison()" class="clear-btn">Clear All</button>
                <button onclick="performComparison()" class="compare-action-btn" ${comparisonVariants.length < 2 ? 'disabled' : ''}>
                    Compare Selected (${comparisonVariants.length})
                </button>
            </div>
        </div>
    `;
    comparisonModal.classList.add('show');
}

// Toggle variant for comparison
function toggleVariantForComparison(checkbox, carId, variantId) {
    if (checkbox.checked) {
        if (comparisonVariants.length >= 3) {
            checkbox.checked = false;
            alert('You can compare maximum 3 variants at a time.');
            return;
        }
        comparisonVariants.push({ carId, variantId });
    } else {
        comparisonVariants = comparisonVariants.filter(v => !(v.carId === carId && v.variantId === variantId));
    }
    
    // Update compare button
    const compareBtn = document.querySelector('.compare-action-btn');
    if (compareBtn) {
        compareBtn.disabled = comparisonVariants.length < 2;
        compareBtn.textContent = `Compare Selected (${comparisonVariants.length})`;
    }
}

// Clear comparison
function clearComparison() {
    comparisonVariants = [];
    const checkboxes = document.querySelectorAll('.comparison-variant-option input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    const compareBtn = document.querySelector('.compare-action-btn');
    if (compareBtn) {
        compareBtn.disabled = true;
        compareBtn.textContent = 'Compare Selected (0)';
    }
}

// Perform comparison
function performComparison() {
    if (comparisonVariants.length < 2) {
        alert('Please select at least 2 variants to compare.');
        return;
    }
    
    renderComparison();
}

// Hide comparison modal
function hideComparison() {
    comparisonModal.classList.remove('show');
}

// Show budget modal
function showBudgetModal() {
    budgetModal.classList.add('show');
}

// Hide budget modal
function hideBudgetModal() {
    budgetModal.classList.remove('show');
}

// Handle budget form submission
function handleBudgetSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    userBudget = parseInt(formData.get('budget'));
    
    // Find recommendations based on budget
    budgetRecommendations = [];
    
    indianCarsData.forEach(car => {
        car.variants.forEach(variant => {
            if (variant.pricing.total <= userBudget) {
                budgetRecommendations.push({
                    car: car,
                    variant: variant,
                    savings: userBudget - variant.pricing.total
                });
            }
        });
    });
    
    // Sort by best value (considering features, safety, and price)
    budgetRecommendations.sort((a, b) => {
        const scoreA = calculateValueScore(a.car, a.variant);
        const scoreB = calculateValueScore(b.car, b.variant);
        return scoreB - scoreA;
    });
    
    renderBudgetRecommendations();
}

// Calculate value score for recommendations
function calculateValueScore(car, variant) {
    let score = 0;
    
    // Safety rating (0-50 points)
    score += variant.safety.rating * 10;
    
    // Features count (0-30 points)
    score += Math.min(variant.features.length, 15) * 2;
    
    // Fuel efficiency (0-20 points)
    score += Math.min(variant.mileage.combined, 30) * 0.67;
    
    // Brand reliability bonus
    const reliableBrands = ['Toyota', 'Honda', 'Maruti Suzuki'];
    if (reliableBrands.includes(car.brand)) {
        score += 10;
    }
    
    return score;
}

// Render budget recommendations
function renderBudgetRecommendations() {
    const topRecommendations = budgetRecommendations.slice(0, 6);
    
    budgetRecommendationsDiv.innerHTML = `
        <div class="budget-results">
            <h3>Recommended Cars Within ₹${(userBudget / 100000).toFixed(2)} Lakh Budget</h3>
            <p>Found ${budgetRecommendations.length} variants that fit your budget. Here are the top recommendations:</p>
            
            <div class="budget-recommendations-grid">
                ${topRecommendations.map(rec => `
                    <div class="budget-recommendation-card" onclick="selectCarFromRecommendation('${rec.car.id}', '${rec.variant.id}')">
                        <div class="budget-rec-header">
                            <h4>${rec.car.brand} ${rec.car.model}</h4>
                            <span class="budget-rec-variant">${rec.variant.name}</span>
                        </div>
                        
                        <div class="budget-rec-image">
                            <img src="${rec.variant.image}" alt="${rec.car.brand} ${rec.car.model}">
                        </div>
                        
                        <div class="budget-rec-details">
                            <div class="budget-rec-price">
                                <span class="price-label">On-Road Price</span>
                                <span class="price-value">₹${(rec.variant.pricing.total / 100000).toFixed(2)} Lakh</span>
                                <span class="savings">Save ₹${(rec.savings / 100000).toFixed(2)} Lakh</span>
                            </div>
                            
                            <div class="budget-rec-specs">
                                <div class="spec-item">
                                    <i class="fas fa-gas-pump"></i>
                                    <span>${rec.variant.mileage.combined} kmpl</span>
                                </div>
                                <div class="spec-item">
                                    <i class="fas fa-cog"></i>
                                    <span>${rec.variant.engine.power}</span>
                                </div>
                                <div class="spec-item">
                                    <i class="fas fa-shield-alt"></i>
                                    <span>${rec.variant.safety.rating}/5 Stars</span>
                                </div>
                            </div>
                            
                            <div class="budget-rec-features">
                                <span class="feature-count">${rec.variant.features.length} Features</span>
                                <span class="category-badge">${rec.car.category}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="budget-actions">
                <button onclick="hideBudgetModal()" class="budget-close-btn">Close</button>
                <button onclick="showAllRecommendations()" class="show-all-btn">Show All ${budgetRecommendations.length} Results</button>
            </div>
        </div>
    `;
}

// Select car from budget recommendation
function selectCarFromRecommendation(carId, variantId) {
    selectedCar = indianCarsData.find(car => car.id === carId);
    selectedVariant = selectedCar.variants.find(variant => variant.id === variantId);
    
    hideBudgetModal();
    
    renderCarShowcase();
    renderCarSelector();
    renderVariantSelector();
    renderSpecsPanel();
    renderFeaturesPanel();
    renderCarDetails();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show all budget recommendations
function showAllRecommendations() {
    budgetRecommendationsDiv.innerHTML = `
        <div class="budget-results">
            <h3>All Cars Within ₹${(userBudget / 100000).toFixed(2)} Lakh Budget</h3>
            <p>Showing all ${budgetRecommendations.length} variants that fit your budget:</p>
            
            <div class="budget-recommendations-list">
                ${budgetRecommendations.map(rec => `
                    <div class="budget-recommendation-row" onclick="selectCarFromRecommendation('${rec.car.id}', '${rec.variant.id}')">
                        <div class="budget-rec-basic-info">
                            <img src="${rec.variant.image}" alt="${rec.car.brand} ${rec.car.model}" class="budget-rec-thumb">
                            <div class="budget-rec-text">
                                <h5>${rec.car.brand} ${rec.car.model} ${rec.variant.name}</h5>
                                <p>${rec.car.category} • ${rec.variant.engine.fuelType}</p>
                            </div>
                        </div>
                        
                        <div class="budget-rec-specs-row">
                            <span>${rec.variant.mileage.combined} kmpl</span>
                            <span>${rec.variant.engine.power}</span>
                            <span>${rec.variant.safety.rating}/5★</span>
                        </div>
                        
                        <div class="budget-rec-price-row">
                            <span class="price">₹${(rec.variant.pricing.total / 100000).toFixed(2)} Lakh</span>
                            <span class="savings">Save ₹${(rec.savings / 100000).toFixed(2)}L</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="budget-actions">
                <button onclick="hideBudgetModal()" class="budget-close-btn">Close</button>
            </div>
        </div>
    `;
}

// Render comparison
function renderComparison() {
    const variants = comparisonVariants.map(cv => {
        const car = indianCarsData.find(c => c.id === cv.carId);
        const variant = car.variants.find(v => v.id === cv.variantId);
        return { car, variant };
    });
    
    comparisonContent.innerHTML = `
        <div class="comparison-grid" style="grid-template-columns: repeat(${variants.length}, 1fr);">
            ${variants.map(({ car, variant }) => `
                <div class="comparison-variant">
                    <div class="comparison-header">
                        <h3 class="comparison-title">${car.brand} ${car.model}</h3>
                        <h4 class="comparison-variant-name">${variant.name}</h4>
                        <p class="comparison-price">₹${(variant.pricing.total / 100000).toFixed(2)} Lakh</p>
                    </div>

                    <img src="${variant.image}" alt="${variant.name}" class="comparison-image">

                    <div class="comparison-specs">
                        <div class="comparison-spec">
                            <div class="comparison-spec-header">
                                <i class="fas fa-rupee-sign" style="color: #10b981;"></i>
                                <h4 class="comparison-spec-title">Pricing</h4>
                            </div>
                            <div class="comparison-spec-details">
                                <div>Ex-Showroom: ₹${(variant.pricing.exShowroom / 100000).toFixed(2)}L</div>
                                <div>Road Tax: ₹${(variant.pricing.roadTax / 100000).toFixed(2)}L</div>
                                <div>Insurance: ₹${(variant.pricing.insurance / 100000).toFixed(2)}L</div>
                                <div><strong>Total: ₹${(variant.pricing.total / 100000).toFixed(2)}L</strong></div>
                            </div>
                        </div>

                        <div class="comparison-spec">
                            <div class="comparison-spec-header">
                                <i class="fas fa-gas-pump" style="color: #16a34a;"></i>
                                <h4 class="comparison-spec-title">Fuel Economy</h4>
                            </div>
                            <div class="comparison-spec-value">
                                ${variant.mileage.combined} kmpl Combined
                            </div>
                            <div class="comparison-spec-details">
                                <div>City: ${variant.mileage.city} kmpl</div>
                                <div>Highway: ${variant.mileage.highway} kmpl</div>
                            </div>
                        </div>

                        <div class="comparison-spec">
                            <div class="comparison-spec-header">
                                <i class="fas fa-cog" style="color: #dc2626;"></i>
                                <h4 class="comparison-spec-title">Engine</h4>
                            </div>
                            <div class="comparison-spec-value">${variant.engine.type}</div>
                            <div class="comparison-spec-details">
                                <div>${variant.engine.power} • ${variant.engine.torque}</div>
                                <div>${variant.engine.displacement} • ${variant.engine.fuelType}</div>
                                <div>${variant.engine.transmission}</div>
                            </div>
                        </div>

                        <div class="comparison-spec">
                            <div class="comparison-spec-header">
                                <i class="fas fa-shield-alt" style="color: #ea580c;"></i>
                                <h4 class="comparison-spec-title">Safety</h4>
                            </div>
                            <div class="safety-rating">
                                <div class="stars">
                                    ${Array.from({length: 5}, (_, i) => 
                                        `<i class="fas fa-star star ${i < variant.safety.rating ? '' : 'empty'}"></i>`
                                    ).join('')}
                                </div>
                                <span>${variant.safety.rating}/5</span>
                            </div>
                        </div>

                        <div class="comparison-spec">
                            <h4 class="comparison-spec-title">Features (${variant.features.length})</h4>
                            <div class="comparison-features">
                                ${variant.features.slice(0, 8).map(feature => 
                                    `<div class="comparison-feature">• ${feature}</div>`
                                ).join('')}
                                ${variant.features.length > 8 ? `<div class="comparison-feature">... and ${variant.features.length - 8} more</div>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="comparison-actions">
            <button onclick="showVariantSelector()" class="modify-comparison-btn">Modify Selection</button>
            <button onclick="clearComparison(); hideComparison();" class="close-comparison-btn">Close Comparison</button>
        </div>
    `;
}

// Get feature icon
function getFeatureIcon(feature) {
    const featureLower = feature.toLowerCase();
    
    if (featureLower.includes('carplay') || featureLower.includes('android')) {
        return 'fa-mobile-alt';
    }
    if (featureLower.includes('audio') || featureLower.includes('speaker') || featureLower.includes('bose') || featureLower.includes('sony')) {
        return 'fa-volume-up';
    }
    if (featureLower.includes('sunroof')) {
        return 'fa-sun';
    }
    if (featureLower.includes('climate') || featureLower.includes('heated') || featureLower.includes('air conditioning')) {
        return 'fa-snowflake';
    }
    if (featureLower.includes('camera') || featureLower.includes('rearview')) {
        return 'fa-camera';
    }
    if (featureLower.includes('keyless') || featureLower.includes('remote') || featureLower.includes('push button')) {
        return 'fa-key';
    }
    if (featureLower.includes('navigation')) {
        return 'fa-map-marked-alt';
    }
    if (featureLower.includes('charging') || featureLower.includes('wireless')) {
        return 'fa-bolt';
    }
    if (featureLower.includes('airbag')) {
        return 'fa-shield-alt';
    }
    if (featureLower.includes('cruise')) {
        return 'fa-tachometer-alt';
    }
    if (featureLower.includes('led') || featureLower.includes('headlamp')) {
        return 'fa-lightbulb';
    }
    if (featureLower.includes('touchscreen') || featureLower.includes('infotainment')) {
        return 'fa-tablet-alt';
    }
    return 'fa-car';
}