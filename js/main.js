/* Mage Optique & Services - Official Core Interactions */


/* --- Header Scroll & Mobile Drawer --- */
function initNavigation() {
    const header = document.querySelector('.top-header');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenu = document.querySelector('.close-menu');

    // Scroll class toggle
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled', 'glass-effect');
        } else {
            header.classList.remove('scrolled', 'glass-effect');
        }
    });

    // Mobile menu open
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            mobileOverlay.classList.add('show');
        });
    }

    // Mobile menu close
    const closeDrawer = () => {
        mobileMenu.classList.remove('open');
        mobileOverlay.classList.remove('show');
    };

    if (closeMenu) {
        closeMenu.addEventListener('click', closeDrawer);
    }
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeDrawer);
    }

    // Dynamic luxury drawer menu contact details footer
    if (mobileMenu && !document.getElementById('mobile-menu-footer')) {
        const footerDiv = document.createElement('div');
        footerDiv.id = 'mobile-menu-footer';
        footerDiv.style.cssText = 'border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; margin-top: auto; font-size: 0.8rem; color: rgba(255,255,255,0.4); line-height: 1.6; text-align: left;';
        footerDiv.innerHTML = `
            <div style="font-weight: 700; color: #C5A059; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.85rem;">Mage Optique & Services</div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;"><span class="material-symbols-outlined" style="font-size: 14px; color: #C5A059;">location_on</span> Dakar, Ouest Foire</div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;"><span class="material-symbols-outlined" style="font-size: 14px; color: #C5A059;">call</span> +221 78 681 15 26</div>
            <div style="display: flex; align-items: center; gap: 8px;"><span class="material-symbols-outlined" style="font-size: 14px; color: #C5A059;">mail</span> contact@mageoptique.fr</div>
        `;
        mobileMenu.appendChild(footerDiv);
    }
}

/* --- 3D Hover Tilt Effects --- */
function initTiltCards() {
    const tiltElements = document.querySelectorAll('.product-card, .bento-card');

    tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position inside element
            const y = e.clientY - rect.top;  // y position inside element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate tilt degrees (max 6deg)
            const rotateY = ((x - centerX) / centerX) * 6;
            const rotateX = -((y - centerY) / centerY) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.06)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            card.style.boxShadow = '';
        });
    });
}

/* --- Multi-step Appointment Booking Concierge --- */
function initBookingWidget() {
    console.log("Mage Optique - Concierge Booking Initialized Inline.");
}

function sendBookingEmail(data) {
    const emailTo = "mageopticien@gmail.com";
    const subject = encodeURIComponent(`Demande de Consultation - Mage Optique & Services (${data.name})`);
    
    const dateFormatted = new Date(data.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const body = encodeURIComponent(
`Bonjour Mage Optique & Services,

Je souhaite réserver une consultation d'optique avec les détails suivants :

📍 PRESTATION : ${data.service}
📅 DATE : ${dateFormatted}
⏰ HEURE : ${data.time}

👤 CLIENT : ${data.name}
📞 TÉLÉPHONE : ${data.phone}
✉️ E-MAIL : ${data.email}

Merci de bien vouloir me confirmer la disponibilité de ce créneau.

Cordialement,
${data.name}`
    );

    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
}

function downloadTicketAsText(data) {
    const dateFormatted = new Date(data.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const textContent = 
`==================================================
              MAGE OPTIQUE & SERVICES             
        BILLET DE CONSULTATION EXCLUSIVE          
==================================================

📍 PRESTATION : ${data.service}
📅 DATE       : ${dateFormatted}
⏰ HEURE      : ${data.time}

--------------------------------------------------
👤 INFORMATIONS CLIENT :
- Nom : ${data.name}
- Email : ${data.email}
- Tél : ${data.phone}

--------------------------------------------------
📍 ADRESSE DU SALON :
Ouest Foire, Dakar, Sénégal
Téléphone : +221 78 681 15 26
E-mail : contact@mageoptique.fr

* Présentez ce billet à votre arrivée au salon.
==================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Billet-Rdv-Mage-Optique-${data.name.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadTicketImage(data) {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 500;
    tempCanvas.height = 640;
    const tempCtx = tempCanvas.getContext('2d');

    // 1. Draw elegant background gradient
    const grad = tempCtx.createLinearGradient(0, 0, 0, tempCanvas.height);
    grad.addColorStop(0, '#121212');
    grad.addColorStop(1, '#2c3e50');
    tempCtx.fillStyle = grad;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // 2. Draw luxury Double Gold Border
    tempCtx.strokeStyle = '#C5A059';
    tempCtx.lineWidth = 2;
    tempCtx.strokeRect(20, 20, tempCanvas.width - 40, tempCanvas.height - 40);
    tempCtx.strokeRect(26, 26, tempCanvas.width - 52, tempCanvas.height - 52);

    // 3. Header branding text
    tempCtx.fillStyle = '#C5A059';
    tempCtx.font = 'bold 20px serif';
    tempCtx.textAlign = 'center';
    tempCtx.fillText('MAGE OPTIQUE & SERVICES', tempCanvas.width / 2, 70);
    
    tempCtx.fillStyle = '#ffffff';
    tempCtx.font = '10px sans-serif';
    tempCtx.fillText('BILLET DE CONSULTATION EXCLUSIVE', tempCanvas.width / 2, 95);

    // 4. Ticket Divider
    tempCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    tempCtx.lineWidth = 1;
    tempCtx.beginPath();
    tempCtx.moveTo(40, 120);
    tempCtx.lineTo(tempCanvas.width - 40, 120);
    tempCtx.stroke();

    // 5. Prestation details
    tempCtx.fillStyle = '#C5A059';
    tempCtx.font = 'bold 13px sans-serif';
    tempCtx.fillText(data.service.toUpperCase(), tempCanvas.width / 2, 165);

    const dateFormatted = new Date(data.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    tempCtx.fillStyle = '#ffffff';
    tempCtx.font = 'italic 18px serif';
    tempCtx.fillText(dateFormatted, tempCanvas.width / 2, 215);

    tempCtx.fillStyle = '#C5A059';
    tempCtx.font = 'bold 36px sans-serif';
    tempCtx.fillText(data.time, tempCanvas.width / 2, 275);

    // 6. Another Divider
    tempCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    tempCtx.beginPath();
    tempCtx.moveTo(40, 320);
    tempCtx.lineTo(tempCanvas.width - 40, 320);
    tempCtx.stroke();

    // 7. Client Details
    tempCtx.textAlign = 'left';
    tempCtx.fillStyle = '#ffffff';
    tempCtx.font = '14px sans-serif';
    
    let yPos = 370;
    tempCtx.fillText(`CLIENT :  ${data.name.toUpperCase()}`, 60, yPos);
    tempCtx.fillText(`E-MAIL :  ${data.email}`, 60, yPos + 35);
    tempCtx.fillText(`TÉL :     ${data.phone}`, 60, yPos + 70);

    // 8. Footer instructions
    tempCtx.textAlign = 'center';
    tempCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    tempCtx.font = '9px sans-serif';
    tempCtx.fillText('VEUILLEZ PRÉSENTER CE BILLET LORS DE VOTRE VENUE AU SALON', tempCanvas.width / 2, 530);
    
    tempCtx.fillStyle = '#C5A059';
    tempCtx.font = 'italic 12px serif';
    tempCtx.fillText('Ouest Foire, Dakar, Sénégal — +221 78 681 15 26', tempCanvas.width / 2, 570);

    // 9. Generate download trigger
    try {
        const url = tempCanvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `Billet-Rdv-Mage-Optique-${data.name.replace(/\s+/g, '-')}.png`;
        downloadLink.href = url;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    } catch (err) {
        console.error("CORS block or failure during PNG download, falling back to TXT:", err);
        downloadTicketAsText(data);
    }
}

function generateBookingTicket(data) {
    const ticketDetails = document.getElementById('ticket-details');
    if (!ticketDetails) return;

    // Formatting date
    const dateFormatted = new Date(data.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    ticketDetails.innerHTML = `
        <div style="font-size: 1.125rem; font-weight: 600; color: #C5A059; margin-bottom: 20px;">
            ${data.service}
        </div>
        <div style="margin-bottom: 12px; font-family: 'Playfair Display'; font-size: 1.25rem;">
            ${dateFormatted}
        </div>
        <div style="font-size: 1.5rem; font-weight: 700; color: #FFFFFF; margin-bottom: 24px;">
            ${data.time}
        </div>
        <div class="ticket-divider"></div>
        <div style="font-size: 0.875rem; text-align: left; opacity: 0.8; line-height: 1.8; margin-bottom: 24px;">
            <p><strong>Client :</strong> ${data.name}</p>
            <p><strong>Email :</strong> ${data.email}</p>
            <p><strong>Tél :</strong> ${data.phone}</p>
        </div>
        <div class="ticket-divider"></div>
        <div style="font-size: 0.85rem; font-style: italic; color: #C5A059; line-height: 1.6; text-align: center; margin-top: 16px;">
            Votre rendez-vous a été pris en charge. Mage Optique &amp; Services va vous appeler pour confirmer votre rendez-vous. Merci !
        </div>
    `;
}

function bookingEmailSentNotice() {
    console.log("Demande de consultation envoyée par e-mail.");
}

/* --- Live Webcam & Selfie Virtual Try-On System --- */
function initVirtualTryOn() {
    const video = document.getElementById('tryon-video');
    const canvas = document.getElementById('tryon-canvas');
    const startCamBtn = document.getElementById('start-cam-btn');
    const uploadBtn = document.getElementById('upload-photo-btn');
    const fallbackPanel = document.querySelector('.tryon-fallback');
    const tryonFrames = document.querySelectorAll('.tryon-frame-select');
    const controlsPanel = document.getElementById('tryon-controls-panel');
    const viewfinder = document.getElementById('tryon-viewfinder');
    const flashOverlay = document.getElementById('tryon-flash');

    // Controls sliders & buttons
    const scaleSlider = document.getElementById('tryon-scale');
    const rotateSlider = document.getElementById('tryon-rotate');
    const resetBtn = document.getElementById('tryon-reset-btn');
    const snapBtn = document.getElementById('tryon-snap-btn');
    
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let streamRef = null;
    let tryonImage = new Image();
    let currentFrameImg = new Image();
    let isWebcam = false;

    // Eyewear layout configuration
    const BASE_WIDTH = 240;
    const BASE_HEIGHT = 100;

    // Eyewear placement properties
    let glassesX = 320; // Default center
    let glassesY = 220; // Default center slightly above middle
    let glassesScale = 1.0;
    let glassesRotation = 0; // in degrees

    // Drag-and-drop state
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;

    // Default eyewear overlay based on canvas data attribute or URL param or fallback
    let defaultFrameSrc = canvas.getAttribute('data-default-frame');
    if (!defaultFrameSrc) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId && typeof getProducts === 'function') {
            const products = getProducts();
            const product = products.find(p => p.id === productId);
            if (product && product.image) {
                defaultFrameSrc = product.image;
            }
        }
    }
    
    currentFrameImg.src = defaultFrameSrc || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3K5JpTrNm2QbFVz-XrDEchlX_NH9yitB3gtzPp9MMivAuLh5ufrYysvxnE4e6sbuLZ6N7qjbDb0Gue54NA4As6P1mcklFPT2qa3juAuSrykv6xyaG5yIyz27_lEY3nBPSSmB2qBar2QspY6g1t9qZI0ADN32LE5ti79cDZbI58ldJsJxmcm1WXVPMI9QEpYnL_gFnWPtHKiHyO1-mzDJ6p2Xfl04_ZxPSKsb7HdvmBSVj4k-sQWk6p5v_HGM8gsmvhbH4YfINmRg';

    // Map client coordinates to absolute canvas coordinate system for responsiveness
    function getCanvasCoords(e) {
        const rect = canvas.getBoundingClientRect();
        let clientX = 0, clientY = 0;

        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        return {
            x: ((clientX - rect.left) / rect.width) * canvas.width,
            y: ((clientY - rect.top) / rect.height) * canvas.height
        };
    }

    // Determine if cursor coordinates is inside the glasses boundaries
    function isInsideGlasses(cx, cy) {
        const w = BASE_WIDTH * glassesScale;
        const h = BASE_HEIGHT * glassesScale;
        return (
            cx >= glassesX - w/2 &&
            cx <= glassesX + w/2 &&
            cy >= glassesY - h/2 &&
            cy <= glassesY + h/2
        );
    }

    // Drag-and-drop Touch/Mouse Handlers
    function handleStart(e) {
        const coords = getCanvasCoords(e);
        if (isInsideGlasses(coords.x, coords.y)) {
            isDragging = true;
            dragStartX = coords.x - glassesX;
            dragStartY = coords.y - glassesY;
            canvas.style.cursor = 'grabbing';
            
            // Hide the viewfinder guidelines once user starts interacting!
            if (viewfinder && viewfinder.classList.contains('active')) {
                viewfinder.style.opacity = '0';
                setTimeout(() => viewfinder.classList.remove('active'), 500);
            }
            e.preventDefault();
        }
    }

    function handleMove(e) {
        const coords = getCanvasCoords(e);
        
        if (isDragging) {
            glassesX = coords.x - dragStartX;
            glassesY = coords.y - dragStartY;

            // Restrict bounds slightly to keep glasses on canvas
            glassesX = Math.max(20, Math.min(canvas.width - 20, glassesX));
            glassesY = Math.max(20, Math.min(canvas.height - 20, glassesY));

            if (!isWebcam && tryonImage.src) {
                drawStatic();
            }
            e.preventDefault();
        } else {
            // Hover cursor feed-back
            if (isInsideGlasses(coords.x, coords.y)) {
                canvas.style.cursor = 'grab';
            } else {
                canvas.style.cursor = 'default';
            }
        }
    }

    function handleEnd() {
        isDragging = false;
        canvas.style.cursor = 'default';
    }

    // Register canvas events
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseleave', handleEnd);

    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd);

    // Zoom and rotation slider hooks
    if (scaleSlider) {
        scaleSlider.addEventListener('input', (e) => {
            glassesScale = parseFloat(e.target.value);
            if (!isWebcam && tryonImage.src) {
                drawStatic();
            }
        });
    }

    if (rotateSlider) {
        rotateSlider.addEventListener('input', (e) => {
            glassesRotation = parseInt(e.target.value);
            if (!isWebcam && tryonImage.src) {
                drawStatic();
            }
        });
    }

    // Reset layout position
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            glassesX = canvas.width / 2;
            glassesY = canvas.height / 2 - 20;
            glassesScale = 1.0;
            glassesRotation = 0;
            
            if (scaleSlider) scaleSlider.value = "1.0";
            if (rotateSlider) rotateSlider.value = "0";

            if (viewfinder) {
                viewfinder.style.opacity = '1';
                viewfinder.classList.add('active');
            }

            if (!isWebcam && tryonImage.src) {
                drawStatic();
            }
        });
    }

    // Start live stream webcam feed
    if (startCamBtn && video) {
        startCamBtn.addEventListener('click', async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 640, height: 480, facingMode: 'user' }
                });
                
                streamRef = stream;
                video.srcObject = stream;
                video.play();
                
                isWebcam = true;
                fallbackPanel.style.display = 'none';
                if (controlsPanel) controlsPanel.classList.add('active');
                if (viewfinder) viewfinder.classList.add('active');
                
                canvas.width = 640;
                canvas.height = 480;
                
                // Launch draw animation loop
                drawLoop();
            } catch (err) {
                console.error("Camera access denied or error:", err);
                alert("Impossible d'accéder à la caméra. Veuillez utiliser l'option d'import de photo.");
            }
        });
    }

    // Import portait photo
    if (uploadBtn) {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        
        uploadBtn.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    tryonImage = new Image();
                    tryonImage.src = event.target.result;
                    tryonImage.onload = () => {
                        isWebcam = false;
                        fallbackPanel.style.display = 'none';
                        if (controlsPanel) controlsPanel.classList.add('active');
                        if (viewfinder) viewfinder.classList.add('active');
                        
                        // Close camera thread if active
                        if (streamRef) {
                            streamRef.getTracks().forEach(track => track.stop());
                            video.srcObject = null;
                        }

                        canvas.width = 640;
                        canvas.height = 480;
                        
                        drawStatic();
                    };
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Frame selectors items click
    tryonFrames.forEach(frameCard => {
        frameCard.addEventListener('click', () => {
            tryonFrames.forEach(f => f.classList.remove('selected'));
            frameCard.classList.add('selected');
            
            const frameSrc = frameCard.getAttribute('data-frame-img');
            currentFrameImg = new Image();
            currentFrameImg.src = frameSrc;

            currentFrameImg.onload = () => {
                if (!isWebcam && tryonImage.src) {
                    drawStatic();
                }
            };
        });
    });

    // Realtime animation loop
    function drawLoop() {
        if (!isWebcam) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw mirror video frame (reverse scale to simulate mirror view)
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();

        // Draw overlay glasses
        drawEyewearOverlay();

        requestAnimationFrame(drawLoop);
    }

    // Static rendering
    function drawStatic() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tryonImage, 0, 0, canvas.width, canvas.height);
        drawEyewearOverlay();
    }

    // Render eyewear with active rotation and scaling factors
    function drawEyewearOverlay() {
        ctx.save();
        
        // Offset center rotation origin
        ctx.translate(glassesX, glassesY);
        ctx.rotate((glassesRotation * Math.PI) / 180);

        const w = BASE_WIDTH * glassesScale;
        const h = BASE_HEIGHT * glassesScale;

        ctx.drawImage(currentFrameImg, -w/2, -h/2, w, h);
        ctx.restore();
    }

    // Snapshot Capture click flow (flash animation + automatic JPG download)
    if (snapBtn) {
        snapBtn.addEventListener('click', () => {
            // Camera flash effect
            if (flashOverlay) {
                flashOverlay.classList.remove('flash-active');
                void flashOverlay.offsetWidth; // Reflow reset
                flashOverlay.classList.add('flash-active');
            }

            // Create temporary canvas to compile static image without guides
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tempCtx = tempCanvas.getContext('2d');

            // Draw mirrored camera feed or background image
            if (isWebcam) {
                tempCtx.save();
                tempCtx.scale(-1, 1);
                tempCtx.drawImage(video, -tempCanvas.width, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.restore();
            } else if (tryonImage.src) {
                tempCtx.drawImage(tryonImage, 0, 0, tempCanvas.width, tempCanvas.height);
            } else {
                tempCtx.fillStyle = '#121212';
                tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            }

            // Draw current eyewear overlay at correct coordinates
            tempCtx.save();
            tempCtx.translate(glassesX, glassesY);
            tempCtx.rotate((glassesRotation * Math.PI) / 180);
            const w = BASE_WIDTH * glassesScale;
            const h = BASE_HEIGHT * glassesScale;
            tempCtx.drawImage(currentFrameImg, -w/2, -h/2, w, h);
            tempCtx.restore();

            // Premium brand watermark signature
            tempCtx.fillStyle = 'rgba(255, 255, 255, 0.45)';
            tempCtx.font = '300 12px "Hanken Grotesk", sans-serif';
            tempCtx.fillText('MAGE OPTIQUE & SERVICES — EXPERTISE DE PRESTIGE', 24, tempCanvas.height - 24);

            try {
                // Export and trigger download link
                const dataUrl = tempCanvas.toDataURL('image/jpeg', 0.95);
                const downloadLink = document.createElement('a');
                downloadLink.download = 'Mage-Optique-Signature-Essai-Virtuel.jpg';
                downloadLink.href = dataUrl;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            } catch (err) {
                console.error("Failed to export portrait snap:", err);
                alert("Impossible de télécharger le portrait en raison de restrictions cross-origin sur l'image source. Essayez avec un autre modèle.");
            }
        });
    }
}

/* --- Executive Cart & Favorites State-Management & UI Injection --- */

// Local Storage Keys
const CART_KEY = 'mage_optique_services_cart';
const FAVS_KEY = 'mage_optique_services_favs';
// DB_KEY is defined globally in js/db.js

// Shared Helper: Get full product details by ID
function findProductById(id) {
    if (typeof getProducts === 'function') {
        const products = getProducts();
        return products.find(p => p.id === id);
    } else {
        // Fallback if getProducts is loaded separately or from localStorage
        const data = localStorage.getItem(DB_KEY);
        if (data) {
            const products = JSON.parse(data);
            return products.find(p => p.id === id);
        }
    }
    return null;
}

// Read / Write Cart
function getCart() {
    try {
        const data = localStorage.getItem(CART_KEY);
        const parsed = data ? JSON.parse(data) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.error("Error reading cart from localStorage:", e);
        return [];
    }
}
function saveCart(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
        console.error("Error saving cart to localStorage:", e);
    }
    updateHeaderBadges();
    renderCart();
}

// Read / Write Favorites
function getFavorites() {
    try {
        const data = localStorage.getItem(FAVS_KEY);
        const parsed = data ? JSON.parse(data) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.error("Error reading favorites from localStorage:", e);
        return [];
    }
}
function saveFavorites(favs) {
    localStorage.setItem(FAVS_KEY, JSON.stringify(favs));
    updateHeaderBadges();
    renderFavorites();
    syncFavoriteUIs();
}

// Sync favorite states on all elements with data-product-id attributes
function syncFavoriteUIs() {
    const favs = getFavorites();
    document.querySelectorAll('[data-product-id]').forEach(el => {
        const productId = el.getAttribute('data-product-id');
        const isFav = favs.includes(productId);
        
        let target = el;
        if (el.tagName === 'BUTTON') {
            target = el.querySelector('.material-symbols-outlined') || el;
        }
        
        if (isFav) {
            target.style.color = 'red';
            target.classList.add('active-favorite');
        } else {
            target.style.color = '';
            target.classList.remove('active-favorite');
        }
    });
}

// Toggle Favorite state
function toggleFavorite(productId, element) {
    let favs = getFavorites();
    const index = favs.indexOf(productId);
    
    let target = element;
    if (element && element.tagName === 'BUTTON') {
        target = element.querySelector('.material-symbols-outlined') || element;
    }
    
    if (index === -1) {
        favs.push(productId);
        if (target) {
            target.style.color = 'red';
            target.classList.add('active-favorite');
        }
    } else {
        favs.splice(index, 1);
        if (target) {
            target.style.color = '';
            target.classList.remove('active-favorite');
        }
    }
    saveFavorites(favs);
}

// Add Item to Cart
async function addToCart(productId, fallbackData) {
    // Check if client is logged in
    const isLogged = localStorage.getItem('mage_optique_client_logged') === 'true';
    if (!isLogged) {
        localStorage.setItem('mage_optique_pending_cart_item', productId);
        window.location.href = 'connexion.html';
        return false;
    }
    
    // Try to find product in local database first
    let product = findProductById(productId);
    
    // If not found in localStorage (e.g. Supabase UUID not yet synced),
    // use fallback data passed directly from the card template
    if (!product && fallbackData) {
        product = {
            id: productId,
            title: fallbackData.title || 'Produit',
            price: parseFloat(fallbackData.price) || 0,
            image: fallbackData.image || ''
        };
        // Also save it in localStorage for future lookups
        try {
            const products = JSON.parse(localStorage.getItem('mage_optique_services_products') || '[]');
            if (!products.find(p => p.id === productId)) {
                products.push({ ...product, category: 'vue', gender: 'homme', tag: '', desc: '', specs: '' });
                localStorage.setItem('mage_optique_services_products', JSON.stringify(products));
            }
        } catch(e) { /* silent */ }
    }
    
    // Async fallback: try to fetch directly from Supabase!
    if (!product) {
        try {
            const client = await getSupabase();
            const { data, error } = await client.from('products').select('*').eq('id', productId).single();
            if (!error && data) {
                product = {
                    id: data.id,
                    title: data.title,
                    price: parseFloat(data.price) || 0,
                    image: data.image
                };
            }
        } catch (e) {
            console.error("Failed to fetch product from Supabase directly in addToCart:", e);
        }
    }
    
    if (!product) {
        console.warn('addToCart: product not found for id', productId);
        return false;
    }
    
    let cart = getCart();
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: "", // Strip heavy image data to avoid LocalStorage quota limit errors
            quantity: 1
        });
    }
    saveCart(cart);
    
    // Redirect the client to the panier page directly on addition
    window.location.href = 'panier.html';
    return true;
}

// Add Item to Cart without redirection (silent addition)
async function addToCartSilently(productId, fallbackData) {
    let product = findProductById(productId);
    if (!product && fallbackData) {
        product = { id: productId, title: fallbackData.title || 'Produit', price: parseFloat(fallbackData.price) || 0, image: fallbackData.image || '' };
    }
    
    // Async fallback: try to fetch directly from Supabase!
    if (!product) {
        try {
            const client = await getSupabase();
            const { data, error } = await client.from('products').select('*').eq('id', productId).single();
            if (!error && data) {
                product = {
                    id: data.id,
                    title: data.title,
                    price: parseFloat(data.price) || 0,
                    image: data.image
                };
            }
        } catch (e) {
            console.error("Failed to fetch product from Supabase directly in addToCartSilently:", e);
        }
    }
    
    if (!product) return false;
    
    let cart = getCart();
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: "", // Strip heavy image data to avoid LocalStorage quota limit errors
            quantity: 1
        });
    }
    saveCart(cart);
    return true;
}
window.addToCartSilently = addToCartSilently;

// ─── Premium Toast Notification ──────────────────────────────────────────────
function showToast(message, type = 'success') {
    let toast = document.getElementById('mage-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'mage-toast';
        toast.style.cssText = [
            'position:fixed', 'bottom:90px', 'left:50%',
            'transform:translateX(-50%) translateY(20px)',
            'background:#121212', 'color:#C5A059',
            'padding:14px 24px', 'border-radius:4px',
            'border:1px solid rgba(197,160,89,0.3)',
            "font-family:'Hanken Grotesk',sans-serif",
            'font-size:0.875rem', 'font-weight:600',
            'box-shadow:0 10px 30px rgba(0,0,0,0.4)',
            'z-index:999999', 'opacity:0',
            'transition:opacity 0.35s cubic-bezier(0.16,1,0.3,1),transform 0.35s cubic-bezier(0.16,1,0.3,1)',
            'display:flex', 'align-items:center', 'gap:10px',
            'white-space:nowrap', 'pointer-events:none',
            'max-width:90vw', 'overflow:hidden'
        ].join(';');
        document.body.appendChild(toast);
    }
    const iconMap = { success: 'check_circle', error: 'error', info: 'info' };
    const colorMap = { success: '#C5A059', error: '#e74c3c', info: '#74b9ff' };
    const icon = iconMap[type] || 'check_circle';
    const iconColor = colorMap[type] || '#C5A059';
    toast.innerHTML = `<span class="material-symbols-outlined" style="font-size:20px;color:${iconColor};flex-shrink:0">${icon}</span>${message}`;
    // Animate in
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    requestAnimationFrame(() => requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }));
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 3500);
}
window.showToast = showToast;

// ─── addToCartDirect — uses _productRegistry as primary source ────────────────
// Called from card buttons. Uses the product object stored in window._productRegistry
// at render time, bypassing all localStorage lookup timing issues entirely.
async function addToCartDirect(productId) {
    if (!productId) return;

    // Check login first
    const isLogged = localStorage.getItem('mage_optique_client_logged') === 'true';
    if (!isLogged) {
        localStorage.setItem('mage_optique_pending_cart_item', productId);
        window.location.href = 'connexion.html';
        return;
    }

    // Try registry first (most reliable — set at render time)
    let product = window._productRegistry && window._productRegistry[productId];

    // Fallback: try getProducts() / localStorage
    if (!product) {
        product = findProductById(productId);
    }
    
    // Async fallback: try to fetch directly from Supabase!
    if (!product) {
        try {
            const client = await getSupabase();
            const { data, error } = await client.from('products').select('*').eq('id', productId).single();
            if (!error && data) {
                product = {
                    id: data.id,
                    title: data.title,
                    price: parseFloat(data.price) || 0,
                    image: data.image
                };
            }
        } catch (e) {
            console.error("Failed to fetch product from Supabase directly in addToCartDirect:", e);
        }
    }

    if (!product) {
        showToast('Produit introuvable. Rechargez la page.', 'error');
        console.warn('addToCartDirect: product not found for id', productId);
        return;
    }

    let cart = getCart();
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: "", // Strip heavy image data to avoid LocalStorage quota limit errors
            quantity: 1
        });
    }
    saveCart(cart);
    window.location.href = 'panier.html';
}
window.addToCartDirect = addToCartDirect;


// Remove Item from Cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

// Adjust Cart Quantity
function updateCartQuantity(productId, delta) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(p => p.id !== productId);
        }
    }
    saveCart(cart);
}

// Toggle drawer state open/close
function toggleDrawer(type, forceOpen = false) {
    const cartDrawer = document.getElementById('cart-drawer');
    const favDrawer = document.getElementById('favorites-drawer');
    const chatDrawer = document.getElementById('chat-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    
    if (!cartDrawer || !favDrawer || !backdrop) return;
    
    if (type === 'cart') {
        if (favDrawer) favDrawer.classList.remove('open');
        if (chatDrawer) chatDrawer.classList.remove('open');
        if (forceOpen || !cartDrawer.classList.contains('open')) {
            cartDrawer.classList.add('open');
            backdrop.classList.add('show');
        } else {
            cartDrawer.classList.remove('open');
            backdrop.classList.remove('show');
        }
    } else if (type === 'fav') {
        if (cartDrawer) cartDrawer.classList.remove('open');
        if (chatDrawer) chatDrawer.classList.remove('open');
        if (forceOpen || !favDrawer.classList.contains('open')) {
            favDrawer.classList.add('open');
            backdrop.classList.add('show');
        } else {
            favDrawer.classList.remove('open');
            backdrop.classList.remove('show');
        }
    } else if (type === 'chat') {
        if (cartDrawer) cartDrawer.classList.remove('open');
        if (favDrawer) favDrawer.classList.remove('open');
        if (forceOpen || (chatDrawer && !chatDrawer.classList.contains('open'))) {
            if (chatDrawer) chatDrawer.classList.add('open');
            backdrop.classList.add('show');
            const messagesContainer = document.getElementById('chat-drawer-messages');
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        } else {
            if (chatDrawer) chatDrawer.classList.remove('open');
            backdrop.classList.remove('show');
        }
    } else {
        if (cartDrawer) cartDrawer.classList.remove('open');
        if (favDrawer) favDrawer.classList.remove('open');
        if (chatDrawer) chatDrawer.classList.remove('open');
        backdrop.classList.remove('show');
    }
}

// Toggle search overlay
function toggleSearchOverlay(open) {
    const searchOverlay = document.getElementById('search-overlay');
    if (!searchOverlay) return;
    
    if (open) {
        searchOverlay.style.display = 'block';
        setTimeout(() => {
            searchOverlay.classList.add('open');
            document.getElementById('overlay-search-input').focus();
        }, 10);
    } else {
        searchOverlay.classList.remove('open');
        setTimeout(() => {
            searchOverlay.style.display = 'none';
        }, 300);
    }
}

// Render dynamic cart items
function renderCart() {
    const cartItemsGrid = document.getElementById('cart-drawer-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    if (!cartItemsGrid || !cartTotalPrice) return;
    
    const cart = getCart();
    cartItemsGrid.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsGrid.innerHTML = `
            <div style="text-align: center; color: var(--color-soft-slate); margin-top: 60px;">
                <span class="material-symbols-outlined" style="font-size: 48px; opacity: 0.3; display: block; margin-bottom: 16px;">shopping_bag</span>
                Votre Panier est vide.
            </div>
        `;
        cartTotalPrice.textContent = '0 FCFA';
        return;
    }
    
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const dbProduct = findProductById(item.id);
        const itemImage = (dbProduct && dbProduct.image) ? dbProduct.image : item.image || '';
        const row = document.createElement('div');
        row.className = 'drawer-item';
        row.innerHTML = `
            <div class="drawer-item-img-wrapper">
                <img src="${itemImage}" alt="${item.title}" class="drawer-item-img">
            </div>
            <div class="drawer-item-details">
                <div class="drawer-item-title">${item.title}</div>
                <div class="drawer-item-price">${new Intl.NumberFormat('fr-FR').format(item.price)} FCFA</div>
                <div class="drawer-item-qty">
                    <button class="qty-btn" onclick="updateCartQuantity('${item.id}', -1)">-</button>
                    <span style="font-weight: 600; font-size: 0.9rem;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQuantity('${item.id}', 1)">+</button>
                </div>
            </div>
            <span class="material-symbols-outlined close-drawer" style="font-size: 20px; cursor: pointer;" onclick="removeFromCart('${item.id}')">delete</span>
        `;
        cartItemsGrid.appendChild(row);
    });
    
    cartTotalPrice.textContent = new Intl.NumberFormat('fr-FR').format(subtotal) + ' FCFA';
}

// Render dynamic favorites items
function renderFavorites() {
    const favItemsGrid = document.getElementById('fav-drawer-items');
    if (!favItemsGrid) return;
    
    const favs = getFavorites();
    favItemsGrid.innerHTML = '';
    
    if (favs.length === 0) {
        favItemsGrid.innerHTML = `
            <div style="text-align: center; color: var(--color-soft-slate); margin-top: 60px;">
                <span class="material-symbols-outlined" style="font-size: 48px; opacity: 0.3; display: block; margin-bottom: 16px;">favorite</span>
                Votre liste de favoris est vide.
            </div>
        `;
        return;
    }
    
    favs.forEach(productId => {
        const product = findProductById(productId);
        if (!product) return;
        
        const row = document.createElement('div');
        row.className = 'drawer-item';
        row.innerHTML = `
            <div class="drawer-item-img-wrapper">
                <img src="${product.image}" alt="${product.title}" class="drawer-item-img">
            </div>
            <div class="drawer-item-details">
                <div class="drawer-item-title">${product.title}</div>
                <div class="drawer-item-price">${new Intl.NumberFormat('fr-FR').format(product.price)} FCFA</div>
                <div style="display: flex; gap: 8px; margin-top: 8px;">
                    <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.7rem; text-transform: none; border-radius: var(--border-radius-sm);" onclick="addToCart('${product.id}')">Acheter</button>
                    <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.7rem; text-transform: none; border-radius: var(--border-radius-sm);" onclick="toggleFavorite('${product.id}', null)">Retirer</button>
                </div>
            </div>
        `;
        favItemsGrid.appendChild(row);
    });
}

// Update badges counts in header
function updateHeaderBadges() {
    const favBadge = document.getElementById('fav-badge');
    const cartBadge = document.getElementById('cart-badge');
    
    if (favBadge) {
        const count = getFavorites().length;
        favBadge.textContent = count;
        if (count > 0) favBadge.classList.add('show');
        else favBadge.classList.remove('show');
    }
    if (cartBadge) {
        const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = count;
        if (count > 0) cartBadge.classList.add('show');
        else cartBadge.classList.remove('show');
    }
}

// Search overlay results engine
function runOverlaySearch() {
    const input = document.getElementById('overlay-search-input');
    const resultsGrid = document.getElementById('search-results');
    if (!input || !resultsGrid) return;
    
    const query = input.value.toLowerCase().trim();
    resultsGrid.innerHTML = '';
    
    if (!query) {
        resultsGrid.innerHTML = `
            <div style="grid-column: span 12; text-align: center; color: var(--color-soft-slate); margin-top: 40px;">
                Tapez les caractéristiques d'une monture (ex. Titane, Solaire, Homme, Enfant, etc.) pour la trouver.
            </div>
        `;
        return;
    }
    
    const products = getProducts();
    let matchesCount = 0;
    
    products.forEach(p => {
        const matches = p.title.toLowerCase().includes(query) || 
                        p.desc.toLowerCase().includes(query) || 
                        (p.category && p.category.toLowerCase().includes(query)) || 
                        (p.gender && p.gender.toLowerCase().includes(query)) || 
                        (p.tag && p.tag.toLowerCase().includes(query)) || 
                        (p.specs && p.specs.toLowerCase().includes(query));
                        
        if (matches) {
            matchesCount++;
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.backgroundColor = 'var(--color-paper-white)';
            card.style.color = 'var(--color-deep-charcoal)';
            card.style.padding = '16px';
            
            card.innerHTML = `
                <div class="product-img-wrapper" style="margin-bottom: 12px;" onclick="location.href='details.html?id=${p.id}'; toggleSearchOverlay(false);">
                    <img src="${p.image}" alt="${p.title}" class="product-img" loading="lazy">
                </div>
                <h4 style="font-family: var(--font-serif); font-size: 0.95rem; margin-bottom: 4px; line-height: 1.3;">${p.title}</h4>
                <div style="color: var(--color-muted-gold); font-weight: 700; font-size: 0.85rem; margin-bottom: 12px;">${new Intl.NumberFormat('fr-FR').format(p.price)} FCFA</div>
                <button class="btn btn-gold" style="width: 100%; padding: 8px 0; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; gap: 6px;" onclick="addToCart('${p.id}'); toggleSearchOverlay(false);">
                    <span class="material-symbols-outlined" style="font-size: 16px;">add_shopping_cart</span>
                    Ajouter
                </button>
            `;
            resultsGrid.appendChild(card);
        }
    });
    
    if (matchesCount === 0) {
        resultsGrid.innerHTML = `
            <div style="grid-column: span 12; text-align: center; color: var(--color-soft-slate); margin-top: 40px;">
                Aucune monture ne correspond à votre recherche.
            </div>
        `;
    }
}

// Main Dynamic Drawer & Search Overlay Injector
function injectLuxuryInteractions() {
    if (document.getElementById('cart-drawer')) return; // Avoid duplicates
    
    // 1. Create backdrop overlay
    const backdrop = document.createElement('div');
    backdrop.id = 'drawer-backdrop';
    backdrop.style.cssText = `
        position: fixed; inset: 0; background: rgba(18, 18, 18, 0.4);
        backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        z-index: 450; opacity: 0; visibility: hidden;
        transition: opacity 0.4s ease, visibility 0.4s ease;
    `;
    document.body.appendChild(backdrop);
    
    // Add backdrop class toggling
    // Add backdrop and hover search class styles
    const style = document.createElement('style');
    style.innerHTML = `
        #drawer-backdrop.show { opacity: 1; visibility: visible; }
        
        .top-header.search-active .nav-bar {
            padding-left: 16px !important;
            padding-right: 16px !important;
        }
        
        .top-header.search-active .container {
            padding-left: 16px !important;
            padding-right: 16px !important;
        }
        
        .top-header.search-active .nav-links {
            gap: 12px !important;
        }
        
        @media (max-width: 992px) {
            .top-header.search-active .logo-text {
                display: none !important;
            }
            .top-header.search-active .nav-links {
                gap: 12px !important;
            }
        }
        
        .nav-search-container {
            display: flex;
            align-items: center;
            position: relative;
            padding: 4px 12px;
            border-radius: var(--border-radius-full);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            background: transparent;
            margin-left: 24px; /* Evite les chevauchements avec le lien Contact */
        }
        .nav-search-container:hover, .nav-search-container:focus-within {
            background: rgba(18, 18, 18, 0.05);
        }
        .nav-search-input {
            width: 0;
            opacity: 0;
            padding: 0;
            border: none;
            background: transparent;
            color: var(--color-deep-charcoal);
            outline: none;
            font-size: 0.9rem;
            font-family: var(--font-sans);
            transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, padding 0.3s ease;
        }
        .nav-search-container:hover .nav-search-input,
        .nav-search-container:focus-within .nav-search-input,
        .nav-search-input:focus,
        .nav-search-input:not(:placeholder-shown) {
            width: 160px;
            opacity: 1;
            padding: 0 8px;
        }
        .nav-search-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            width: 320px;
            max-height: 400px;
            overflow-y: auto;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--color-border-subtle);
            border-radius: var(--border-radius-md);
            box-shadow: 0 12px 30px rgba(0,0,0,0.08);
            margin-top: 12px;
            display: none;
            flex-direction: column;
            z-index: 500;
            animation: navSearchSlideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-search-dropdown.show {
            display: flex;
        }
        @keyframes navSearchSlideDown {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .nav-search-result-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border-bottom: 1px solid var(--color-border-subtle);
            transition: var(--transition-fast);
            cursor: pointer;
            text-decoration: none;
            color: var(--color-deep-charcoal);
        }
        .nav-search-result-item:hover {
            background-color: var(--color-gold-tint);
        }
        .nav-search-result-item:last-child {
            border-bottom: none;
        }
        .nav-search-result-img {
            width: 48px;
            height: 32px;
            object-fit: contain;
            mix-blend-mode: multiply;
        }
        .nav-search-result-title {
            font-family: var(--font-serif);
            font-weight: 600;
            font-size: 0.85rem;
            color: var(--color-deep-charcoal);
        }
        .nav-search-result-price {
            font-size: 0.8rem;
            color: var(--color-muted-gold);
            font-weight: 700;
        }
        
        /* Chat Drawer Specific Styles */
        .chat-bubble {
            max-width: 85%;
            padding: 12px 16px;
            border-radius: var(--border-radius-lg);
            font-family: var(--font-sans);
            font-size: 0.875rem;
            line-height: 1.5;
            word-wrap: break-word;
            margin-bottom: 2px;
        }
        .chat-bubble.user {
            align-self: flex-end;
            background-color: var(--color-deep-charcoal);
            color: var(--color-paper-white);
            border-bottom-right-radius: 2px;
        }
        .chat-bubble.assistant {
            align-self: flex-start;
            background-color: rgba(18, 18, 18, 0.05);
            color: var(--color-deep-charcoal);
            border-bottom-left-radius: 2px;
            border-left: 2px solid var(--color-muted-gold);
        }
        .chat-bubble.error-bubble {
            align-self: center;
            background-color: #fdf2f2;
            color: #ec4899;
            border: 1px dashed #fbcfe8;
            font-size: 0.8rem;
            text-align: center;
            width: 90%;
        }
        .chat-input-container {
            padding: 16px;
            border-top: 1px solid var(--color-border-subtle);
            background-color: var(--color-surface-container-lowest);
            display: flex;
            gap: 8px;
            align-items: center;
        }
        .chat-input {
            flex-grow: 1;
            border: 1px solid var(--color-border-subtle);
            border-radius: var(--border-radius-full);
            padding: 10px 16px;
            outline: none;
            font-family: var(--font-sans);
            font-size: 0.9rem;
            color: var(--color-deep-charcoal);
            background: var(--color-paper-white);
            transition: border-color var(--transition-fast);
        }
        .chat-input:focus {
            border-color: var(--color-muted-gold);
        }
        .chat-send-btn {
            background-color: var(--color-deep-charcoal);
            color: var(--color-paper-white);
            border: none;
            border-radius: var(--border-radius-full);
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: var(--transition-fast);
            flex-shrink: 0;
        }
        .chat-send-btn:hover {
            background-color: var(--color-muted-gold);
        }
        .chat-settings-panel {
            background: rgba(18, 18, 18, 0.03);
            border-bottom: 1px solid var(--color-border-subtle);
            padding: 16px;
            display: none;
            flex-direction: column;
            gap: 12px;
            animation: fadeIn 0.3s ease-out;
        }
        .chat-settings-panel.show {
            display: flex;
        }
        .typing-indicator {
            display: none;
            gap: 4px;
            align-items: center;
            padding: 12px 16px;
            background-color: rgba(18, 18, 18, 0.05);
            border-radius: var(--border-radius-lg);
            width: fit-content;
            border-bottom-left-radius: 2px;
            align-self: flex-start;
            margin-left: 20px;
            margin-bottom: 8px;
        }
        .typing-indicator.show {
            display: flex;
        }
        .typing-dot {
            width: 6px;
            height: 6px;
            background-color: var(--color-muted-gold);
            border-radius: 50%;
            animation: typingBounce 1.4s infinite ease-in-out both;
        }
        @keyframes typingBounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1.0); }
        }
    `;
    document.head.appendChild(style);
    
    // 2. Create Cart Drawer
    const cartDrawer = document.createElement('div');
    cartDrawer.className = 'side-drawer';
    cartDrawer.id = 'cart-drawer';
    cartDrawer.innerHTML = `
        <div class="drawer-header">
            <span class="font-serif text-headline-md" style="font-size: 1.5rem; font-weight: 500;">Votre Panier</span>
            <span class="material-symbols-outlined close-drawer" id="close-cart-btn">close</span>
        </div>
        <div class="drawer-content" id="cart-drawer-items"></div>
        <div class="drawer-footer">
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-weight: 600; font-size: 1rem;">
                <span>Sous-total:</span>
                <span id="cart-total-price">0 FCFA</span>
            </div>
            <button class="btn btn-gold" id="cart-checkout-btn" style="width: 100%; border: none;" onclick="location.href='panier.html'; toggleDrawer('cart');">Passer la commande</button>
        </div>
    `;
    document.body.appendChild(cartDrawer);
    
    // 3. Create Favorites Drawer
    const favDrawer = document.createElement('div');
    favDrawer.className = 'side-drawer';
    favDrawer.id = 'favorites-drawer';
    favDrawer.innerHTML = `
        <div class="drawer-header">
            <span class="font-serif text-headline-md" style="font-size: 1.5rem; font-weight: 500;">Vos Favoris</span>
            <span class="material-symbols-outlined close-drawer" id="close-fav-btn">close</span>
        </div>
        <div class="drawer-content" id="fav-drawer-items"></div>
    `;
    document.body.appendChild(favDrawer);
    
    // 4. Create Chat Drawer
    const chatDrawer = document.createElement('div');
    chatDrawer.className = 'side-drawer';
    chatDrawer.id = 'chat-drawer';
    chatDrawer.style.cssText = 'width: 400px; display: flex; flex-direction: column;';
    chatDrawer.innerHTML = `
        <div class="drawer-header" style="padding: 24px 20px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span class="material-symbols-outlined" style="color: var(--color-muted-gold); font-size: 28px;">chat</span>
                <div>
                    <span class="font-serif" style="font-size: 1.25rem; font-weight: 500; display: block; line-height: 1.2;">Mage Concierge</span>
                    <span style="font-size: 0.7rem; color: var(--color-soft-slate); display: block; text-transform: uppercase; letter-spacing: 0.05em;" id="chat-status-label">Conseiller Visagiste IA</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
                <span class="material-symbols-outlined" id="chat-clear-btn" style="cursor: pointer; font-size: 20px; color: var(--color-soft-slate);" title="Effacer l'historique">delete</span>
                <span class="material-symbols-outlined" id="chat-settings-toggle-btn" style="cursor: pointer; font-size: 20px; color: var(--color-soft-slate);" title="Paramètres de l'IA">settings</span>
                <span class="material-symbols-outlined close-drawer" id="close-chat-btn" style="font-size: 20px;">close</span>
            </div>
        </div>
        
        <!-- API Settings Panel (Collapsible) -->
        <div id="chat-settings-panel" class="chat-settings-panel">
            <div>
                <label class="form-label" style="font-size: 0.7rem; margin-bottom: 4px;">Clé API OpenRouter</label>
                <div style="display: flex; gap: 8px;">
                    <input type="password" id="chat-api-key-input" class="form-input" style="padding: 6px 0; font-size: 0.85rem; flex-grow: 1; border: none; border-bottom: 1px solid var(--color-outline); background-color: transparent;" placeholder="Saisir votre clé sk-or-...">
                    <button class="qty-btn" id="chat-toggle-key-visibility" style="width: 28px; height: 28px; border: 1px solid var(--color-border-subtle); display: flex; align-items: center; justify-content: center; background: transparent; cursor: pointer; border-radius: var(--border-radius-sm);"><span class="material-symbols-outlined" style="font-size: 16px;">visibility</span></button>
                </div>
            </div>
            
            <div>
                <label class="form-label" style="font-size: 0.7rem; margin-bottom: 4px;">Modèle IA</label>
                <select id="chat-model-select" class="form-input" style="padding: 6px 0; font-size: 0.85rem; border: none; border-bottom: 1px solid var(--color-outline); background-color: transparent; width: 100%;">
                    <option value="google/gemma-4-31b-it:free">Gemma 4 31B IT (Gratuit - Recommandé)</option>
                    <option value="meta-llama/llama-3.3-70b-instruct:free">Llama 3.3 70B (Gratuit)</option>
                    <option value="meta-llama/llama-3.2-3b-instruct:free">Llama 3.2 3B (Gratuit - Rapide)</option>
                    <option value="openrouter/free">Auto-sélection gratuit (Très résilient)</option>
                </select>
            </div>

            <button class="btn btn-gold" id="chat-save-settings-btn" style="padding: 8px 16px; font-size: 0.75rem; border-radius: var(--border-radius-sm); border: none; margin-top: 4px; width: 100%;">Sauvegarder les paramètres</button>
        </div>

        <!-- Messages Container -->
        <div class="drawer-content" id="chat-drawer-messages" style="flex-grow: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 16px; background-color: #fbfbfb;">
            <!-- Initial assistant greeting -->
            <div class="chat-bubble assistant">
                <p style="margin-bottom: 0; line-height: 1.5;">Bonjour ! Je suis <strong>Antoine</strong>, votre conseiller visagiste et concierge d'exception pour <strong>Mage Optique & Services</strong>.<br><br>Comment puis-je magnifier votre regard aujourd'hui ? Décrivez-moi votre visage ou posez-moi vos questions.</p>
            </div>
        </div>
        
        <!-- Typing indicator -->
        <div id="chat-typing-indicator" class="typing-indicator">
            <div class="typing-dot" style="animation-delay: -0.32s"></div>
            <div class="typing-dot" style="animation-delay: -0.16s"></div>
            <div class="typing-dot"></div>
        </div>

        <!-- API Warning banner if key is missing -->
        <div id="chat-api-warning" style="background-color: var(--color-gold-tint); border-top: 1px solid var(--color-border-subtle); padding: 12px 20px; font-size: 0.75rem; text-align: center; color: var(--color-deep-charcoal); display: none;">
            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: middle; color: var(--color-muted-gold); margin-right: 4px;">warning</span>
            Clé API non configurée. <a href="javascript:void(0)" id="chat-open-settings-link" style="color: var(--color-muted-gold); font-weight: 700; text-decoration: underline;">Cliquez ici pour la configurer</a>.
        </div>

        <!-- Saisie message -->
        <div class="chat-input-container">
            <input type="text" id="chat-user-input" class="chat-input" placeholder="Posez votre question...">
            <button class="chat-send-btn" id="chat-send-btn">
                <span class="material-symbols-outlined" style="font-size: 20px; margin-left: 2px;">send</span>
            </button>
        </div>
    `;
    document.body.appendChild(chatDrawer);
    
    // 5. Intercept Header Icons & Inject Badges
    const favNavBtn = document.getElementById('fav-nav-btn');
    if (favNavBtn) {
        favNavBtn.removeAttribute('onclick');
        // Wrap with relative container to place the badge
        const parent = favNavBtn.parentNode;
        const container = document.createElement('div');
        container.style.cssText = 'position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;';
        parent.insertBefore(container, favNavBtn);
        container.appendChild(favNavBtn);
        
        const badge = document.createElement('span');
        badge.className = 'badge-count';
        badge.id = 'fav-badge';
        container.appendChild(badge);
        
        container.addEventListener('click', () => toggleDrawer('fav'));
    }
    
    const cartNavBtn = document.getElementById('cart-nav-btn');
    if (cartNavBtn) {
        cartNavBtn.removeAttribute('onclick');
        const parent = cartNavBtn.parentNode;
        const container = document.createElement('div');
        container.style.cssText = 'position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer;';
        parent.insertBefore(container, cartNavBtn);
        container.appendChild(cartNavBtn);
        
        const badge = document.createElement('span');
        badge.className = 'badge-count';
        badge.id = 'cart-badge';
        container.appendChild(badge);
        
        container.addEventListener('click', () => {
            if (window.location.pathname.includes('panier')) {
                return;
            }
            const cart = getCart();
            if (cart.length === 0) {
                showEmptyCartModal();
            } else {
                window.location.href = 'panier.html';
            }
        });
    }
    
    const searchNavBtn = document.getElementById('search-nav-btn');
    if (searchNavBtn) {
        // If it's a link, remove href to override
        searchNavBtn.removeAttribute('href');
        searchNavBtn.style.cursor = 'pointer';
        
        // Wrap with search container
        const parent = searchNavBtn.parentNode;
        const searchContainer = document.createElement('div');
        searchContainer.className = 'nav-search-container';
        
        parent.insertBefore(searchContainer, searchNavBtn);
        searchContainer.appendChild(searchNavBtn);
        
        // Append input field
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'nav-search-input';
        searchInput.id = 'nav-search-input';
        searchInput.placeholder = 'Rechercher...';
        searchContainer.appendChild(searchInput);
        
        // Append dropdown search results panel
        const dropdown = document.createElement('div');
        dropdown.className = 'nav-search-dropdown';
        dropdown.id = 'nav-search-dropdown';
        searchContainer.appendChild(dropdown);
        
        // Clic sur l'icône de recherche pour soumettre la recherche ou l'étendre
        searchNavBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const query = searchInput.value.trim();
            if (query) {
                dropdown.classList.remove('show');
                searchInput.blur();
                if (window.location.pathname.includes('boutique')) {
                    const pageSearchInput = document.getElementById('search-input');
                    if (pageSearchInput) {
                        pageSearchInput.value = query;
                        pageSearchInput.dispatchEvent(new Event('input'));
                    }
                } else {
                    window.location.href = 'boutique.html?search=' + encodeURIComponent(query);
                }
            } else {
                searchInput.focus();
            }
        });

        const topHeader = document.querySelector('.top-header');
        const expandHeader = () => {
            if (topHeader) topHeader.classList.add('search-active');
        };
        const collapseHeader = () => {
            if (topHeader && !searchInput.value.trim()) {
                topHeader.classList.remove('search-active');
            }
        };

        // Hover focusing behavior
        searchContainer.addEventListener('mouseenter', () => {
            expandHeader();
            searchInput.focus();
        });
        
        // Mouseleave auto-collapse behavior if input is empty
        searchContainer.addEventListener('mouseleave', () => {
            if (!searchInput.value.trim()) {
                searchInput.blur();
                collapseHeader();
            }
        });
        
        searchInput.addEventListener('focus', expandHeader);
        searchInput.addEventListener('blur', () => {
            if (!searchInput.value.trim()) {
                collapseHeader();
            }
        });
        
        // Touche Entrée pour valider la recherche et rediriger si nécessaire
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = searchInput.value.trim();
                dropdown.classList.remove('show');
                searchInput.blur();
                
                if (window.location.pathname.includes('boutique')) {
                    const pageSearchInput = document.getElementById('search-input');
                    if (pageSearchInput) {
                        pageSearchInput.value = query;
                        pageSearchInput.dispatchEvent(new Event('input'));
                    }
                } else {
                    window.location.href = 'boutique.html?search=' + encodeURIComponent(query);
                }
            }
        });
        
        // Typing events to update floating results
        searchInput.addEventListener('input', () => {
            // Synchronize with page search input if present
            const pageSearchInput = document.getElementById('search-input');
            if (pageSearchInput && pageSearchInput.value !== searchInput.value) {
                pageSearchInput.value = searchInput.value;
                pageSearchInput.dispatchEvent(new Event('input'));
            }
            
            const query = searchInput.value.toLowerCase().trim();
            dropdown.innerHTML = '';
            
            // Si on est sur la page boutique, pas de dropdown de doublon
            if (window.location.pathname.includes('boutique')) {
                dropdown.classList.remove('show');
                return;
            }
            
            if (!query) {
                dropdown.classList.remove('show');
                return;
            }
            
            const products = getProducts();
            let matchesCount = 0;
            
            products.forEach(p => {
                const matches = p.title.toLowerCase().includes(query) || 
                                p.desc.toLowerCase().includes(query) || 
                                (p.category && p.category.toLowerCase().includes(query)) || 
                                (p.gender && p.gender.toLowerCase().includes(query)) || 
                                (p.tag && p.tag.toLowerCase().includes(query)) || 
                                (p.specs && p.specs.toLowerCase().includes(query));
                                
                if (matches) {
                    matchesCount++;
                    const item = document.createElement('a');
                    item.href = 'javascript:void(0)';
                    item.className = 'nav-search-result-item';
                    item.innerHTML = `
                        <img src="${p.image}" alt="${p.title}" class="nav-search-result-img">
                        <div style="flex-grow: 1; text-align: left;">
                            <div class="nav-search-result-title">${p.title}</div>
                            <div class="nav-search-result-price">${new Intl.NumberFormat('fr-FR').format(p.price)} FCFA</div>
                        </div>
                    `;
                    
                    item.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdown.classList.remove('show');
                        searchInput.value = '';
                        searchInput.blur();
                        openQuickView(p.id);
                    });
                    
                    dropdown.appendChild(item);
                }
            });
            
            if (matchesCount > 0) {
                dropdown.classList.add('show');
            } else {
                dropdown.innerHTML = `
                    <div style="padding: 16px; text-align: center; color: var(--color-soft-slate); font-size: 0.85rem;">
                        Aucun résultat trouvé
                    </div>
                `;
                dropdown.classList.add('show');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                dropdown.classList.remove('show');
                if (!searchInput.value) {
                    searchInput.blur();
                }
            }
        });
        
        // Mouseleave close if input is empty
        searchContainer.addEventListener('mouseleave', () => {
            if (!searchInput.value.trim()) {
                searchInput.blur();
                dropdown.classList.remove('show');
            }
            setTimeout(() => {
                if (!searchContainer.matches(':hover') && document.activeElement !== searchInput) {
                    dropdown.classList.remove('show');
                }
            }, 300);
        });
    }
    
    // 6. Hook close event listeners
    document.getElementById('close-cart-btn').addEventListener('click', () => toggleDrawer('cart'));
    document.getElementById('close-fav-btn').addEventListener('click', () => toggleDrawer('fav'));
    if (document.getElementById('close-chat-btn')) {
        document.getElementById('close-chat-btn').addEventListener('click', () => toggleDrawer('chat'));
    }
    backdrop.addEventListener('click', () => toggleDrawer('all'));
    
    // Initial Render
    updateHeaderBadges();
    renderCart();
    renderFavorites();
    
    // Automatically open the cart drawer if redirected from a direct 'Ajouter' action
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('checkout')) {
        setTimeout(() => {
            toggleDrawer('cart', true);
        }, 300);
    }

    // 7. Bind or Inject Floating Chat Button
    const bindFloatingBtn = () => {
        const floatingBtn = document.getElementById('concierge-floating-btn');
        if (floatingBtn) {
            floatingBtn.removeAttribute('onclick');
            floatingBtn.removeAttribute('onmouseover');
            floatingBtn.removeAttribute('onmouseout');
            
            floatingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleDrawer('chat');
            });
            
            const hoverMsg = document.getElementById('concierge-message');
            if (hoverMsg) {
                floatingBtn.addEventListener('mouseenter', () => {
                    const drawer = document.getElementById('chat-drawer');
                    if (drawer && !drawer.classList.contains('open')) {
                        hoverMsg.style.display = 'block';
                    }
                });
                floatingBtn.addEventListener('mouseleave', () => {
                    hoverMsg.style.display = 'none';
                });
            }
        }
    };

    let floatingBtn = document.getElementById('concierge-floating-btn');
    if (!floatingBtn) {
        const chatBtnContainer = document.createElement('div');
        chatBtnContainer.style.cssText = "position: fixed; bottom: 32px; right: 32px; z-index: 400; display: flex; flex-direction: column; align-items: flex-end; gap: 16px;";
        chatBtnContainer.innerHTML = `
            <div id="concierge-message" class="glass-effect" style="display: none; padding: 12px 20px; border-radius: var(--border-radius-lg); font-size: 0.875rem; font-weight: 500; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border-color: var(--color-muted-gold); animation: fadeIn 0.3s ease-out; max-width: 240px; color: var(--color-deep-charcoal);">
                Besoin d'un conseil ? Chattez avec l'un de nos visagistes en direct.
            </div>
            <button class="flex-center" style="width: 56px; height: 56px; border-radius: var(--border-radius-full); background-color: var(--color-deep-charcoal); color: var(--color-paper-white); box-shadow: 0 10px 25px rgba(0,0,0,0.1); cursor: pointer; transition: var(--transition-fast); border: none;" id="concierge-floating-btn">
                <span class="material-symbols-outlined" style="font-size: 28px;">chat</span>
            </button>
        `;
        document.body.appendChild(chatBtnContainer);
    }
    bindFloatingBtn();

    // 8. Initialize Chat Drawer Functionality
    if (chatDrawer) {
        initChatDrawer(chatDrawer);
    }
}

// Global Quick View Modal Functions
function openQuickView(productId) {
    const product = findProductById(productId);
    if (!product) return;
    
    let modal = document.getElementById('quick-view-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'quick-view-modal';
        modal.style.cssText = `
            position: fixed; inset: 0; background: rgba(18, 18, 18, 0.75);
            backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
            z-index: 1000; display: none; align-items: center; justify-content: center;
            opacity: 0; transition: opacity 0.3s ease;
        `;
        
        const style = document.createElement('style');
        style.innerHTML = `
            #quick-view-modal.show { display: flex; opacity: 1; }
            .quick-view-card {
                background: var(--color-paper-white);
                color: var(--color-deep-charcoal);
                width: 90%;
                max-width: 700px;
                border-radius: var(--border-radius-lg);
                border: 1px solid var(--color-border-subtle);
                box-shadow: 0 20px 50px rgba(0,0,0,0.15);
                overflow: hidden;
                position: relative;
                animation: quickViewScaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            }
            @keyframes quickViewScaleUp {
                from { transform: scale(0.92); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            .quick-view-close {
                position: absolute;
                top: 20px;
                right: 20px;
                font-size: 28px;
                color: var(--color-soft-slate);
                cursor: pointer;
                transition: var(--transition-fast);
                z-index: 10;
            }
            .quick-view-close:hover {
                color: var(--color-deep-charcoal);
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // Close modal when clicking outside the card
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeQuickView();
            }
        });
    }
    
    // Register product in global registry for reliable cart lookup
    if (!window._productRegistry) window._productRegistry = {};
    window._productRegistry[product.id] = product;

    const isFav = getFavorites().includes(product.id);
    const favStyle = isFav ? 'style="color: red;"' : '';
    const favClass = isFav ? 'material-symbols-outlined active-favorite' : 'material-symbols-outlined';
    
    modal.innerHTML = `
        <div class="quick-view-card">
            <span class="material-symbols-outlined quick-view-close" onclick="closeQuickView()">close</span>
            <div class="grid-cols-12" style="gap: 0;">
                <div class="col-span-6" style="background-color: var(--color-surface-container); display: flex; align-items: center; justify-content: center; padding: 40px; height: 380px;">
                    <img src="${product.image}" alt="${product.title}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                </div>
                <div class="col-span-6" style="padding: 40px; display: flex; flex-direction: column; justify-content: center; text-align: left;">
                    <span class="text-label-md" style="color: var(--color-muted-gold); margin-bottom: 8px; display: block; text-transform: uppercase;">${product.category}</span>
                    <h2 class="font-serif" style="font-size: 1.8rem; margin-bottom: 8px; line-height: 1.2;">${product.title}</h2>
                    <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-muted-gold); margin-bottom: 16px;">${new Intl.NumberFormat('fr-FR').format(product.price)} FCFA</div>
                    <p class="text-body-md" style="font-size: 0.85rem; line-height: 1.6; margin-bottom: 16px; color: var(--color-soft-slate);">${product.desc}</p>
                    <div class="text-caption" style="font-size: 0.75rem; margin-bottom: 24px;"><strong>Spécifications :</strong> ${product.specs}</div>
                    
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <button class="btn btn-primary" style="flex-grow: 1; padding: 14px 0;" onclick="addToCartFromQuickView(); closeQuickView();">Ajouter au Panier</button>
                        <button class="btn btn-secondary" data-product-id="${product.id}" style="width: 48px; height: 48px; padding: 0; display: flex; align-items: center; justify-content: center;" onclick="toggleFavoriteMockup(this, '${product.id}');">
                            <span class="${favClass}" ${favStyle} style="font-size: 20px;">favorite</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
}

function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
        modal.classList.remove('show');
    }
    window._quickViewProduct = null;
}

// Cart from QuickView modal — uses stored product object directly
function addToCartFromQuickView() {
    const p = window._quickViewProduct;
    if (p) addToCartDirect(p.id);
}
window.addToCartFromQuickView = addToCartFromQuickView;

// Bind to window to ensure HTML inline onclick hooks function flawlessly
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.addToCart = addToCart;
window.addToCartMockup = addToCartMockup;
window.toggleFavorite = toggleFavorite;
window.toggleFavoriteMockup = toggleFavoriteMockup;
window.toggleDrawer = toggleDrawer;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;

// Active interactions hook with robust ReadyState check to prevent DOM ready race conditions
function runInit() {
    initNavigation();
    initTiltCards();
    initBookingWidget();
    initVirtualTryOn();
    injectLuxuryInteractions();
    injectEmptyCartModal();
    syncFavoriteUIs();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInit);
} else {
    runInit();
}

// Retrocompatible Mock overrides
function addToCartMockup(productId, event) {
    if (productId) {
        // Try to get fallback data from the clicked element's closest product card
        let fallbackData = null;
        try {
            const btn = event && event.target ? event.target : document.querySelector(`[onclick*="${productId}"]`);
            const card = btn ? btn.closest('[data-product-id]') || btn.closest('.product-card') : null;
            if (card) {
                fallbackData = {
                    title: card.getAttribute('data-product-title'),
                    price: card.getAttribute('data-product-price'),
                    image: card.getAttribute('data-product-image')
                };
            }
        } catch(e) { /* silent */ }
        addToCart(productId, fallbackData);
    } else {
        alert("Produit ajouté à votre panier d'excellence.");
    }
}
function toggleFavoriteMockup(element, productId) {
    if (productId) {
        toggleFavorite(productId, element);
    } else {
        element.style.color = element.style.color === 'red' ? '' : 'red';
    }
}

// Dynamically inject Empty Cart Modal
function injectEmptyCartModal() {
    if (document.getElementById('empty-cart-modal')) return;
    
    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
        .empty-cart-modal-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(18, 18, 18, 0.4);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            z-index: 1000000;
            display: none;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            padding: 24px;
        }
        .empty-cart-modal-overlay.show {
            display: flex;
            opacity: 1;
        }
        .empty-cart-modal-card {
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(197, 160, 89, 0.25);
            border-radius: var(--border-radius-xl);
            width: 100%;
            max-width: 420px;
            padding: 48px 40px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6);
            transform: translateY(20px) scale(0.96);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            gap: 24px;
        }
        .empty-cart-modal-overlay.show .empty-cart-modal-card {
            transform: translateY(0) scale(1);
        }
        .empty-cart-icon-container {
            width: 80px;
            height: 80px;
            border-radius: var(--border-radius-full);
            background: linear-gradient(135deg, rgba(197, 160, 89, 0.15), rgba(197, 160, 89, 0.02));
            border: 1px solid rgba(197, 160, 89, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--color-muted-gold);
            box-shadow: 0 10px 20px rgba(197, 160, 89, 0.05);
            animation: emptyCartPulse 2s infinite ease-in-out;
        }
        @keyframes emptyCartPulse {
            0% { transform: scale(1); box-shadow: 0 10px 20px rgba(197, 160, 89, 0.05); }
            50% { transform: scale(1.05); box-shadow: 0 10px 25px rgba(197, 160, 89, 0.15); }
            100% { transform: scale(1); box-shadow: 0 10px 20px rgba(197, 160, 89, 0.05); }
        }
    `;
    document.head.appendChild(style);
    
    // Inject HTML modal structure
    const modalDiv = document.createElement('div');
    modalDiv.className = 'empty-cart-modal-overlay';
    modalDiv.id = 'empty-cart-modal';
    modalDiv.onclick = (e) => {
        if (e.target === modalDiv) closeEmptyCartModal();
    };
    
    modalDiv.innerHTML = `
        <div class="empty-cart-modal-card" onclick="event.stopPropagation()">
            <div class="empty-cart-icon-container">
                <span class="material-symbols-outlined" style="font-size: 36px;">shopping_bag</span>
            </div>
            <div>
                <h3 class="font-serif" style="margin: 0 0 10px 0; color: var(--color-deep-charcoal); font-size: 1.75rem; font-weight: 500; letter-spacing: -0.01em;">Votre panier est vide</h3>
                <p style="color: var(--color-soft-slate); font-size: 0.95rem; line-height: 1.6; margin: 0; max-width: 320px;">Parcourez notre collection exclusive de montures d'exception pour trouver la paire qui sublimera votre regard.</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; margin-top: 8px;">
                <a href="boutique.html" class="btn btn-gold" style="padding: 16px 0; text-align: center; width: 100%; text-transform: uppercase; font-size: 0.8rem; font-weight: 700; border-radius: var(--border-radius-md); display: inline-block; box-shadow: 0 10px 20px rgba(197, 160, 89, 0.15); transition: var(--transition-smooth);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 15px 25px rgba(197,160,89,0.3)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 10px 20px rgba(197,160,89,0.15)';">Visiter la Boutique</a>
                <button onclick="closeEmptyCartModal()" class="btn btn-secondary" style="padding: 16px 0; width: 100%; border: 1px solid var(--color-border-subtle); border-radius: var(--border-radius-md); font-weight: 600; cursor: pointer; color: var(--color-soft-slate); background: transparent; transition: var(--transition-smooth);" onmouseover="this.style.borderColor='var(--color-muted-gold)'; this.style.color='var(--color-muted-gold)'; this.style.background='var(--color-gold-tint)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='var(--color-border-subtle)'; this.style.color='var(--color-soft-slate)'; this.style.background='transparent'; this.style.transform='none';">Fermer</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalDiv);
}

function showEmptyCartModal() {
    const modal = document.getElementById('empty-cart-modal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }
}

function closeEmptyCartModal() {
    const modal = document.getElementById('empty-cart-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

window.closeEmptyCartModal = closeEmptyCartModal;
window.showEmptyCartModal = showEmptyCartModal;

/* --- AI Concierge Chat Drawer Helper Functions --- */

// Markdown to Safe HTML parser for AI chat bubbles
function parseMarkdown(text) {
    // Basic HTML escaping
    let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    // Replace bold text **bold**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace italic text *italic*
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Replace code blocks `code`
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');

    // Split into paragraphs and lists
    const lines = html.split('\n');
    let insideList = false;
    let result = '';

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) {
            if (insideList) {
                result += '</ul>';
                insideList = false;
            }
            continue;
        }

        if (line.startsWith('- ') || line.startsWith('* ')) {
            if (!insideList) {
                result += '<ul style="margin: 8px 0; padding-left: 20px; list-style-type: disc;">';
                insideList = true;
            }
            result += `<li style="margin-bottom: 4px;">${line.substring(2)}</li>`;
        } else {
            if (insideList) {
                result += '</ul>';
                insideList = false;
            }
            result += `<p style="margin-bottom: 8px; line-height: 1.5;">${line}</p>`;
        }
    }

    if (insideList) {
        result += '</ul>';
    }

    return result;
}

// Generate the customized system prompt containing live catalog data
function getChatSystemPrompt() {
    let productsListText = "";
    try {
        const products = typeof getProducts === 'function' ? getProducts() : [];
        if (products && products.length > 0) {
            productsListText = products.map(p => {
                return `- [ID: ${p.id}] ${p.title} (${p.category || 'Optique'}, pour ${p.gender || 'Mixte'}). Prix: ${new Intl.NumberFormat('fr-FR').format(p.price)} FCFA. Description: ${p.desc || ''}. Spécifications: ${p.specs || ''}. Tag: ${p.tag || ''}.`;
            }).join('\n');
        }
    } catch (e) {
        console.warn("Could not load products for chat system prompt:", e);
    }

    return `Tu es Antoine, un conseiller visagiste et concierge d'élite pour le salon d'optique de prestige "Mage Optique & Services", situé à Dakar, Ouest Foire (Sénégal).
Ton ton est extrêmement professionnel, poli, courtois, intellectuel et chaleureux, digne d'un service de conciergerie de luxe.

Règles de comportement :
1. Réponds toujours en français, avec élégance et distinction.
2. Tu dois guider les clients sur le choix de leurs montures en fonction de leur visage (forme, teint), leurs besoins (verres correcteurs, solaires) ou leurs goûts.
3. Renseigne-les sur les services du salon :
   - Examen de vue professionnel en salon (prix : 25 000 FCFA, mais OFFERT si l'examen est suivi d'un achat).
   - Service d'essai de montures à domicile (prix : 7 500 FCFA sur rendez-vous).
   - Service de visagisme personnalisé.
   - Demande de devis en ligne et analyse d'ordonnance avec notre formulaire professionnel sur la page 'services.html#devisOnlineForm'.
   - Prise de rendez-vous en ligne sur la page 'contact.html' avec génération de billets de consultation artistiques.
4. Encourage poliment l'utilisation des fonctionnalités du site :
   - L'essai virtuel 3D (Virtual Try-On) disponible directement sur la fiche produit de chaque modèle (page 'details.html'), qui permet d'ajuster les lunettes en direct avec la webcam ou d'importer une photo.
   - La page de contact ('contact.html') pour réserver un créneau.
   - La page de devis ('services.html#devisOnlineForm') pour soumettre une ordonnance.
   - La boutique ('boutique.html') pour filtrer les montures (Optique, Solaire, Éditions Limitées) pour Hommes, Femmes, Enfants.
5. Sois concis dans tes réponses pour que le chat reste fluide, mais reste toujours extrêmement poli et serviable.
6. Voici les produits actuellement disponibles en stock dans notre catalogue (réfère-toi à eux avec précision, sans inventer d'autres produits) :
${productsListText || "Aucun produit en stock actuellement."}

Rappelle-toi d'être à l'écoute et de guider l'utilisateur comme s'il était un client VIP dans notre salon de prestige de Dakar.`;
}

// Main initializer for the chat drawer components and OpenRouter API
function initChatDrawer(drawer) {
    const messagesContainer = document.getElementById('chat-drawer-messages');
    const userInput = document.getElementById('chat-user-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const clearBtn = document.getElementById('chat-clear-btn');
    const settingsToggleBtn = document.getElementById('chat-settings-toggle-btn');
    const settingsPanel = document.getElementById('chat-settings-panel');
    const apiKeyInput = document.getElementById('chat-api-key-input');
    const toggleKeyVisibilityBtn = document.getElementById('chat-toggle-key-visibility');
    const modelSelect = document.getElementById('chat-model-select');
    const saveSettingsBtn = document.getElementById('chat-save-settings-btn');
    const apiWarning = document.getElementById('chat-api-warning');
    const openSettingsLink = document.getElementById('chat-open-settings-link');
    const typingIndicator = document.getElementById('chat-typing-indicator');

    let chatHistory = [];
    const defaultGreeting = `Bonjour ! Je suis <strong>Antoine</strong>, votre conseiller visagiste et concierge d'exception pour <strong>Mage Optique & Services</strong>.<br><br>Comment puis-je magnifier votre regard aujourd'hui ? Décrivez-moi votre visage ou posez-moi vos questions.`;

    function checkApiKeyStatus() {
        const rawKey = localStorage.getItem('mage_optique_openrouter_key') || '';
        const key = typeof deobfuscateKey === 'function' ? deobfuscateKey(rawKey) : rawKey;
        if (!key) {
            apiWarning.style.display = 'block';
            userInput.disabled = true;
            userInput.placeholder = "Configurez la clé API pour chater...";
            sendBtn.disabled = true;
            sendBtn.style.opacity = '0.5';
        } else {
            apiWarning.style.display = 'none';
            userInput.disabled = false;
            userInput.placeholder = "Posez votre question...";
            sendBtn.disabled = false;
            sendBtn.style.opacity = '1';
        }
    }

    // 2. Helper: Render a single message bubble
    function renderMessage(role, content, isHtml = false) {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${role}`;
        
        if (isHtml) {
            bubble.innerHTML = content;
        } else {
            bubble.innerHTML = parseMarkdown(content);
        }
        
        messagesContainer.appendChild(bubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // 3. Helper: Load conversation history
    function loadChatHistory() {
        // Clear all except initial greeting
        messagesContainer.innerHTML = '';
        
        const storedHistory = sessionStorage.getItem('mage_optique_chat_history');
        if (storedHistory) {
            try {
                chatHistory = JSON.parse(storedHistory);
                if (chatHistory.length > 0) {
                    chatHistory.forEach(msg => {
                        renderMessage(msg.role, msg.content);
                    });
                    return;
                }
            } catch (e) {
                console.error("Error parsing chat history:", e);
            }
        }
        
        // Default history (empty)
        chatHistory = [];
        // Show default greeting
        renderMessage('assistant', defaultGreeting, true);
    }

    // 4. Save history to sessionStorage
    function saveHistory() {
        sessionStorage.setItem('mage_optique_chat_history', JSON.stringify(chatHistory));
    }

    // 5. Settings Events
    settingsToggleBtn.addEventListener('click', () => {
        settingsPanel.classList.toggle('show');
    });

    if (openSettingsLink) {
        openSettingsLink.addEventListener('click', (e) => {
            e.preventDefault();
            settingsPanel.classList.add('show');
        });
    }

    toggleKeyVisibilityBtn.addEventListener('click', () => {
        const iconSpan = toggleKeyVisibilityBtn.querySelector('.material-symbols-outlined');
        if (apiKeyInput.type === 'password') {
            apiKeyInput.type = 'text';
            iconSpan.textContent = 'visibility_off';
        } else {
            apiKeyInput.type = 'password';
            iconSpan.textContent = 'visibility';
        }
    });

    // Load saved settings on init
    const rawKeyOnInit = localStorage.getItem('mage_optique_openrouter_key') || '';
    apiKeyInput.value = typeof deobfuscateKey === 'function' ? deobfuscateKey(rawKeyOnInit) : rawKeyOnInit;
    let savedModel = localStorage.getItem('mage_optique_openrouter_model') || 'google/gemma-4-31b-it:free';
    if (savedModel === 'google/gemma-2-9b-it:free' || savedModel === 'meta-llama/llama-3-8b-instruct:free' || savedModel === 'mistralai/mistral-7b-instruct:free' || savedModel === 'meta-llama/llama-3.3-70b-instruct:free' || savedModel === 'openrouter/free') {
        savedModel = 'google/gemma-4-31b-it:free';
        localStorage.setItem('mage_optique_openrouter_model', savedModel);
    }
    modelSelect.value = savedModel;

    saveSettingsBtn.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        const model = modelSelect.value;
        
        const storedKey = typeof obfuscateKey === 'function' ? obfuscateKey(key) : key;
        localStorage.setItem('mage_optique_openrouter_key', storedKey);
        localStorage.setItem('mage_optique_openrouter_model', model);
        
        settingsPanel.classList.remove('show');
        checkApiKeyStatus();
        
        if (typeof showToast === 'function') {
            showToast('Paramètres de l\'IA mis à jour avec succès.', 'success');
        } else {
            alert('Paramètres sauvegardés.');
        }
    });

    // 6. Clear chat
    clearBtn.addEventListener('click', () => {
        if (confirm("Voulez-vous réinitialiser la conversation ?")) {
            sessionStorage.removeItem('mage_optique_chat_history');
            loadChatHistory();
        }
    });

    // 7. Send message logic
    async function handleSendMessage() {
        const text = userInput.value.trim();
        const rawKey = localStorage.getItem('mage_optique_openrouter_key') || '';
        const key = typeof deobfuscateKey === 'function' ? deobfuscateKey(rawKey) : rawKey;
        const model = localStorage.getItem('mage_optique_openrouter_model') || 'google/gemma-4-31b-it:free';

        if (!text || !key) return;

        // Render user message
        renderMessage('user', text);
        userInput.value = '';

        // Add to history
        chatHistory.push({ role: 'user', content: text });
        saveHistory();

        // Show typing indicator
        typingIndicator.classList.add('show');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            // Build system prompt with live product database
            const systemPrompt = getChatSystemPrompt();
            
            // Build messages array for API (including system prompt)
            const messagesForAPI = [
                { role: 'system', content: systemPrompt },
                ...chatHistory
            ];

            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${key}`,
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Mage Optique & Services'
                },
                body: JSON.stringify({
                    model: model,
                    messages: messagesForAPI
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error?.message || `Status code: ${response.status}`);
            }

            const data = await response.json();
            const reply = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";

            // Hide typing
            typingIndicator.classList.remove('show');

            // Render assistant reply
            renderMessage('assistant', reply);

            // Add to history
            chatHistory.push({ role: 'assistant', content: reply });
            saveHistory();

        } catch (error) {
            console.error("OpenRouter API Error:", error);
            typingIndicator.classList.remove('show');
            renderMessage('error-bubble', `Erreur API : ${error.message || 'Impossible de contacter le serveur OpenRouter.'}. Veuillez vérifier vos paramètres.`);
        }
    }

    sendBtn.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // Init state
    checkApiKeyStatus();
    loadChatHistory();
}

