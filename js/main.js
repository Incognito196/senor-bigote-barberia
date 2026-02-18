/* ==========================================
   SENOR BIGOTE BARBERIA - Main JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 2000);
    });

    // Fallback: remove preloader after 4s max
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 4000);

    // --- Custom Cursor ---
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    // Only enable on non-touch devices
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice && cursor && cursorFollower) {
        document.body.style.cursor = 'none';

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth follower with requestAnimationFrame
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .gallery-item, .barber-card, .service-card, input, select, textarea');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovering');
                cursorFollower.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovering');
                cursorFollower.classList.remove('hovering');
            });
        });

        // Click effect
        document.addEventListener('mousedown', () => {
            cursor.classList.add('clicking');
            cursorFollower.classList.add('clicking');
        });
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('clicking');
            cursorFollower.classList.remove('clicking');
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '0.5';
        });

        // Make sure all links/buttons also hide default cursor
        const style = document.createElement('style');
        style.textContent = 'a, button, input, select, textarea, .gallery-item, .barber-card, .service-card { cursor: none !important; }';
        document.head.appendChild(style);
    }

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // --- Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Scroll Reveal (Enhanced with blur-to-clear) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Counter Animation ---
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.ceil(current);
            }
        }, 40);
    }

    // --- Gallery Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentGalleryIndex = 0;

    const galleryImages = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        return { src: img.src, alt: img.alt };
    });

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentGalleryIndex = index;
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        lightboxImg.src = galleryImages[index].src;
        lightboxImg.alt = galleryImages[index].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

    document.querySelector('.lightbox-prev').addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        openLightbox(currentGalleryIndex);
    });

    document.querySelector('.lightbox-next').addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        openLightbox(currentGalleryIndex);
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
            openLightbox(currentGalleryIndex);
        }
        if (e.key === 'ArrowRight') {
            currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
            openLightbox(currentGalleryIndex);
        }
    });

    // --- Booking Form ---
    const bookingForm = document.getElementById('bookingForm');
    const bookingSuccess = document.getElementById('bookingSuccess');
    const bookAnother = document.getElementById('bookAnother');

    // Set minimum date to today
    const dateInput = document.getElementById('prefDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Pre-select barber from card clicks
    document.querySelectorAll('[data-barber]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const barber = e.currentTarget.getAttribute('data-barber');
            setTimeout(() => {
                document.getElementById('barberSelect').value = barber;
            }, 800);
        });
    });

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);

        // Get readable labels from select elements
        const barberSelect = document.getElementById('barberSelect');
        const serviceSelect = document.getElementById('serviceSelect');
        const barberName = barberSelect.options[barberSelect.selectedIndex].text;
        const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;

        // Format the date nicely
        const dateObj = new Date(data.preferredDate + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
        });

        // Build WhatsApp message
        const message = `Hey Señor Bigote! I'd like to book an appointment:\n\n` +
            `*Name:* ${data.clientName}\n` +
            `*Phone:* ${data.clientPhone}\n` +
            `*Barber:* ${barberName}\n` +
            `*Service:* ${serviceName}\n` +
            `*Date:* ${formattedDate}\n` +
            `*Time:* ${data.preferredTime}`;

        // Open WhatsApp with pre-filled message
        const whatsappURL = `https://wa.me/13472803188?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');

        // Show success message
        bookingForm.style.display = 'none';
        bookingSuccess.classList.add('show');
    });

    bookAnother.addEventListener('click', () => {
        bookingForm.reset();
        bookingForm.style.display = 'block';
        bookingSuccess.classList.remove('show');
    });

    // --- Parallax on Hero ---
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            if (window.scrollY < window.innerHeight) {
                const offset = window.scrollY * 0.3;
                heroBg.style.transform = `scale(1.1) translateY(${offset}px)`;
            }
        });
    }

    // --- Parallax on Video Interlude ---
    const videoBg = document.querySelector('.video-bg');
    if (videoBg) {
        window.addEventListener('scroll', () => {
            const section = document.querySelector('.video-interlude');
            if (!section) return;
            const rect = section.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const offset = (rect.top / window.innerHeight) * 40;
                videoBg.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
            }
        });
    }

    // --- Parallax on Storefront Banner ---
    const storefrontImg = document.querySelector('.storefront-banner img');
    if (storefrontImg) {
        window.addEventListener('scroll', () => {
            const section = document.querySelector('.storefront-banner');
            if (!section) return;
            const rect = section.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const offset = (rect.top / window.innerHeight) * 30;
                storefrontImg.style.transform = `translateY(${offset}px) scale(1.1)`;
            }
        });
    }

    // --- 3D Tilt on Barber Cards ---
    const barberCards = document.querySelectorAll('.barber-card');

    if (!isTouchDevice) {
        barberCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -5;
                const rotateY = (x - centerX) / centerX * 5;

                card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });
    }

    // --- Active nav link highlight ---
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    // --- Video Autoplay Handler ---
    const videos = document.querySelectorAll('.video-bg');
    const videoFallback = document.querySelector('.video-fallback');

    videos.forEach(video => {
        // Force muted (some browsers need this set via JS too)
        video.muted = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');

        // Try to play immediately
        const tryPlay = () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Autoplay blocked — show fallback poster image
                    if (videoFallback) {
                        videoFallback.style.display = 'block';
                    }
                });
            }
        };

        // Try on load, and also when it enters viewport
        if (video.readyState >= 2) {
            tryPlay();
        } else {
            video.addEventListener('loadeddata', tryPlay, { once: true });
        }

        // Also try on first user interaction (scroll/touch/click)
        const playOnInteraction = () => {
            tryPlay();
            document.removeEventListener('scroll', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('click', playOnInteraction);
        };
        document.addEventListener('scroll', playOnInteraction, { passive: true });
        document.addEventListener('touchstart', playOnInteraction, { passive: true });
        document.addEventListener('click', playOnInteraction);
    });

});
