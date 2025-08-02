// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavigation();
    initWelcomeMessage();
    initMessageForm();
    updateCurrentTime();
    
    // Update time every second
    setInterval(updateCurrentTime, 1000);
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle scroll to update active nav
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = '#' + section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Welcome message functionality
function initWelcomeMessage() {
    const nameInput = document.getElementById('nameInput');
    const welcomeMessage = document.getElementById('welcome-message');
    
    // Load saved name from localStorage or use default
    const savedName = localStorage.getItem('userName') || 'Harfi';
    nameInput.value = savedName;
    updateWelcomeText(savedName);
    
    // Save name when input changes
    nameInput.addEventListener('input', function() {
        localStorage.setItem('userName', this.value);
    });
}

function updateWelcome() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    
    if (name === '') {
        alert('Please enter a name');
        return;
    }
    
    updateWelcomeText(name);
    localStorage.setItem('userName', name);
}

function updateWelcomeText(name) {
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.textContent = `Hi ${name}, Welcome To Website`;
}

// Message form functionality
function initMessageForm() {
    const messageForm = document.getElementById('messageForm');
    
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        if (validateForm()) {
            displayFormOutput();
        }
    });
}

function validateForm() {
    let isValid = true;
    
    // Validate name
    const nama = document.getElementById('nama').value.trim();
    if (nama === '') {
        showError('namaError', 'Nama harus diisi');
        isValid = false;
    } else if (nama.length < 2) {
        showError('namaError', 'Nama minimal 2 karakter');
        isValid = false;
    }
    
    // Validate birth date
    const tanggalLahir = document.getElementById('tanggalLahir').value;
    if (tanggalLahir === '') {
        showError('tanggalLahirError', 'Tanggal lahir harus diisi');
        isValid = false;
    } else {
        // Check if date is not in the future
        const birthDate = new Date(tanggalLahir);
        const today = new Date();
        if (birthDate > today) {
            showError('tanggalLahirError', 'Tanggal lahir tidak boleh di masa depan');
            isValid = false;
        }
        
        // Check if person is not too old (more than 150 years)
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age > 150) {
            showError('tanggalLahirError', 'Tanggal lahir tidak valid');
            isValid = false;
        }
    }
    
    // Validate gender
    const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked');
    if (!jenisKelamin) {
        showError('jenisKelaminError', 'Jenis kelamin harus dipilih');
        isValid = false;
    }
    
    // Validate message
    const pesan = document.getElementById('pesan').value.trim();
    if (pesan === '') {
        showError('pesanError', 'Pesan harus diisi');
        isValid = false;
    } else if (pesan.length < 10) {
        showError('pesanError', 'Pesan minimal 10 karakter');
        isValid = false;
    } else if (pesan.length > 500) {
        showError('pesanError', 'Pesan maksimal 500 karakter');
        isValid = false;
    }
    
    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function displayFormOutput() {
    // Get form values
    const nama = document.getElementById('nama').value.trim();
    const tanggalLahir = document.getElementById('tanggalLahir').value;
    const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked').value;
    const pesan = document.getElementById('pesan').value.trim();
    
    // Format date
    const formattedDate = formatDate(tanggalLahir);
    
    // Update output display
    document.getElementById('outputNama').textContent = nama;
    document.getElementById('outputTanggalLahir').textContent = formattedDate;
    document.getElementById('outputJenisKelamin').textContent = jenisKelamin;
    document.getElementById('outputPesan').textContent = pesan;
    
    // Show success message
    showSuccessMessage();
    
    // Clear form
    document.getElementById('messageForm').reset();
    clearErrors();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function showSuccessMessage() {
    // Create and show temporary success message
    const successDiv = document.createElement('div');
    successDiv.textContent = 'Pesan berhasil dikirim!';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1001;
        font-weight: bold;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#successAnimation')) {
        const style = document.createElement('style');
        style.id = 'successAnimation';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(successDiv);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 300);
    }, 3000);
}

function updateCurrentTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta'
    };
    
    const formattedTime = now.toLocaleDateString('id-ID', options);
    const currentTimeElement = document.getElementById('currentTime');
    
    if (currentTimeElement) {
        currentTimeElement.textContent = formattedTime;
    }
}

// Smooth scrolling for anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Image lazy loading and error handling
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    // Alternative image sources as backup
    const alternativeImages = {
        'coffee-shop': 'https://cdn.pixabay.com/photo/2015/04/20/13/17/work-731198_960_720.jpg',
        'coffee-beans': 'https://cdn.pixabay.com/photo/2016/11/29/12/54/cafe-1869656_960_720.jpg',
        'coffee-brewing': 'https://cdn.pixabay.com/photo/2017/01/02/10/25/coffee-1944727_960_720.jpg',
        'coffee-atmosphere': 'https://cdn.pixabay.com/photo/2015/07/02/20/57/cafe-832143_960_720.jpg',
        'pastries': 'https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_960_720.jpg',
        'coffee-drinks': 'https://cdn.pixabay.com/photo/2016/11/29/04/17/coffee-1867429_960_720.jpg',
        'banner': 'https://cdn.pixabay.com/photo/2015/04/20/13/17/work-731198_960_720.jpg'
    };
    
    images.forEach((img, index) => {
        // Remove initial opacity for immediate loading
        img.style.opacity = '1';
        
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            
            // Determine alternative image based on alt text
            let altImage = alternativeImages['coffee-shop']; // default
            
            if (this.alt.includes('Coffee Beans') || this.alt.includes('Premium')) {
                altImage = alternativeImages['coffee-beans'];
            } else if (this.alt.includes('Brewing') || this.alt.includes('Artisan')) {
                altImage = alternativeImages['coffee-brewing'];
            } else if (this.alt.includes('Atmosphere') || this.alt.includes('Cozy')) {
                altImage = alternativeImages['coffee-atmosphere'];
            } else if (this.alt.includes('Pastries') || this.alt.includes('Snacks')) {
                altImage = alternativeImages['pastries'];
            } else if (this.alt.includes('Drinks') || this.alt.includes('Specialty')) {
                altImage = alternativeImages['coffee-drinks'];
            } else if (this.alt.includes('Banner') || this.alt.includes('About')) {
                altImage = alternativeImages['banner'];
            }
            
            this.src = altImage;
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            console.log('Image loaded successfully:', this.alt);
        });
    });
    
    // Add image hover effects for portfolio items
    const portfolioImages = document.querySelectorAll('.portfolio-item img');
    portfolioImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Contact form character counter
document.addEventListener('DOMContentLoaded', function() {
    const pesanTextarea = document.getElementById('pesan');
    if (pesanTextarea) {
        // Create character counter
        const counterDiv = document.createElement('div');
        counterDiv.style.cssText = `
            text-align: right;
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        `;
        counterDiv.id = 'characterCounter';
        pesanTextarea.parentNode.appendChild(counterDiv);
        
        // Update counter on input
        pesanTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 500;
            const counter = document.getElementById('characterCounter');
            
            counter.textContent = `${currentLength}/${maxLength} karakter`;
            
            if (currentLength > maxLength) {
                counter.style.color = '#e74c3c';
            } else if (currentLength > maxLength * 0.8) {
                counter.style.color = '#f39c12';
            } else {
                counter.style.color = '#666';
            }
        });
        
        // Trigger initial count
        pesanTextarea.dispatchEvent(new Event('input'));
    }
});

// Scroll to top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #8B4513;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#A0522D';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#8B4513';
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
}

// Initialize scroll to top when DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Portfolio image gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            
            // Create modal for image preview
            showImageModal(img.src, title, description);
        });
        
        // Add cursor pointer to indicate clickability
        item.style.cursor = 'pointer';
    });
});

function showImageModal(imageSrc, title, description) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
        cursor: pointer;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        cursor: default;
    `;
    
    modalContent.innerHTML = `
        <img src="${imageSrc}" alt="${title}" style="width: 100%; height: 400px; object-fit: cover;">
        <div style="padding: 20px;">
            <h3 style="color: #8B4513; margin-bottom: 10px; font-size: 1.5rem;">${title}</h3>
            <p style="color: #666; line-height: 1.6;">${description}</p>
            <button onclick="this.closest('.modal-overlay').remove()" style="
                margin-top: 15px;
                padding: 10px 20px;
                background-color: #8B4513;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                float: right;
            ">Close</button>
        </div>
    `;
    
    modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    modal.appendChild(modalContent);
    modal.className = 'modal-overlay';
    
    // Close modal when clicking overlay
    modal.addEventListener('click', function() {
        modal.remove();
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
    
    document.body.appendChild(modal);
}

// Form input animations
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 10px rgba(139, 69, 19, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Prevent form submission on Enter key in input fields (except textarea)
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.type !== 'submit') {
                e.preventDefault();
                // Focus next input
                const formElements = Array.from(this.form.elements);
                const currentIndex = formElements.indexOf(this);
                const nextElement = formElements[currentIndex + 1];
                
                if (nextElement && nextElement.type !== 'submit') {
                    nextElement.focus();
                }
            }
        });
    });
});
