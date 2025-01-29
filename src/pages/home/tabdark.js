import { gsap } from "gsap";

export default function tabdark() {
  // Select all necessary elements
  const progressBars = document.querySelectorAll(".tab-hor_progress-wrap.is-dark .tab-hor_progress");
  const tabProgressWraps = document.querySelectorAll(".tab-hor_progress-wrap.is-dark");
  const tabContentWraps = document.querySelectorAll(".half-tab_content");
  const tabMenu = document.querySelectorAll(".tab2_menu-item");
  const tabContentItem = document.querySelectorAll(".half-tab_menu-item");

  // Initial setup for tabMenu and tabContentWraps
  gsap.set(tabMenu, { opacity: 0.5 });
  gsap.set(tabContentWraps, { opacity: 0 });
  gsap.set(tabMenu[0], { opacity: 1 });
  gsap.set(tabContentWraps[0], { opacity: 1 });

  // Initial setup for tabContentItem elements
  gsap.set(tabContentItem, { opacity: 0.5, height: "3.8rem" });
  const firstContentItems = tabContentWraps[0].querySelectorAll(".half-tab_menu-item");
  gsap.set(firstContentItems[0], { opacity: 1, height: "auto" });

  // Add click event listeners to tabMenu items
  tabMenu.forEach((menuItem, tabIndex) => {
    menuItem.addEventListener("click", () => {
      // Reset all tabMenu items to opacity 0.5
      gsap.to(tabMenu, { opacity: 0.5, duration: 0.3 });

      // Reset all tabContentWraps to opacity 0
      gsap.to(tabContentWraps, { opacity: 0, duration: 0.3 });

      // Highlight the clicked tabMenu item
      gsap.to(menuItem, { opacity: 1, duration: 0.3 });

      // Show the corresponding tabContentWraps
      gsap.to(tabContentWraps[tabIndex], { opacity: 1, duration: 0.3, onComplete: () => {
        // Start animating contents of the active tabContentWraps
        const contentItems = tabContentWraps[tabIndex].querySelectorAll(".half-tab_menu-item");

        // Reset all tabContentItem elements
        gsap.to(tabContentItem, { opacity: 0.5, height: "3.8rem", duration: 0 });

        // Animate the first tabContentItem in the active tabContentWraps
        gsap.to(contentItems[0], {
          opacity: 1,
          height: "auto",
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            // Reset the animated tabContentItem to its initial state
            gsap.to(contentItems[0], { opacity: 0.5, height: "3.8rem", duration: 0 });
          },
        });
      }});
    });
  });
}
