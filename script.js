// Car data without stock or VIN
const carData = [
    {
        make: "Ferrari", model: "SF90 Stradale", year: "2024", bodyStyle: "Coupe",
        transmission: "8-speed Dual-Clutch", engine: "4.0L Twin-Turbo V8 Hybrid",
        horsepower: "986 hp", price: "$625,000",
        image: "https://cdn.motor1.com/images/mgl/6ZZv4/s1/ferrari-sf90-stradale.jpg"
    },
    {
        make: "Ferrari", model: "296 GTB", year: "2023", bodyStyle: "Coupe",
        transmission: "8-speed Dual-Clutch", engine: "3.0L Twin-Turbo V6 Hybrid",
        horsepower: "818 hp", price: "$350,000",
        image: "https://cdn.motor1.com/images/mgl/6nXeX/s1/ferrari-296-gtb.jpg"
    },
    {
        make: "Lamborghini", model: "Revuelto", year: "2024", bodyStyle: "Coupe",
        transmission: "8-speed Dual-Clutch", engine: "6.5L V12 Hybrid",
        horsepower: "1,001 hp", price: "$600,000",
        image: "https://cdn.motor1.com/images/mgl/0xXJb/s1/lamborghini-revuelto.jpg"
    },
    {
        make: "Lamborghini", model: "Aventador SVJ", year: "2023", bodyStyle: "Coupe",
        transmission: "7-speed ISR", engine: "6.5L V12",
        horsepower: "759 hp", price: "$520,000",
        image: "https://cdn.motor1.com/images/mgl/XpQY2/s1/lamborghini-aventador-svj.jpg"
    },
    {
        make: "Porsche", model: "911 GT3 RS", year: "2024", bodyStyle: "Coupe",
        transmission: "7-speed PDK", engine: "4.0L Flat-6",
        horsepower: "518 hp", price: "$225,000",
        image: "https://cdn.motor1.com/images/mgl/4MqG3/s1/porsche-911-gt3-rs.jpg"
    },
    {
        make: "Porsche", model: "Taycan Turbo S", year: "2024", bodyStyle: "Sedan",
        transmission: "2-speed Automatic", engine: "Dual Electric Motors",
        horsepower: "750 hp", price: "$190,000",
        image: "https://cdn.motor1.com/images/mgl/1mG0X/s1/porsche-taycan-turbo-s.jpg"
    },
    {
        make: "McLaren", model: "765LT", year: "2023", bodyStyle: "Coupe",
        transmission: "7-speed Dual-Clutch", engine: "4.0L Twin-Turbo V8",
        horsepower: "755 hp", price: "$358,000",
        image: "https://cdn.motor1.com/images/mgl/9MOX2/s1/mclaren-765lt.jpg"
    },
    {
        make: "McLaren", model: "Artura", year: "2024", bodyStyle: "Coupe",
        transmission: "8-speed Dual-Clutch", engine: "3.0L Twin-Turbo V6 Hybrid",
        horsepower: "671 hp", price: "$225,000",
        image: "https://cdn.motor1.com/images/mgl/6ZZv4/s1/mclaren-artura.jpg"
    },
    {
        make: "Bugatti", model: "Chiron Super Sport", year: "2024", bodyStyle: "Coupe",
        transmission: "7-speed Dual-Clutch", engine: "8.0L Quad-Turbo W16",
        horsepower: "1,578 hp", price: "$3,800,000",
        image: "https://cdn.motor1.com/images/mgl/6nXeX/s1/bugatti-chiron-super-sport.jpg"
    },
    {
        make: "Koenigsegg", model: "Jesko", year: "2024", bodyStyle: "Coupe",
        transmission: "9-speed Multi-Clutch", engine: "5.0L Twin-Turbo V8",
        horsepower: "1,600 hp", price: "$3,000,000",
        image: "https://cdn.motor1.com/images/mgl/0xXJb/s1/koenigsegg-jesko.jpg"
    }
];


// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const carGrid = document.getElementById('carGrid');
const carDisplay = document.getElementById('carDisplay');

// Display cars based on search
function displayCars(filter = '') {
    carGrid.innerHTML = '';
    
    if (!filter.trim()) {
        showEmptyState();
        return;
    }
    
    const searchTerm = filter.toLowerCase();
    const filteredCars = carData.filter(car => 
        car.make.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm) ||
        car.bodyStyle.toLowerCase().includes(searchTerm) ||
        car.engine.toLowerCase().includes(searchTerm) ||
        car.year.includes(searchTerm) ||
        car.price.toLowerCase().includes(searchTerm)
    );
    
    if (filteredCars.length === 0) {
        showNoResults();
        return;
    }
    
    showResults(filteredCars);
}

function showEmptyState() {
    carDisplay.classList.remove('has-results');
    carGrid.innerHTML = ''; 
}

function showNoResults() {
    carDisplay.classList.remove('has-results');
    carGrid.innerHTML = '<p class="no-results">No matching vehicles found</p>';
}

function showResults(cars) {
    carDisplay.classList.add('has-results');
    
    const carsToShow = cars.slice(0, 5);
    carsToShow.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}">
            <h3>${car.year} ${car.make} ${car.model}</h3>
            <div class="car-specs">
                <p><strong>Body Style:</strong> ${car.bodyStyle}</p>
                <p><strong>Transmission:</strong> ${car.transmission}</p>
                <p><strong>Engine:</strong> ${car.engine}</p>
                <p><strong>Horsepower:</strong> ${car.horsepower}</p>
                <p><strong>Price:</strong> <span class="price">${car.price}</span></p>
            </div>
            <div class="car-actions">
                <button class="buy-btn">Buy Now</button>
                <button class="finance-btn" onclick="window.location.href='finance.html?price=${car.price.replace(/\D/g,'')}'">Finance</button>
            </div>
        `;
        carGrid.appendChild(carCard);
    });
}

// Event Listeners
searchBtn.addEventListener('click', () => displayCars(searchInput.value.trim()));
resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    showEmptyState();
});
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') displayCars(searchInput.value.trim());
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('buyModal');
    const closeBtn = document.querySelector('.close');
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('buy-btn')) {
            modal.style.display = 'block';
        }
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Start with empty state
    showEmptyState();
});