// Image Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;
  let autoSlideInterval;

  // Show current slide
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentIndex = index;
  }

  // Next slide
  function nextSlide() {
    const newIndex = (currentIndex + 1) % slides.length;
    showSlide(newIndex);
    resetAutoSlide();
  }

  // Previous slide
  function prevSlide() {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(newIndex);
    resetAutoSlide();
  }

  // Auto slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      const slideIndex = parseInt(this.getAttribute('data-index'));
      showSlide(slideIndex);
      resetAutoSlide();
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Start auto sliding
  startAutoSlide();
});



// API Integration for Health Data
document.addEventListener('DOMContentLoaded', function() {
  const covidCasesEl = document.getElementById('covidCases');
  const vaccinationRateEl = document.getElementById('vaccinationRate');
  const hospitalCapacityEl = document.getElementById('hospitalCapacity');
  const refreshBtn = document.getElementById('refreshData');
  
  // Mock API data (in a real app, you would fetch from actual APIs)
  async function fetchHealthData() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data - in reality you would use fetch() to get real data
      // Example real API endpoint: https://disease.sh/v3/covid-19/countries/USA
      const mockData = {
        covidCases: Math.floor(Math.random() * 50000) + 50000,
        vaccinationRate: (Math.random() * 20 + 70).toFixed(1),
        hospitalCapacity: (Math.random() * 15 + 75).toFixed(1)
      };
      
      return mockData;
    } catch (error) {
      console.error('Error fetching health data:', error);
      return null;
    }
  }
  
  // Update UI with data
  async function updateHealthData() {
    covidCasesEl.textContent = 'Loading...';
    vaccinationRateEl.textContent = 'Loading...';
    hospitalCapacityEl.textContent = 'Loading...';
    
    const data = await fetchHealthData();
    
    if (data) {
      covidCasesEl.textContent = data.covidCases.toLocaleString();
      vaccinationRateEl.textContent = `${data.vaccinationRate}%`;
      hospitalCapacityEl.textContent = `${data.hospitalCapacity}%`;
    } else {
      covidCasesEl.textContent = 'Error';
      vaccinationRateEl.textContent = 'Error';
      hospitalCapacityEl.textContent = 'Error';
    }
  }
  
  // Event listener for refresh button
  refreshBtn.addEventListener('click', updateHealthData);
  
  // Initial data load
  updateHealthData();
});