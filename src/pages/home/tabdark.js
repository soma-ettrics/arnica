// GSAP animation for looping through .half-tab_menu-item and .halftabtabProgressWrap
import { gsap } from "gsap";

export default function tabdark() {
  document.addEventListener("DOMContentLoaded", () => {

    console.log("Tabdark script loaded");
    // Select all necessary elements
    const menuItems = document.querySelectorAll(".half-tab_menu-item");
    const progressBars = document.querySelectorAll(".tab-hor_progress-wrap.is-dark .tab-hor_progress");
    const tabProgressWrap = document.querySelectorAll(".tab-hor_progress-wrap.is-dark");
    const eyebrows = document.querySelectorAll(".tab-hor_eyebrow-anim .a_eyebrow");
    
    // Initial state setup
    gsap.set(menuItems, { opacity: 0.4, height: "3.8rem" });
    gsap.set(progressBars, { opacity: 0, x: "-100%" });
    gsap.set(tabProgressWrap, { opacity: 0 });
    gsap.set(eyebrows, { opacity: 0.4 });

    let activeIndex = 0;
    let animationInterval;

    // Function to animate the active item
    function animateActiveItem() {
      console.log("Animating active item");
      // Reset all items, progress bars, and eyebrows
      menuItems.forEach((item, index) => {
        if (index !== activeIndex) {
          gsap.to(item, { opacity: 0.4, height: "3.8rem", duration: 0.3 });
        }
      });
      progressBars.forEach((progress, index) => {
        if (index !== activeIndex) {
          gsap.to(progress, { opacity: 0, duration: 0.2 }); // Only animate opacity
          gsap.set(progress, { x: "-100%" });
        }
      });
      tabProgressWrap.forEach((brow, index) => {
        if (index !== activeIndex) {
          gsap.to(brow, { opacity: 0, duration: 0.3 });
        }
      });
      eyebrows.forEach((eyebrow, index) => {
        if (index !== activeIndex) {
          gsap.to(eyebrow, { opacity: 0.4, duration: 0.3 });
        }
      });

      // Animate the active item
      const activeItem = menuItems[activeIndex];
      const activeProgressBar = progressBars[activeIndex];
      const activeEyebrowWrap = tabProgressWrap[activeIndex];
      const activeEyebrow = eyebrows[activeIndex];

      gsap.to(activeItem, { opacity: 1, height: "auto", duration: 0.3 });
      gsap.to(activeProgressBar, { opacity: 1, duration: 0.3 }); // Reveal progress bar opacity
      gsap.to(activeProgressBar, { x: "0%", duration: 7, ease: "linear" }); // Animate x
      gsap.to(activeEyebrowWrap, { opacity: 1, duration: 0.3 });
      gsap.to(activeEyebrow, { opacity: 1, duration: 0.3 }); // Highlight active eyebrow
    }

    // Function to reset animations after click
    function resetAnimations() {
      progressBars.forEach((progress) => {
        gsap.set(progress, { opacity: 0, x: "-100%" });
      });
      tabProgressWrap.forEach((brow) => {
        gsap.set(brow, { opacity: 0 });
      });
      menuItems.forEach((item) => {
        gsap.set(item, { opacity: 0.4, height: "3.8rem" });
      });
      eyebrows.forEach((eyebrow) => {
        gsap.set(eyebrow, { opacity: 0.4 });
      });
    }

    // Function to stop animations
    function stopAnimations() {
      gsap.globalTimeline.pause();
      clearInterval(animationInterval);
    }

    // Function to start animations
    function startAnimations() {
      gsap.globalTimeline.resume();
      clearInterval(animationInterval);
      animationInterval = setInterval(() => {
        activeIndex = (activeIndex + 1) % menuItems.length;
        animateActiveItem();
      }, 7000);
    }

    // Add hover listeners to stop animations
    menuItems.forEach((item, index) => {
      item.addEventListener("mouseenter", () => {
        if (index === activeIndex) {
          stopAnimations();
        }
      });
      item.addEventListener("mouseleave", () => {
        if (index === activeIndex) {
          startAnimations();
        }
      });
    });

    // Add click listener to switch active tab
    menuItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        stopAnimations();
        resetAnimations(); // Reset all animations before applying new state
        activeIndex = index; // Set active index to the clicked item
        animateActiveItem(); // Trigger the animation
        startAnimations(); // Restart the interval
      });
    });

    // Start the animation loop
    animateActiveItem(); // Initial animation
    animationInterval = setInterval(() => {
      activeIndex = (activeIndex + 1) % menuItems.length;
      animateActiveItem();
    }, 7000); // Repeat every 7 seconds
  });
}
