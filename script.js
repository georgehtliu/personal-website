// Background Stars
(function() {
  const starsContainer = document.querySelector('.stars-container');
  if (!starsContainer) return;
  
  const starCount = 50; // Number of stars to generate
  const starShapes = [
    // 5-pointed star
    (size) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
    </svg>`,
    // 4-pointed star
    (size) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor"/>
    </svg>`,
    // Sparkle/6-pointed star
    (size) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" fill="currentColor"/>
      <circle cx="12" cy="10" r="2" fill="currentColor"/>
    </svg>`,
    // Twinkle star
    (size) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0L13.5 7.5L21 9L13.5 10.5L12 18L10.5 10.5L3 9L10.5 7.5L12 0Z" fill="currentColor"/>
      <path d="M12 6L12.75 8.25L15 9L12.75 9.75L12 12L11.25 9.75L9 9L11.25 8.25L12 6Z" fill="currentColor"/>
    </svg>`,
    // Simple 5-pointed outline
    (size) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
    </svg>`,
    // Small sparkle
    (size) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13 10L21 11L13 12L12 20L11 12L3 11L11 10L12 2Z" fill="currentColor"/>
    </svg>`
  ];
  
  // Generate random stars
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random size between 8px and 24px
    const size = Math.random() * 16 + 8;
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Random shape
    const shapeIndex = Math.floor(Math.random() * starShapes.length);
    star.innerHTML = starShapes[shapeIndex](size);
    
    // Random opacity
    const opacity = Math.random() * 0.6 + 0.3;
    
    star.style.left = x + '%';
    star.style.top = y + '%';
    star.style.opacity = opacity;
    star.style.color = 'var(--text-secondary)';
    
    starsContainer.appendChild(star);
  }
})();

// Typewriter Effect
(function() {
  const nameText = document.querySelector('.name-text');
  const cursor = document.querySelector('.typewriter-cursor');
  const fullText = 'george liu';
  
  if (!nameText) return;
  
  const respectsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (respectsReducedMotion) {
    // If reduced motion, just show the text immediately
    nameText.textContent = fullText;
    if (cursor) cursor.style.display = 'none';
  } else {
    // Typewriter effect
    let currentIndex = 0;
    const typingSpeed = 120; // milliseconds per character
    
    function typeCharacter() {
      if (currentIndex < fullText.length) {
        nameText.textContent += fullText[currentIndex];
        currentIndex++;
        setTimeout(typeCharacter, typingSpeed);
      } else {
        // Remove cursor after typing is complete
        if (cursor) {
          setTimeout(() => {
            cursor.style.display = 'none';
          }, 500);
        }
      }
    }
    
    // Start typing after a short delay
    setTimeout(typeCharacter, 300);
  }
})();

// Theme Toggle
(function() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  
  // Get saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  
  // Update icon based on theme
  function updateIcon(theme) {
    const icon = themeToggle.querySelector('.theme-icon');
    if (theme === 'light') {
      // Moon icon for switching to dark
      icon.innerHTML = `
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      `;
    } else {
      // Sun icon for switching to light
      icon.innerHTML = `
        <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      `;
    }
  }
  
  updateIcon(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
  });
})();

// Respect reduced motion preferences
(function() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  function handleReducedMotion() {
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }
  
  handleReducedMotion();
  prefersReducedMotion.addEventListener('change', handleReducedMotion);
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Fade in on load
(function() {
  const elements = document.querySelectorAll('.bio, .timeline-item, .hero-name');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 50);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
    observer.observe(el);
  });
})();

// Animated ball cursor
(function() {
  const cursor = document.querySelector('.animated-cursor');
  const contentContainer = document.querySelector('.content-container');
  if (!cursor || !contentContainer) return;
  
  const respectsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (respectsReducedMotion) {
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let isInsideContentBox = false;
  let targetScrollY = 0;
  let currentScrollY = 0;
  
  // Function to check if point is inside content box
  function isPointInsideBox(x, y) {
    const rect = contentContainer.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }
  
  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Check if cursor is inside content box
    const wasInside = isInsideContentBox;
    isInsideContentBox = isPointInsideBox(mouseX, mouseY);
    
    // Update cursor visibility and body cursor style
    if (isInsideContentBox !== wasInside) {
      if (isInsideContentBox) {
        cursor.style.display = 'none';
        document.body.classList.add('cursor-inside-content');
      } else {
        cursor.style.display = 'block';
        document.body.classList.remove('cursor-inside-content');
      }
    }
    
    // Calculate target scroll position based on cursor vertical position
    if (!respectsReducedMotion) {
      const viewportHeight = window.innerHeight;
      const scrollableHeight = document.documentElement.scrollHeight - viewportHeight;
      
      if (scrollableHeight > 0) {
        // Map cursor Y (0 to viewportHeight) to scroll position (0 to scrollableHeight)
        targetScrollY = (mouseY / viewportHeight) * scrollableHeight;
      }
    }
  });
  
  // Animate cursor following mouse
  function animateCursor() {
    // Only animate if cursor is visible (outside content box)
    if (!isInsideContentBox) {
      // Smooth interpolation
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
    }
    
    // Smooth scroll to match cursor vertical position
    if (!respectsReducedMotion) {
      currentScrollY += (targetScrollY - currentScrollY) * 0.1;
      window.scrollTo(0, currentScrollY);
    }
    
    requestAnimationFrame(animateCursor);
  }
  
  // Initialize scroll position
  currentScrollY = window.scrollY;
  targetScrollY = window.scrollY;
  
  animateCursor();
  
  // Export isInsideContentBox for dog script
  window.isInsideContentBox = () => isInsideContentBox;
  window.getContentBoxBounds = () => contentContainer.getBoundingClientRect();
})();

// Dog follows cursor (ball)
(function() {
  const dog = document.querySelector('.dog-img');
  const contentContainer = document.querySelector('.content-container');
  if (!dog || !contentContainer) return;
  
  const respectsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (respectsReducedMotion) {
    dog.style.display = 'none';
    return;
  }
  
  let mouseX = 0;
  let mouseY = 0;
  let dogX = 0;
  let dogY = 0;
  let prevDogX = 0;
  
  // Initialize dog position (top left corner)
  dogX = 90; // Half of dog width (180px / 2)
  dogY = 90; // Half of dog height (180px / 2)
  prevDogX = dogX;
  dog.style.left = (dogX - 90) + 'px';
  dog.style.top = (dogY - 90) + 'px';
  
  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Function to check if point is inside content box
  function isPointInsideBox(x, y, padding = 0) {
    const rect = contentContainer.getBoundingClientRect();
    return x >= (rect.left - padding) && x <= (rect.right + padding) && 
           y >= (rect.top - padding) && y <= (rect.bottom + padding);
  }
  
  // Function to constrain point outside content box
  function constrainOutsideBox(x, y) {
    const rect = contentContainer.getBoundingClientRect();
    const padding = 90; // Dog radius + some margin (dog is now 180px)
    
    // If dog is inside or too close to box, push it out
    if (isPointInsideBox(x, y, padding)) {
      // Find closest edge and push dog outside
      const distToLeft = Math.abs(x - (rect.left - padding));
      const distToRight = Math.abs(x - (rect.right + padding));
      const distToTop = Math.abs(y - (rect.top - padding));
      const distToBottom = Math.abs(y - (rect.bottom + padding));
      
      const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
      
      if (minDist === distToLeft) {
        x = rect.left - padding;
      } else if (minDist === distToRight) {
        x = rect.right + padding;
      } else if (minDist === distToTop) {
        y = rect.top - padding;
      } else {
        y = rect.bottom + padding;
      }
    }
    
    return { x, y };
  }
  
  // Animate dog following cursor
  function animateDog() {
    // Calculate distance to cursor
    const dx = mouseX - dogX;
    const dy = mouseY - dogY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Only move if cursor is far enough away
    if (distance > 5) {
      // Smooth interpolation toward cursor (3x slower)
      const speed = Math.min(distance * 0.05, 6.67);
      dogX += (dx / distance) * speed;
      dogY += (dy / distance) * speed;
      
      // Constrain dog outside content box
      const constrained = constrainOutsideBox(dogX, dogY);
      dogX = constrained.x;
      dogY = constrained.y;
      
      // Flip dog horizontally so it always faces the ball/cursor
      // Dog faces right by default, so flip when cursor is to the left
      if (mouseX < dogX) {
        // Cursor is to the left - flip horizontally to face left
        dog.style.transform = 'scaleX(-1)';
      } else {
        // Cursor is to the right - normal orientation (facing right)
        dog.style.transform = 'scaleX(1)';
      }
      prevDogX = dogX;
      
      dog.style.left = (dogX - 90) + 'px';
      dog.style.top = (dogY - 90) + 'px';
    }
    
    requestAnimationFrame(animateDog);
  }
  
  animateDog();
})();
