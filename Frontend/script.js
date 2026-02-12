let currentUser = null; // yeh already hai
let currentActiveTab = 'flight'; // flight default tab

// Check if user is logged in on page load
window.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem('user');
    if (userData) {
        currentUser = JSON.parse(userData);
        // If admin is logged in and on index.html, redirect to admin.html
        if (currentUser.isAdmin && window.location.pathname.includes('index.html')) {
            window.location.href = 'admin.html';
        }
    }
});

initializeTabs();
initializeGroupsSearch();
initializeUmrahFilters();

// Select Modals
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeBtns = document.querySelectorAll('.close');

// Functions to show modals
function showLoginModal() {
    if (loginModal) loginModal.style.display = 'block';
}

function showRegisterModal() {
    if (registerModal) registerModal.style.display = 'block';
}

// Close modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (loginModal) loginModal.style.display = 'none';
        if (registerModal) registerModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.style.display = 'none';
    if (e.target === registerModal) registerModal.style.display = 'none';
});

// Book Now Button
const bookNowBtn = document.getElementById('bookNowBtn');
if (bookNowBtn) {
    bookNowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!currentUser) {
            // Redirect to registration page
            window.location.href = 'reg.html';
        } else {
            // If logged in, redirect based on role
            if (currentUser.isAdmin) {
                window.location.href = 'admin.html';
            } else {
                // User stays on index.html for booking
                alert('Welcome! You can now proceed with booking.');
            }
        }
    });
}


// ========== GROUPS TAB FUNCTIONALITY - FILE KE BILKUL END MEIN ADD KARO ==========
// ========== YEH SAB CODE EXISTING CODE KE BAAD LAGAO ==========

// Initialize Tabs
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    const flightSearchFields = document.querySelector('.search-fields');
    const groupsSearchFields = document.getElementById('groupsSearchFields');
    const tripTypeContainer = document.querySelector('.trip-type');
    
    // Safety check - agar elements exist nahi karte to return
    if (!tabs.length || !flightSearchFields || !groupsSearchFields) {
        console.log('Tab elements not found - maybe not on index.html');
        return;
    }
    
    // Default: Flight tab active, groups hidden
    groupsSearchFields.style.display = 'none';
    currentActiveTab = 'flight';
    
    // Tab click handler
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const tabType = this.dataset.type;
            currentActiveTab = tabType;
            
            // Show/hide appropriate search fields
            if (tabType === 'groups') {
                flightSearchFields.style.display = 'none';
                groupsSearchFields.style.display = 'block';
                if (tripTypeContainer) tripTypeContainer.style.display = 'none';
            } 
            else if (tabType === 'flight') {
                flightSearchFields.style.display = 'flex';
                groupsSearchFields.style.display = 'none';
                if (tripTypeContainer) tripTypeContainer.style.display = 'flex';
            } 
            else {
                // For Umrah, Hotels, Holidays, Visas
                flightSearchFields.style.display = 'none';
                groupsSearchFields.style.display = 'none';
                if (tripTypeContainer) tripTypeContainer.style.display = 'none';
                
                // Temporary message
                console.log(`${tabType} search coming soon!`);
            }
        });
    });
}

// Initialize Groups Search Button
function initializeGroupsSearch() {
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        // Remove existing listeners to avoid duplicates
        const newSearchBtn = searchBtn.cloneNode(true);
        searchBtn.parentNode.replaceChild(newSearchBtn, searchBtn);
        
        // Add new listener
        newSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (currentActiveTab === 'groups') {
                searchGroupsPackages();
            } else if (currentActiveTab === 'flight') {
                searchFlights();
            }
        });
    }
}

// Search Groups Packages
function searchGroupsPackages() {
    // Check if user is logged in
    if (!currentUser) {
        alert('Please login or register to search packages');
        window.location.href = 'reg.html?redirect=groups-packages.html';
        return;
    }
    
    const destination = document.getElementById('groupDestination');
    const departureDate = document.getElementById('groupDepartureDate');
    const duration = document.getElementById('groupDuration');
    const travelers = document.getElementById('groupTravelers');
    const hotelRating = document.getElementById('groupHotelRating');
    const packageType = document.getElementById('groupPackageType');
    
    // Validation - check if elements exist
    if (!destination || !departureDate) {
        alert('Search form not loaded properly');
        return;
    }
    
    const destValue = destination.value;
    const dateValue = departureDate.value;
    
    if (!destValue) {
        alert('Please select a destination');
        return;
    }
    
    if (!dateValue) {
        alert('Please select departure date');
        return;
    }
    
    // Collect all search criteria
    const searchCriteria = {
        destination: destValue,
        departureDate: dateValue,
        duration: duration ? duration.value : '7',
        travelers: travelers ? travelers.value : '1',
        hotelRating: hotelRating ? hotelRating.value : '3',
        packageType: packageType ? packageType.value : 'economy',
        searchTime: new Date().toISOString()
    };
    
    // Store search criteria in localStorage for results page
    localStorage.setItem('groupsSearch', JSON.stringify(searchCriteria));
    
    // For now, just show alert - we'll create groups-packages.html later
    alert('Searching Carvan Packages...\nDestination: ' + destValue + '\nDate: ' + dateValue);
    // window.location.href = 'groups-packages.html';
}

// Flight search placeholder
function searchFlights() {
    if (!currentUser) {
        alert('Please login or register to search flights');
        window.location.href = 'reg.html';
        return;
    }
    alert('Flight search coming soon!');
}

// ========== GROUPS TAB CODE END ==========


// Initialize Tabs - UPDATED WITH UMRAH TAB
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    const flightSearchFields = document.querySelector('.search-fields');
    const groupsSearchFields = document.getElementById('groupsSearchFields');
    const umrahSearchFields = document.getElementById('umrahSearchFields');
    const tripTypeContainer = document.querySelector('.trip-type');
    
    // Safety check - agar elements exist nahi karte to return
    if (!tabs.length) {
        console.log('Tab elements not found - maybe not on index.html');
        return;
    }
    
    // Default: Flight tab active, others hidden
    if (flightSearchFields) flightSearchFields.style.display = 'flex';
    if (groupsSearchFields) groupsSearchFields.style.display = 'none';
    if (umrahSearchFields) umrahSearchFields.style.display = 'none';
    if (tripTypeContainer) tripTypeContainer.style.display = 'flex';
    currentActiveTab = 'flight';
    
    // Tab click handler
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const tabType = this.dataset.type;
            currentActiveTab = tabType;
            
            // Hide all search fields first
            if (flightSearchFields) flightSearchFields.style.display = 'none';
            if (groupsSearchFields) groupsSearchFields.style.display = 'none';
            if (umrahSearchFields) umrahSearchFields.style.display = 'none';
            if (tripTypeContainer) tripTypeContainer.style.display = 'none';
            
            // Show appropriate search fields
            if (tabType === 'flight') {
                if (flightSearchFields) flightSearchFields.style.display = 'flex';
                if (tripTypeContainer) tripTypeContainer.style.display = 'flex';
            } 
            else if (tabType === 'groups') {
                if (groupsSearchFields) groupsSearchFields.style.display = 'block';
            }
            else if (tabType === 'umrah') {
                if (umrahSearchFields) umrahSearchFields.style.display = 'block';
            }
            else {
                // For Hotels, Holidays, Visas - coming soon
                console.log(`${tabType} search coming soon!`);
                alert(`${tabType} booking coming soon!`);
            }
        });
    });
}

// ========== UMRAH TAB FUNCTIONS ==========

// Initialize Umrah Quick Filters
function initializeUmrahFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');
    
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Remove active class from all chips
            filterChips.forEach(c => c.classList.remove('active-chip'));
            
            // Add active class to clicked chip
            this.classList.add('active-chip');
            
            // Set values based on filter
            const destinationSelect = document.getElementById('umrahDestination');
            const durationSelect = document.getElementById('umrahDuration');
            const packageTypeSelect = document.getElementById('umrahPackageType');
            
            if (filter === '7') {
                if (destinationSelect) destinationSelect.value = 'umrah-only';
                if (durationSelect) durationSelect.value = '7';
                if (packageTypeSelect) packageTypeSelect.value = 'economy';
            } else if (filter === '14') {
                if (destinationSelect) destinationSelect.value = 'umrah-ziyarat';
                if (durationSelect) durationSelect.value = '14';
                if (packageTypeSelect) packageTypeSelect.value = 'standard';
            } else if (filter === '21') {
                if (destinationSelect) destinationSelect.value = 'umrah-extended';
                if (durationSelect) durationSelect.value = '21';
                if (packageTypeSelect) packageTypeSelect.value = 'premium';
            } else if (filter === 'ramadan') {
                if (destinationSelect) destinationSelect.value = 'ramadan-umrah';
                if (durationSelect) durationSelect.value = '21';
                if (packageTypeSelect) packageTypeSelect.value = 'vip';
            } else if (filter === 'vip') {
                if (destinationSelect) destinationSelect.value = 'makkah-only';
                if (durationSelect) durationSelect.value = '7';
                if (packageTypeSelect) packageTypeSelect.value = 'vip';
            } else if (filter === 'family') {
                if (destinationSelect) destinationSelect.value = 'umrah-ziyarat';
                if (durationSelect) durationSelect.value = '10';
                if (packageTypeSelect) packageTypeSelect.value = 'standard';
            }
            
            // Highlight the selected chip
            this.style.background = '#0c5a2a';
            this.style.color = 'white';
        });
    });
}

// Search Umrah Packages
function searchUmrahPackages() {
    // Check if user is logged in
    if (!currentUser) {
        alert('Please login or register to search Umrah packages');
        window.location.href = 'reg.html?redirect=umrah-packages.html';
        return;
    }
    
    const destination = document.getElementById('umrahDestination');
    const departureDate = document.getElementById('umrahDepartureDate');
    const duration = document.getElementById('umrahDuration');
    const travelers = document.getElementById('umrahTravelers');
    const hotelRating = document.getElementById('umrahHotelRating');
    const packageType = document.getElementById('umrahPackageType');
    
    // Get hotel distance preference
    const distanceRadios = document.getElementsByName('hotelDistance');
    let hotelDistance = 'walking';
    for (let radio of distanceRadios) {
        if (radio.checked) {
            hotelDistance = radio.value;
            break;
        }
    }
    
    // Get meal preferences
    const mealBreakfast = document.getElementById('mealBreakfast')?.checked || false;
    const mealDinner = document.getElementById('mealDinner')?.checked || false;
    const mealFull = document.getElementById('mealFull')?.checked || false;
    
    // Validation
    if (!destination || !destination.value) {
        alert('Please select a destination');
        return;
    }
    
    if (!departureDate || !departureDate.value) {
        alert('Please select departure date');
        return;
    }
    
    // Collect all search criteria
    const searchCriteria = {
        destination: destination.value,
        departureDate: departureDate.value,
        duration: duration ? duration.value : '7',
        travelers: travelers ? travelers.value : '1',
        hotelRating: hotelRating ? hotelRating.value : '3',
        packageType: packageType ? packageType.value : 'economy',
        hotelDistance: hotelDistance,
        mealBreakfast: mealBreakfast,
        mealDinner: mealDinner,
        mealFull: mealFull,
        searchTime: new Date().toISOString()
    };
    
    // Store search criteria in localStorage for results page
    localStorage.setItem('umrahSearch', JSON.stringify(searchCriteria));
    
    // Show success message
    alert('Searching Umrah Packages...\nDestination: ' + destination.value + '\nDate: ' + departureDate.value);
    
    // Will redirect to umrah-packages.html later
    // window.location.href = 'umrah-packages.html';
}

// Update searchBtn click handler
function initializeGroupsSearch() {
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        // Remove existing listeners to avoid duplicates
        const newSearchBtn = searchBtn.cloneNode(true);
        searchBtn.parentNode.replaceChild(newSearchBtn, searchBtn);
        
        // Add new listener
        newSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (currentActiveTab === 'groups') {
                searchGroupsPackages();
            } else if (currentActiveTab === 'flight') {
                searchFlights();
            } else if (currentActiveTab === 'umrah') {
                searchUmrahPackages();
            }
        });
    }
}

// Add active-chip class styling
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for active-chip if not exists
    const style = document.createElement('style');
    style.innerHTML = `
        .filter-chip.active-chip {
            background: #0c5a2a !important;
            color: white !important;
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 8px 16px rgba(12, 90, 42, 0.3);
        }
    `;
    document.head.appendChild(style);
});

// ========== UMRAH TAB FUNCTIONS END ==========

