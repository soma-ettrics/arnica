import { gsap } from "gsap";

export default function tabdark() {
  // Select all necessary elements
  const progressBars = document.querySelectorAll(".tab-hor_progress-wrap.is-dark .tab-hor_progress");
  const tabProgressWraps = document.querySelectorAll(".tab-hor_progress-wrap.is-dark");
  const tabContentWraps = document.querySelectorAll(".half-tab_content");
  const tabMenu = document.querySelectorAll(".tab2_menu-item");
  const tabContentItem = document.querySelectorAll(".half-tab_menu-item");

  // Global animation duration
  const dur = 7;

  // Initial setup for tabMenu and tabContentWraps
  gsap.set(tabMenu, { opacity: 0.5 });
  gsap.set(tabContentWraps, { opacity: 0 });
  gsap.set(tabContentItem, { opacity: 0.5, height: "3.8rem" });
  gsap.set(tabProgressWraps, { opacity: 0 });
  gsap.set(progressBars, { x: "-100%" });

  // Activate the first tabMenu and tabContentWraps by default
  gsap.set(tabMenu[0], { opacity: 1 });
  gsap.set(tabContentWraps[0], { opacity: 1 });

  // Helper function to animate tabContentItems
  const animateTabContentItems = (contentItems) => {
    let index = 0;

    const animateNextItem = () => {
      const currentItem = contentItems[index];

      // Reset all tabContentItem elements to default states
      gsap.set(contentItems, { opacity: 0.5, height: "3.8rem" });
      gsap.set(tabProgressWraps, { opacity: 0 });
      gsap.set(progressBars, { x: "-100%" });

      // Activate the current item
      gsap.to(currentItem, { opacity: 1, height: "auto", duration: 0.3, ease: "power1.out" });

      // Find and animate progressWraps and progressBars within the current item
      const progressWrap = currentItem.querySelector(".tab-hor_progress-wrap.is-dark");
      const progressBar = progressWrap?.querySelector(".tab-hor_progress");

      if (progressWrap && progressBar) {
        gsap.to(progressWrap, { opacity: 1, duration: 0.3 });
        gsap.fromTo(
          progressBar,
          { x: "-100%" },
          {
            x: "0%",
            duration: dur,
            ease: "none",
            onComplete: () => {
              // After animation completes, move to the next item
              index = (index + 1) % contentItems.length; // Loop back to the first item
              animateNextItem();
            },
          }
        );
      }
    };

    // Start animating the first item
    animateNextItem();
  };

  // Add click event listeners to tabMenu items
  tabMenu.forEach((menuItem, menuIndex) => {
    menuItem.addEventListener("click", () => {
      // Reset tabMenu and tabContentWraps
      gsap.to(tabMenu, { opacity: 0.5, duration: 0.3 });
      gsap.to(tabContentWraps, { opacity: 0, duration: 0.3 });

      // Activate the clicked tabMenu and corresponding tabContentWraps
      gsap.to(menuItem, { opacity: 1, duration: 0.3 });
      gsap.to(tabContentWraps[menuIndex], { opacity: 1, duration: 0.3 });

      // Start the tabContentItem animation within the active tabContentWraps
      const activeContentWrap = tabContentWraps[menuIndex];
      const activeContentItems = activeContentWrap.querySelectorAll(".half-tab_menu-item");
      animateTabContentItems(activeContentItems);
    });
  });

  // Trigger initial animation for the first tabContentWraps
  const initialContentItems = tabContentWraps[0].querySelectorAll(".half-tab_menu-item");
  animateTabContentItems(initialContentItems);
}
