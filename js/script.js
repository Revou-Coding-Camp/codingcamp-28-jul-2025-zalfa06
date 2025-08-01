// JavaScript - script.js
let userName = 'Guest';

// Show name input modal on page load
window.onload = function() {
    document.getElementById('nameModal').style.display = 'block';
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Start counter animation after 2 seconds
    setTimeout(animateCounter, 2000);
    
    // Initialize portfolio animations
    initializePortfolioAnimations();
    
    // Initialize stats counter animation
    setTimeout(animateStatsCounters, 3000);
};

// Set user name
function setName() {
    const nameInput = document.getElementById('nameInput').value.trim();
    if (nameInput) {
        userName = nameInput;
        document.getElementById('userName').textContent = userName;
        document.getElementById('nameModal').style.display = 'none';
        
        // Show welcome animation
        showWelcomeAnimation();
    } else {
        alert('Silakan masukkan nama Anda!');
    }
}

// Welcome animation after name is set
function showWelcomeAnimation() {
    const welcomeTitle = document.querySelector('.welcome-title');
    if (welcomeTitle) {
        welcomeTitle.style.transform = 'scale(1.1)';
        welcomeTitle.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
            welcomeTitle.style.transform = 'scale(1)';
        }, 500);
    }
}

// Allow Enter key to submit name
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('nameInput');
    if (nameInput) {
        nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                setName();
            }
        });
    }
});

// Page navigation with smooth transitions
function showPage(pageId) {
    // Hide all pages with fade out
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.classList.contains('active')) {
            page.style.opacity = '0';
            page.style.transform = 'translateY(20px)';
        }
    });

    // Remove active class from all nav buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));

    // Show selected page with delay for smooth transition
    setTimeout(() => {
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(pageId);
        targetPage.classList.add('active');
        targetPage.style.opacity = '1';
        targetPage.style.transform = 'translateY(0)';
        targetPage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }, 200);

    // Add active class to clicked nav button
    event.target.classList.add('active');
    
    // Initialize specific page animations
    if (pageId === 'portfolio') {
        setTimeout(initializePortfolioAnimations, 300);
    }
}

// Form validation and submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Get form values
    const nama = document.getElementById('nama').value.trim();
    const tanggalLahir = document.getElementById('tanggalLahir').value;
    const jenisKelaminElement = document.querySelector('input[name="jenisKelamin"]:checked');
    const pesan = document.getElementById('pesan').value.trim();

    // Validate form with Indonesian messages
    if (!nama) {
        alert('Silakan masukkan nama Anda!');
        document.getElementById('nama').focus();
        return;
    }

    if (!tanggalLahir) {
        alert('Silakan pilih tanggal lahir Anda!');
        document.getElementById('tanggalLahir').focus();
        return;
    }

    if (!jenisKelaminElement) {
        alert('Silakan pilih jenis kelamin Anda!');
        return;
    }

    if (!pesan) {
        alert('Silakan masukkan pesan Anda!');
        document.getElementById('pesan').focus();
        return;
    }

    const jenisKelamin = jenisKelaminElement.value;

    // Format date to Indonesian format
    const dateObj = new Date(tanggalLahir);
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

    // Calculate age
    const today = new Date();
    let age = today.getFullYear() - dateObj.getFullYear();
    const monthDiff = today.getMonth() - dateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateObj.getDate())) {
        age--;
    }

    // Display output with animation
    const outputContent = document.getElementById('outputContent');
    outputContent.style.opacity = '0';
    outputContent.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        outputContent.innerHTML = `
            <strong>Nama:</strong> ${nama}<br>
            <strong>Tanggal Lahir:</strong> ${formattedDate}<br>
            <strong>Umur:</strong> ${age} tahun<br>
            <strong>Jenis Kelamin:</strong> ${jenisKelamin}<br>
            <strong>Pesan:</strong> ${pesan}<br>
            <strong>Status:</strong> <span style="color: green;">✓ Pesan berhasil dikirim</span>
        `;
        
        outputContent.style.opacity = '1';
        outputContent.style.transform = 'translateY(0)';
        outputContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }, 200);

    // Show success message
    showSuccessMessage('Pesan Anda berhasil dikirim! Terima kasih.');

    // Add form submit animation
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        submitBtn.style.transform = 'scale(1)';
        submitBtn.style.transition = 'transform 0.2s ease';
    }, 150);
}

// Success message function
function showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 2000;
        font-weight: bold;
        transform: translateX(300px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(300px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Update current time with Indonesian format
function updateCurrentTime() {
    const now = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    const timeString = `${dayName}, ${day} ${month} ${year} - ${hours}:${minutes}:${seconds}`;
    
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Enhanced counter animation
function animateCounter() {
    const counter = document.getElementById('visitCounter');
    if (counter) {
        let count = parseInt(counter.textContent.replace(/\./g, ''));
        let increment = 0;
        
        const updateCounter = () => {
            increment = Math.floor(Math.random() * 5) + 1;
            count += increment;
            
            // Format number with Indonesian thousand separator (dots)
            const formattedCount = count.toLocaleString('id-ID');
            counter.textContent = formattedCount;
            
            // Add pulse effect
            counter.style.transform = 'scale(1.05)';
            counter.style.color = '#667eea';
            setTimeout(() => {
                counter.style.transform = 'scale(1)';
                counter.style.color = '#666';
                counter.style.transition = 'transform 0.2s ease, color 0.2s ease';
            }, 200);
        };
        
        // Update every 3-7 seconds randomly
        const scheduleNextUpdate = () => {
            const delay = Math.random() * 4000 + 3000; // 3-7 seconds
            setTimeout(() => {
                updateCounter();
                scheduleNextUpdate();
            }, delay);
        };
        
        scheduleNextUpdate();
    }
}

// Portfolio animations
function initializePortfolioAnimations() {
    const projectCards = document.querySelectorAll('.profile-card');
    const statCards = document.querySelectorAll('.stat-card');
    
    // Animate project cards on scroll or page load
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                }, index * 200);
            }
        });
    }, observerOptions);
    
    // Initially hide cards and observe them
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
    
    // Add hover effects to project images
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.filter = 'brightness(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'brightness(1)';
        });
    });
}

// Animated statistics counters
function animateStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        let currentValue = 0;
        
        const increment = Math.ceil(numericValue / 50); // Animate over ~50 steps
        
        const updateCounter = () => {
            if (currentValue < numericValue) {
                currentValue += increment;
                if (currentValue > numericValue) currentValue = numericValue;
                
                if (isPercentage) {
                    stat.textContent = currentValue + '%';
                } else if (numericValue >= 100) {
                    stat.textContent = currentValue + '+';
                } else {
                    stat.textContent = currentValue;
                }
                
                requestAnimationFrame(updateCounter);
            }
        };
        
        // Start animation when stat card is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(updateCounter, Math.random() * 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat.closest('.stat-card'));
    });
}

// Add smooth scroll behavior for internal navigation
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-btn')) {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
            e.target.style.transition = 'transform 0.1s ease';
        }, 100);
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Fallback for cached images
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Enhanced form interactions
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
            this.style.boxShadow = '0 0 0 2px rgba(102, 126, 234, 0.2)';
            this.style.transition = 'border-color 0.2s ease, box-shadow 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ccc';
            this.style.boxShadow = 'none';
        });
        
        // Add validation feedback
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.style.borderColor = '#4CAF50';
            } else {
                this.style.borderColor = '#f44336';
            }
        });
    });
});