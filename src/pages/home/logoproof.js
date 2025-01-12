import { gsap } from "gsap";

export default function logoproof() {
  // Select all hero_logoproof-item elements
  const items = document.querySelectorAll(".hero_logoproof-item");

  // GSAP timeline for staggered animation
  const timeline = gsap.timeline({
    repeat: -1, // Infinite loop
    defaults: { duration: 1, ease: "power4.inOut" }, // Default animation settings
  });

  timeline.to(items, {
    onStart: () => {
      // Stagger animation for both active and second logos
      items.forEach((item, index) => {
        const imgs = item.querySelectorAll(".hero_logoproof-img");
        gsap.to(imgs, {
          y: "-100%", 
          duration: 1,
          ease: "power4.inOut",
          delay: index * 0.07, // Add stagger delay
        });
      });
    },
    stagger: 0.1, // Chain effect for each `.hero_logoproof-item`
    onComplete: () => {
      // Reset positions when animation is complete
      items.forEach((item) => {
        const imgs = item.querySelectorAll(".hero_logoproof-img");
        const firstImg = imgs[0];
        const secondImg = imgs[1];

        // Swap the "is-2" class to indicate active logo
        firstImg.classList.add("is-2");
        secondImg.classList.remove("is-2");

        // Reorder the DOM elements for seamless looping
        item.appendChild(firstImg);

        // Reset the individual images to their starting positions
        gsap.set(imgs, { y: "0" });
      });
    },
  }, "+=4");
}