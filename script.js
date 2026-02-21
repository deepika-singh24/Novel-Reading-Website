// ========================================
// NovelHub - Professional Novel Platform JavaScript
// ========================================

// ========================================
// PAGE NAVIGATION
// ========================================

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// ========================================
// TOAST NOTIFICATION
// ========================================

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========================================
// DARK MODE TOGGLE
// ========================================

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('themeIcon');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ========================================
// FONT SIZE CONTROLS (Reader Page)
// ========================================

let fontSize = 1.1;

function increaseFontSize() {
    fontSize += 0.1;
    document.getElementById('readerContent').style.fontSize = fontSize + 'rem';
}

function decreaseFontSize() {
    if (fontSize > 0.8) {
        fontSize -= 0.1;
        document.getElementById('readerContent').style.fontSize = fontSize + 'rem';
    }
}

// ========================================
// FAVOURITES AND READ LATER MANAGEMENT
// ========================================

let favourites = [];
let readLater = [];

function addToFavourites(title) {
    if (!favourites.includes(title)) {
        favourites.push(title);
        showToast('Added to favourites!');
        updateFavouritesDisplay();
    } else {
        showToast('Already in favourites!');
    }
}

function addToReadLater(title) {
    if (!readLater.includes(title)) {
        readLater.push(title);
        showToast('Added to Read Later!');
        updateReadLaterDisplay();
    } else {
        showToast('Already in Read Later!');
    }
}

function removeFromFavourites(title) {
    favourites = favourites.filter(item => item !== title);
    showToast('Removed from favourites!');
    updateFavouritesDisplay();
}

function removeFromReadLater(title) {
    readLater = readLater.filter(item => item !== title);
    showToast('Removed from Read Later!');
    updateReadLaterDisplay();
}

function updateFavouritesDisplay() {
    const grid = document.getElementById('favouritesGrid');
    
    if (favourites.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <h3>No favourites yet</h3>
                <p>Start adding novels to your favourites to see them here!</p>
                <button class="btn btn-primary" onclick="showPage('novels')">Browse Novels</button>
            </div>
        `;
    } else {
        grid.innerHTML = favourites.map(title => `
            <div class="col-md-4">
                <div class="novel-card">
                    <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" alt="${title}">
                    <div class="novel-card-body">
                        <h5>${title}</h5>
                        <p class="author">by Author Name</p>
                        <div class="rating">⭐⭐⭐⭐⭐ 4.5</div>
                        <button class="btn btn-sm btn-danger mt-2" onclick="removeFromFavourites('${title}')">
                            <i class="fas fa-times"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function updateReadLaterDisplay() {
    const grid = document.getElementById('readLaterGrid');
    
    if (readLater.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bookmark"></i>
                <h3>No books saved</h3>
                <p>Add novels to your Read Later list to access them quickly!</p>
                <button class="btn btn-primary" onclick="showPage('novels')">Browse Novels</button>
            </div>
        `;
    } else {
        grid.innerHTML = readLater.map(title => `
            <div class="col-md-4">
                <div class="novel-card">
                    <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" alt="${title}">
                    <div class="novel-card-body">
                        <h5>${title}</h5>
                        <p class="author">by Author Name</p>
                        <div class="rating">⭐⭐⭐⭐⭐ 4.5</div>
                        <button class="btn btn-sm btn-primary mt-2 me-2" onclick="showPage('reader')">
                            <i class="fas fa-book-open"></i> Read Now
                        </button>
                        <button class="btn btn-sm btn-danger mt-2" onclick="removeFromReadLater('${title}')">
                            <i class="fas fa-times"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// ========================================
// ADMIN PANEL SECTION TOGGLE
// ========================================

function showAdminSection(sectionId) {
    // Hide all admin sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Remove active class from all menu items
    document.querySelectorAll('.admin-menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById('admin-' + sectionId).style.display = 'block';
    
    // Add active class to clicked menu item
    event.target.closest('.admin-menu-item').classList.add('active');
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchNovels');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const novelCards = document.querySelectorAll('#novelsGrid .col-md-4');
            
            novelCards.forEach(card => {
                const title = card.querySelector('h5').textContent.toLowerCase();
                const author = card.querySelector('.author').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || author.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// ========================================
// INTERSECTION OBSERVER (Scroll Animation)
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease';
        }
    });
}, observerOptions);

// Observe all cards for scroll animation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.novel-card, .genre-card, .author-card').forEach(card => {
        observer.observe(card);
    });
});

// ========================================
// READING PROGRESS (In-Memory Storage)
// ========================================

let readingProgress = {
    chapter: 1,
    scrollPosition: 0
};

window.addEventListener('beforeunload', function() {
    if (document.getElementById('reader').classList.contains('active')) {
        readingProgress.scrollPosition = window.scrollY;
    }
});

// ========================================
// ICON BUTTON TOGGLE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.icon-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
});

// ========================================
// BOOTSTRAP TOOLTIPS INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// ========================================
// CAROUSEL AUTO-PLAY CONTROL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#trendingCarousel');
    if (carousel) {
        // Bootstrap carousel is already initialized via data attributes
        // Additional custom controls can be added here if needed
    }
});

// ========================================
// FORM VALIDATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Login Form
    const loginForm = document.querySelector('#login form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Login successful!');
            showPage('home');
        });
    }
    
    // Signup Form
    const signupForm = document.querySelector('#signup form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Account created successfully!');
            showPage('home');
        });
    }
    
    // Admin Add Novel Form
    const addNovelForm = document.querySelector('#admin-add-novel form');
    if (addNovelForm) {
        addNovelForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Novel added successfully!');
            this.reset();
        });
    }
});

// ========================================
// FILTER FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Genre filters
    const genreCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    genreCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Filter logic can be implemented here
            console.log('Filter applied:', this.value);
        });
    });
    
    // Rating filters
    const ratingRadios = document.querySelectorAll('.filter-group input[type="radio"]');
    ratingRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Filter logic can be implemented here
            console.log('Rating filter applied:', this.id);
        });
    });
    
    // Sort dropdown
    const sortSelect = document.querySelector('.filter-group select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // Sort logic can be implemented here
            console.log('Sort applied:', this.value);
        });
    }
});

// ========================================
// PAGINATION FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const paginationLinks = document.querySelectorAll('.pagination .page-link');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all
            document.querySelectorAll('.pagination .page-item').forEach(item => {
                item.classList.remove('active');
            });
            // Add active class to clicked
            this.closest('.page-item').classList.add('active');
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});

// ========================================
// CHAPTER NAVIGATION
// ========================================

function goToChapter(chapterNumber) {
    showPage('reader');
    showToast(`Opening Chapter ${chapterNumber}`);
    window.scrollTo(0, 0);
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    }
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Format rating display
function formatRating(rating) {
    const stars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    let html = '';
    
    for (let i = 0; i < stars; i++) {
        html += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalf) {
        html += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        html += '<i class="far fa-star"></i>';
    }
    
    return html + ' ' + rating;
}

// Truncate text
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

// Generate random color
function getRandomColor() {
    const colors = ['#6C63FF', '#FF6584', '#4ECDC4', '#FFD93D', '#6BCF7F'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ========================================
// CONSOLE LOG
// ========================================

console.log('%cNovelHub', 'color: #6C63FF; font-size: 24px; font-weight: bold;');
console.log('%cProfessional Novel Reading Platform', 'color: #666; font-size: 14px;');
console.log('Version 1.0.0');
console.log('Developed with ❤️ using HTML, CSS, JavaScript, and Bootstrap');

// ========================================
// EXPORT FUNCTIONS (if using modules)
// ========================================

// For potential future module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showPage,
        showToast,
        toggleDarkMode,
        addToFavourites,
        addToReadLater,
        formatRating,
        truncateText
    };
}