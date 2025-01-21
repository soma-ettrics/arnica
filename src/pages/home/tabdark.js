import { gsap } from "gsap";

export default function tabdark() {
    // Select all necessary elements
    const progressBars = document.querySelectorAll(".tab-hor_progress-wrap.is-dark .tab-hor_progress");
    const tabProgressWraps = document.querySelectorAll(".tab-hor_progress-wrap.is-dark");
    const tabContentItems = document.querySelectorAll(".half-tab_content");
    const eyebrows = document.querySelectorAll(".tab2_menu-item");
    const menuItems = document.querySelectorAll(".half-tab_menu-item");

    // Set initial states using GSAP
    gsap.set(eyebrows, { opacity: 0.5 });
    gsap.set(tabContentItems, { opacity: 0 });
    gsap.set(tabProgressWraps, { opacity: 0 });
    gsap.set(menuItems, { opacity: 0.5, height: "3.8rem" });

    // Activate the first eyebrow and tab content by default
    gsap.to(eyebrows[0], { opacity: 1 });
    gsap.to(tabContentItems[0], { opacity: 1 });
    gsap.to(menuItems[0], { opacity: 1, height: "auto" });
    gsap.to(tabProgressWraps[0], { opacity: 1, duration: 0.3 });
    gsap.fromTo(progressBars[0], { x: "-100%" }, { x: "100%", duration: 7, repeat: -1 });

    // Add click event listeners to each eyebrow
    eyebrows.forEach((eyebrow, index) => {
        eyebrow.addEventListener("click", () => {
            // Animate all eyebrows to opacity 0.5 except the clicked one
            gsap.to(eyebrows, { opacity: 0.5 });
            gsap.to(eyebrow, { opacity: 1 });

            // Animate all tabContentItems to opacity 0 except the corresponding one
            gsap.to(tabContentItems, { opacity: 0 });
            gsap.to(tabContentItems[index], { opacity: 1 });

            // Reset all menu items and progress bars
            gsap.to(menuItems, { opacity: 0.5, height: "3.8rem" });
            gsap.to(tabProgressWraps, { opacity: 0 });
            gsap.killTweensOf(tabProgressWraps);

            // Animate the active menu item and progress bar
            gsap.to(menuItems[index], { opacity: 1, height: "auto", duration: 0.3 });
            gsap.to(tabProgressWraps[index], { opacity: 1 });
            gsap.fromTo(progressBars[index], { x: "-100%" }, { x: "0", duration: 7});
        });
    });

    // Automatic animation for the active menu item every 7 seconds
    let activeIndex = 0;
    setInterval(() => {
        // Reset all menu items and progress bars
        gsap.to(menuItems, { opacity: 0.5, height: "3.8rem" });
        gsap.to(progressBars, { opacity: 0 });
        gsap.killTweensOf(tabProgressWraps);

        // Increment active index
        activeIndex = (activeIndex + 1) % menuItems.length;

        // Animate the active menu item and progress bar
        gsap.to(menuItems[activeIndex], { opacity: 1, height: "auto", duration: 0.3 });
        gsap.to(tabProgressWraps[activeIndex], { opacity: 1 });
        gsap.fromTo(progressBars[activeIndex], { x: "-100%" }, { x: "0", duration: 7 });
    }, 7000);
}
