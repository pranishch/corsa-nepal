// Main.js - Combined JavaScript for Corsa Nepal Adventure

// ==========================================
// GOOGLE ANALYTICS
// ==========================================
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-T0G7QFQJRE');

// ==========================================
// ALL DOM-INIT IN ONE PLACE (recommended)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    // --------------------------
    // PLAN TRIP MODAL
    // --------------------------
    const planModal = document.getElementById("planTripModal");
    const planForm = document.getElementById("planTripForm");

    if (planModal) {
        // Open modal from book-my-escape-item
        const openButtons = document.getElementsByClassName("book-my-escape-item");
        for (let i = 0; i < openButtons.length; i++) {
            openButtons[i].addEventListener("click", function () {
                planModal.style.display = "block";
            });
        }

        // Close button (generic .close-btn inside modal)
        const planCloseButton = planModal.querySelector(".close-btn") || document.getElementsByClassName("close-btn")[0];
        if (planCloseButton) {
            planCloseButton.addEventListener("click", function () {
                if (planForm) planForm.reset();
                planModal.style.display = "none";
            });
        }

        // Handle form submission
        if (planForm) {
            planForm.addEventListener("submit", function (e) {
                e.preventDefault();

                const name = document.getElementById("tripName")?.value || "";
                const nationality = document.getElementById("tripNationality")?.value || "";
                const email = document.getElementById("tripEmail")?.value || "";
                const mobile = document.getElementById("tripMobile")?.value || "";
                const message = document.getElementById("tripMessage")?.value || "";

                console.log("Form Submitted:");
                console.log("Name:", name);
                console.log("Nationality:", nationality);
                console.log("Email:", email);
                console.log("Mobile:", mobile);
                console.log("Message:", message);

                alert("Thank you! Your trip details have been submitted.");

                planForm.reset();
                planModal.style.display = "none";
            });
        }
    }

    // --------------------------
    // SET PLAN BUTTONS (uses same plan modal)
    // --------------------------
    if (planModal) {
        document.querySelectorAll('.set-plan-button, .set-plan-button-mobile').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                planModal.style.display = 'flex';
            });
        });
    }

    // --------------------------
    // LINKS WITH HREF #planTripModal (delegated)
    // --------------------------
    document.body.addEventListener("click", function (e) {
        const target = e.target.closest("a[href='#planTripModal']");
        if (target) {
            e.preventDefault();
            if (planModal) planModal.style.display = "flex";
        }
    });

    // --------------------------
    // OPEN MODAL LINK (explicit trigger)
    // --------------------------
    const modalTrigger = document.querySelector('.open-modal-link');
    if (modalTrigger && planModal) {
        const closeBtn = planModal.querySelector('.close-btn');

        modalTrigger.addEventListener('click', function (e) {
            e.preventDefault();
            planModal.style.display = 'block';
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                planModal.style.display = 'none';
            });
        }
    }

    // --------------------------
    // DROPDOWN MENU
    // --------------------------
    const dropdown = document.getElementById('dropdown');
    const dropdownContent = document.getElementById('dropdown-content');
    let hideTimer;
    if (dropdown && dropdownContent) {
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(hideTimer);
            dropdownContent.style.display = 'flex';
        });

        dropdown.addEventListener('mouseleave', () => {
            hideTimer = setTimeout(() => {
                dropdownContent.style.display = 'none';
            }, 500);
        });
    } else {
        console.warn("Dropdown elements not found in DOM.");
    }

    // --------------------------
    // MOBILE NAVIGATION - JQUERY (kept as original)
    // --------------------------
    if (window.jQuery) {
        $(function () {
            $("#mobile-nav").hide();

            $("#menu-icon").click(function () {
                $("#mobile-nav").slideToggle(500);
            });

            $(document).click(function (e) {
                if (!$(e.target).closest("#mobile-nav, #menu-icon").length) {
                    $("#mobile-nav").slideUp(500);
                }
            });
        });
    }

    // --------------------------
    // LIGHTBOX FOR CERTIFICATES
    // --------------------------
    const certificateImgs = document.querySelectorAll(".certificate img");
    const lightbox = document.getElementById("lightbox");

    if (certificateImgs.length && lightbox) {
        const lightboxImg = document.getElementById("lightbox-img");
        const caption = document.getElementById("lightbox-caption");
        const certClose = lightbox.querySelector(".close");
        const certPrev = lightbox.querySelector(".prev");
        const certNext = lightbox.querySelector(".next");

        let certCurrentIndex = 0;
        const certImages = Array.from(certificateImgs).map(img => ({
            src: img.getAttribute("data-full") || img.src,
            alt: img.alt,
            title: img.title || ""
        }));

        function openLightbox(index) {
            certCurrentIndex = index;
            lightbox.style.display = "block";
            updateLightbox();
        }

        function updateLightbox() {
            const { src, title } = certImages[certCurrentIndex];
            if (lightboxImg) lightboxImg.src = src;
            if (caption) caption.textContent = title;
        }

        certificateImgs.forEach((img, i) => {
            img.addEventListener("click", () => openLightbox(i));
        });

        if (certClose) {
            certClose.onclick = () => {
                lightbox.style.display = "none";
            };
        }

        if (certNext) {
            certNext.onclick = () => {
                certCurrentIndex = (certCurrentIndex + 1) % certImages.length;
                updateLightbox();
            };
        }

        if (certPrev) {
            certPrev.onclick = () => {
                certCurrentIndex = (certCurrentIndex - 1 + certImages.length) % certImages.length;
                updateLightbox();
            };
        }

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });

        document.addEventListener("keydown", (e) => {
            if (lightbox.style.display === "block") {
                if (e.key === "ArrowRight" && certNext) certNext.click();
                if (e.key === "ArrowLeft" && certPrev) certPrev.click();
                if (e.key === "Escape" && certClose) certClose.click();
            }
        });
    }

    // --------------------------
    // FLIGHT MID-BANNER IMAGE MODAL (your provided code, names scoped to avoid conflicts)
    // --------------------------
    const flightImgsNode = document.querySelectorAll(".flight-midBanner img");
    if (flightImgsNode.length) {
        const flightImages = Array.from(flightImgsNode).map(img => img); // keep original <img> nodes
        let flightCurrentIndex = 0;

        function openFlightModal(index) {
            const modal = document.getElementById("imageModal");
            const modalImg = document.getElementById("modalImage");
            if (!modal || !modalImg) return;
            modal.style.display = "block";
            modalImg.src = flightImages[index].src;
            flightCurrentIndex = index;
        }

        function closeFlightModal() {
            const modal = document.getElementById("imageModal");
            if (modal) modal.style.display = "none";
        }

        function changeFlightImage(direction) {
            flightCurrentIndex += direction;
            if (flightCurrentIndex < 0) flightCurrentIndex = flightImages.length - 1;
            if (flightCurrentIndex >= flightImages.length) flightCurrentIndex = 0;
            const modalImg = document.getElementById("modalImage");
            if (modalImg) modalImg.src = flightImages[flightCurrentIndex].src;
        }

        // Expose functions globally so inline HTML onclick works
        window.closeModal = closeFlightModal;
        window.changeImage = changeFlightImage;

        // Attach click events to images
        flightImages.forEach((img, index) => {
            img.addEventListener("click", () => openFlightModal(index));
        });

        // Optional: prev/next buttons (IDs: modalPrev, modalNext)
        const flightPrevBtn = document.getElementById("modalPrev");
        const flightNextBtn = document.getElementById("modalNext");
        if (flightPrevBtn) flightPrevBtn.addEventListener("click", (e) => { e.stopPropagation(); changeFlightImage(-1); });
        if (flightNextBtn) flightNextBtn.addEventListener("click", (e) => { e.stopPropagation(); changeFlightImage(1); });

        // keyboard navigation for flight modal
        document.addEventListener("keydown", (e) => {
            const imageModal = document.getElementById("imageModal");
            if (imageModal && imageModal.style.display === "block") {
                if (e.key === "ArrowRight") changeFlightImage(1);
                if (e.key === "ArrowLeft") changeFlightImage(-1);
                if (e.key === "Escape") closeFlightModal();
            }
        });
    }

    // --------------------------
    // GLOBAL window click handler to close modals when clicking on modal background
    // (handles planTripModal, lightbox, imageModal)
    // --------------------------
    window.addEventListener("click", function (e) {
        // plan modal background
        if (planModal && e.target === planModal) {
            if (planForm) planForm.reset();
            planModal.style.display = "none";
        }

        // certificate lightbox background
        const lb = document.getElementById("lightbox");
        if (lb && e.target === lb) {
            lb.style.display = "none";
        }

        // flight image modal background
        const imgModal = document.getElementById("imageModal");
        if (imgModal && e.target === imgModal) {
            imgModal.style.display = "none";
        }
    });

    // ------------------------------------------
    // READ MORE / READ LESS TOGGLE
    // ------------------------------------------
    const readMoreBtn = document.getElementById('readMore');
    const desc = document.getElementById('description');

    if (readMoreBtn && desc) {
        readMoreBtn.addEventListener('click', function () {
            desc.classList.toggle('expanded');
            this.textContent = desc.classList.contains('expanded')
                ? 'Read Less <<'
                : 'Read More >>';
        });
    }


}); // end DOMContentLoaded
