document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
  // Image Lightbox Logic
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('expandedImg');
  const closeBtn = document.querySelector('.modal-close');

  // Select all images we want to make clickable
  const clickableImages = document.querySelectorAll('.project-media img, .lead-image-wrapper img, .entrepreneur-image img, .savoria-photo-grid img');

  clickableImages.forEach(img => {
    img.addEventListener('click', function() {
      modal.classList.add('show');
      modalImg.src = this.src;
      // Disable background scrolling when modal is open
      document.body.style.overflow = 'hidden'; 
    });
  });

  // Close modal when clicking the "X"
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
  }

  // Close modal when clicking anywhere on the dark background
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    });
  }
  // Custom Local Video Controls (Play/Pause & Sound)
  const localVideo = document.getElementById('savoria-local-video');
  const videoOverlay = document.getElementById('video-overlay');
  const videoSoundBtn = document.getElementById('video-sound-btn');
  
  if (localVideo && videoOverlay && videoSoundBtn) {
    // Click anywhere on the video overlay to Play/Pause
    videoOverlay.addEventListener('click', () => {
      if (localVideo.paused) {
        localVideo.play();
      } else {
        localVideo.pause();
      }
    });

    // Click button in the corner to Mute/Unmute
    videoSoundBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevents the click from triggering the pause overlay
      localVideo.muted = !localVideo.muted;
      
      // Update icon dynamically
      if (localVideo.muted) {
        videoSoundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      } else {
        videoSoundBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      }
    });
  }
});