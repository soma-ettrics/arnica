import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function autoTab() {
  gsap.registerPlugin(ScrollTrigger);

  class TabController {
    constructor(component) {
      this.component = component;
      this.tabMenu = component.querySelector(".w-tab-menu");
      this.tabLinks = [...this.tabMenu.querySelectorAll(".w-tab-link")];
      this.timeout = null;
      this.isPaused = false;
      this.isHoverPaused = false;
      this.ANIMATION_DURATION = 7;
      this.activeAnimation = null;

      this.init();
    }

    init() {
      if (!this.tabMenu) return;
      
      this.tabLinks.forEach(tab => {
        const progress = tab.querySelector(".tab-hor_progress");
        gsap.set(progress, { xPercent: -100 });
      });

      this.setupScrollTrigger();
      this.setupEventListeners();
    }

    playProgress(tab) {
      // Kill any existing animations
      if (this.activeAnimation) {
        this.activeAnimation.kill();
      }

      const progress = tab.querySelector(".tab-hor_progress");
      gsap.set(progress, { xPercent: -100 }); // Reset before playing
      
      this.activeAnimation = gsap.to(progress, {
        xPercent: 0,
        duration: this.ANIMATION_DURATION,
        ease: "linear"
      });

      return this.activeAnimation;
    }

    resetProgress(tab) {
      const progress = tab.querySelector(".tab-hor_progress");
      gsap.set(progress, { xPercent: -100 });
    }

    nextTab() {
      const currentTab = this.tabMenu.querySelector(".w--current");
      const nextTab = currentTab.nextElementSibling || this.tabLinks[0];
      
      this.tabLinks.forEach(tab => {
        if (tab !== nextTab) this.resetProgress(tab);
      });

      nextTab.click();
      this.playProgress(nextTab);
    }

    startLoop() {
      if (this.isPaused || this.isHoverPaused) return;
      
      // Clear any existing timeout
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }

      // Start a new timeout
      this.timeout = setTimeout(() => {
        this.nextTab();
        this.startLoop(); // Recursively continue the loop
      }, this.ANIMATION_DURATION * 1000);
    }

    forceReset(tab) {
      // Kill all existing animations and timeouts
      if (this.activeAnimation) {
        this.activeAnimation.kill();
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }

      // Reset all progress bars
      this.tabLinks.forEach(t => this.resetProgress(t));

      // Start fresh animation and timer
      this.playProgress(tab);
      this.startLoop();
    }

    setupScrollTrigger() {
      ScrollTrigger.create({
        trigger: this.component,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          const firstTab = this.tabLinks[0];
          this.forceReset(firstTab);
        },
        onLeaveBack: () => {
          if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
          }
          if (this.activeAnimation) {
            this.activeAnimation.kill();
          }
          this.tabLinks.forEach(tab => this.resetProgress(tab));
        }
      });
    }

    setupEventListeners() {
      this.tabLinks.forEach(tab => {
        // Click event
        tab.addEventListener("click", () => {
          this.forceReset(tab);
        });

        // Hover events for the current tab
        tab.addEventListener("mouseenter", () => {
          if (tab.classList.contains("w--current")) {
            this.isHoverPaused = true;
            if (this.timeout) {
              clearTimeout(this.timeout);
              this.timeout = null;
            }
            if (this.activeAnimation) {
              this.activeAnimation.pause();
            }
          }
        });

        tab.addEventListener("mouseleave", () => {
          if (tab.classList.contains("w--current")) {
            this.isHoverPaused = false;
            if (!this.isPaused) {
              if (this.activeAnimation) {
                this.activeAnimation.resume();
              }
              this.startLoop();
            }
          }
        });
      });

      const navButton = document.querySelector(".w-nav-button");
      if (navButton) {
        navButton.addEventListener("click", () => {
          this.isPaused = !this.isPaused;
          if (this.isPaused) {
            if (this.timeout) {
              clearTimeout(this.timeout);
              this.timeout = null;
            }
            if (this.activeAnimation) {
              this.activeAnimation.pause();
            }
          } else {
            if (!this.isHoverPaused) {
              if (this.activeAnimation) {
                this.activeAnimation.resume();
              }
              this.startLoop();
            }
          }
        });
      }
    }
  }

  // Initialize for all tab components
  document.querySelectorAll(".tab-hor_component")
    .forEach(component => new TabController(component));
}