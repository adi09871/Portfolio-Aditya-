import { resumeData } from './resumeData.js';

// ==========================================================================
// SYSTEM STATE & CONFIG
// ==========================================================================
const state = {
  currentProjectIdx: 0,
  isHapticOn: true
};

// DOM elements cache
const dom = {
  body: document.body,
  mainScrollPanel: document.getElementById('main-scroll-panel'),
  menuItems: document.querySelectorAll('.menu-item'),
  
  // Carousel elements
  slides: document.querySelectorAll('.phone-mockup-slide'),
  btnPrev: document.getElementById('btn-mock-prev'),
  btnNext: document.getElementById('btn-mock-next'),
  
  // Android robot
  androidRobot: document.querySelector('.android-robot-svg'),
  
  // Mailbox
  mailboxSvg: document.querySelector('.mailbox-svg'),
  
  // Rocket launcher
  footerRocket: document.getElementById('footer-rocket-box'),
  flyingRocket: document.getElementById('flying-rocket'),
  
  // Fullscreen project modal
  projectModal: document.getElementById('projects-detail-modal'),
  btnModalClose: document.getElementById('btn-modal-close-trigger'),
  modalAppIcon: document.getElementById('modal-app-icon-indicator'),
  modalTitle: document.getElementById('modal-project-title'),
  modalSubtitle: document.getElementById('modal-project-subtitle'),
  modalDesc: document.getElementById('modal-project-desc-txt'),
  modalChallenge: document.getElementById('modal-project-challenge-txt'),
  modalChips: document.getElementById('modal-project-chips-target'),
  modalGithub: document.getElementById('modal-project-github-anchor'),
  
  // System Toast
  systemToast: document.getElementById('system-toast-alert'),
  toastText: document.getElementById('toast-text-alert'),
};

// ==========================================================================
// SYSTEM INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  setupSidebarNavigation();
  setupProjectsCarousel();
  setupModalHandlers();
  setupInteractiveWows();
  setupResumePromptModal();
});

// ==========================================================================
// SIDEBAR NAV MENU SMOOTH SCROLLS & OBSERVERS
// ==========================================================================
function setupSidebarNavigation() {
  // Sidebar items click trigger
  dom.menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.dataset.target;
      const targetEl = document.getElementById(targetId);
      
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update active class immediately
        dom.menuItems.forEach(m => m.classList.remove('active'));
        item.classList.add('active');
        
        triggerHapticPulse();
      }
    });
  });

  // Expose global scroll helper for footer/hero buttons
  window.scrollToSection = (sectionId) => {
    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      triggerHapticPulse();
    }
  };

  // IntersectionObserver to auto-highlight active section on scroll
  const observerOptions = {
    root: dom.mainScrollPanel,
    rootMargin: '0px -10% -80% 0px', // Trigger when section is in top-middle of view
    threshold: 0
  };

  const sectionIds = ['sec-hero', 'sec-projects-row', 'sec-experience-container', 'sec-skills-container', 'sec-achievements-container', 'sec-about-container', 'sec-contact-container'];
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        
        // Find corresponding menu item
        dom.menuItems.forEach(item => {
          if (item.dataset.target === id) {
            dom.menuItems.forEach(m => m.classList.remove('active'));
            item.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

// ==========================================================================
// PROJECTS CAROUSEL PHONE MOCKUPS
// ==========================================================================
function setupProjectsCarousel() {
  if (!dom.btnNext || !dom.btnPrev) return;
  
  const updateCarouselUI = () => {
    dom.slides.forEach((slide, idx) => {
      if (idx === state.currentProjectIdx) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  };

  dom.btnNext.addEventListener('click', () => {
    if (state.currentProjectIdx < dom.slides.length - 1) {
      state.currentProjectIdx++;
      updateCarouselUI();
      triggerHapticPulse();
    } else {
      // Loop back
      state.currentProjectIdx = 0;
      updateCarouselUI();
      triggerHapticPulse();
    }
  });

  dom.btnPrev.addEventListener('click', () => {
    if (state.currentProjectIdx > 0) {
      state.currentProjectIdx--;
      updateCarouselUI();
      triggerHapticPulse();
    } else {
      // Loop forward
      state.currentProjectIdx = dom.slides.length - 1;
      updateCarouselUI();
      triggerHapticPulse();
    }
  });
}

// ==========================================================================
// CASE STUDY MODAL TRIGGERS
// ==========================================================================
function setupModalHandlers() {
  dom.btnModalClose.addEventListener('click', () => {
    closeModal();
    triggerHapticPulse();
  });

  // Click outside backdrop to close
  document.querySelector('.modal-backdrop-blur').addEventListener('click', () => {
    closeModal();
  });
}

function openProjectCaseStudy(proj) {
  let iconClass = 'modal-app-icon icon-trackbus';
  let shortName = proj.title.charAt(0);
  if (proj.id === 'pregnancytracker') iconClass = 'modal-app-icon icon-pregnancy';
  if (proj.id === 'resq') iconClass = 'modal-app-icon icon-resq';
  
  dom.modalAppIcon.className = iconClass;
  dom.modalAppIcon.textContent = shortName;
  
  dom.modalTitle.textContent = proj.title;
  dom.modalSubtitle.textContent = proj.subtitle;
  
  let bulletsHTML = '<ul class="job-points-list">';
  proj.details.forEach(detail => {
    bulletsHTML += `<li>${detail}</li>`;
  });
  bulletsHTML += '</ul>';
  dom.modalDesc.innerHTML = bulletsHTML;
  
  dom.modalChallenge.textContent = proj.challenge;
  
  // Populate chips tags
  dom.modalChips.innerHTML = '';
  proj.skills.forEach(s => {
    const span = document.createElement('span');
    span.className = 'proj-badge-chip';
    span.textContent = s;
    dom.modalChips.appendChild(span);
  });
  
  // Wire GitHub link
  dom.modalGithub.href = proj.github;
  
  dom.projectModal.classList.add('open');
  triggerHapticPulse();
}

function closeModal() {
  dom.projectModal.classList.remove('open');
}

// ==========================================================================
// INTERACTIVE DROID, MAILBOX & ROCKET ANIMATIONS
// ==========================================================================
function setupInteractiveWows() {
  // 1. Android Droid waves on hover/touch
  if (dom.androidRobot) {
    dom.androidRobot.addEventListener('click', () => {
      showSystemToast('Android Droid says: Hello recruiter! Wave back.');
      triggerHapticPulse();
    });
  }

  // 2. Mailbox winks/vibrates flag
  if (dom.mailboxSvg) {
    dom.mailboxSvg.addEventListener('click', () => {
      showSystemToast('Mailbox flag raised: Checked message logs.');
      triggerHapticPulse();
    });
  }

  // 3. Rocket launch simulator
  if (dom.footerRocket) {
    dom.footerRocket.addEventListener('click', () => {
      showSystemToast('Igniting rocket engine! Launching...');
      triggerHapticPulse();
      
      // Animate translate offset up
      dom.flyingRocket.style.transition = 'transform 1.8s cubic-bezier(0.6, -0.28, 0.735, 0.045)';
      dom.flyingRocket.style.transform = 'translateY(-1200px) scale(0.6)';
      
      setTimeout(() => {
        // Reset rocket position
        dom.flyingRocket.style.transition = 'none';
        dom.flyingRocket.style.transform = '';
        showSystemToast('Rocket landed successfully');
        triggerHapticPulse();
      }, 2200);
    });
  }

  // Expose global case modal trigger
  window.triggerCaseModal = (projId) => {
    const proj = resumeData.projects.find(p => p.id === projId);
    if (proj) openProjectCaseStudy(proj);
  };
  
  // Custom click ripple effects
  dom.body.addEventListener('mousedown', (e) => {
    createRipple(e);
  });
}

// Utility Toast & Ripples
function triggerHapticPulse() {
  if (!state.isHapticOn) return;
  dom.body.classList.add('screen-click-pulse');
  setTimeout(() => { dom.body.classList.remove('screen-click-pulse'); }, 100);
}

function showSystemToast(msg) {
  dom.toastText.textContent = msg;
  dom.systemToast.classList.add('show');
  setTimeout(() => { dom.systemToast.classList.remove('show'); }, 2500);
}

function createRipple(event) {
  const container = event.target.closest('button, .menu-item, .phone-mockup-slide, .tool-circle, .achievement-mini-tile');
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const x = (event.clientX || event.pageX) - rect.left;
  const y = (event.clientY || event.pageY) - rect.top;

  const ripple = document.createElement('span');
  ripple.className = 'material-ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  container.style.position = 'relative';
  container.style.overflow = 'hidden';
  container.appendChild(ripple);

  ripple.addEventListener('animationend', () => { ripple.remove(); });
}

// ==========================================================================
// RESUME DOWNLOAD PROMPT POPUP (AUTO POPUP AFTER 3-4 SECONDS)
// ==========================================================================
function setupResumePromptModal() {
  const resumeModal = document.getElementById('resume-download-modal');
  if (!resumeModal) return;

  const closeTriggers = [
    document.getElementById('btn-close-resume-modal'),
    document.getElementById('btn-close-resume-modal-secondary'),
    document.getElementById('btn-close-resume-backdrop'),
    document.getElementById('btn-resume-download-confirm-trigger')
  ];

  const closeModalFunc = () => {
    resumeModal.classList.remove('open');
    triggerHapticPulse();
  };

  closeTriggers.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', closeModalFunc);
    }
  });

  // Prompt user after 3.5 seconds if not already shown in this session
  setTimeout(() => {
    if (!sessionStorage.getItem('resumePromptShown')) {
      resumeModal.classList.add('open');
      sessionStorage.setItem('resumePromptShown', 'true');
      triggerHapticPulse();
    }
  }, 3500);
}
