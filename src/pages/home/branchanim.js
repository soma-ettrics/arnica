import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

export default function branch() {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

    // Select all elements with the [data-branch] attribute
    const branches = document.querySelectorAll("[data-branch]");

    // Loop through each [data-branch] element
    branches.forEach((branch) => {
        const greenLine = branch.querySelector("#green"); // Select the #green SVG line within this branch

        if (greenLine) {
            // Get the height of the branch and the viewport
            const branchHeight = branch.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Calculate the centerOffset with a minimum limit for smaller elements
            const centerOffset = Math.max((viewportHeight - branchHeight-branchHeight/2) / 2, 0); // Avoid negative offsets

            // Create a timeline for this specific branch
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: branch, // Trigger is still the entire branch
                    start: `top+=${centerOffset}px center`, // Adjust the start point to center the #green line
                    end: `bottom-=${centerOffset}px center`, // Adjust the end point similarly
                    scrub: true, // Smooth scrubbing
                    invalidateOnRefresh: true, // Recalculate on viewport resize
                },
            });

            // Add animation for the #green line
            tl.fromTo(
                greenLine,
                { drawSVG: "0% 0%" }, // Start state
                {
                    drawSVG: "0% 100%", // End state
                    duration: 2,
                    ease: "none" // Duration of the animation
                }
            );
        }
    });
}
