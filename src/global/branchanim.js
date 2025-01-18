import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

export default function branch() {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

    // Select all elements with the [data-branch] attribute
    const branches = document.querySelectorAll("[data-branch]");

    // Loop through each [data-branch] element
    branches.forEach((branch) => {
        // Select all #green SVG elements and #point circles within this branch
        const greenLines = branch.querySelectorAll("#green");
        const greenPoints = branch.querySelectorAll("#point");

        if (!greenLines.length) return; // Skip if no green lines are

        // Loop through each #green line within the current branch
        greenLines.forEach((greenLine) => {
            // Get the height of the branch and the viewport
            const branchHeight = branch.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Calculate the centerOffset with a minimum limit for smaller elements
            const centerOffset = Math.max((viewportHeight - branchHeight - branchHeight / 2) / 2, 0); // Avoid negative offsets

            // Create a timeline for this specific green line
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: branch, // Trigger is still the entire branch
                    start: `top+=${centerOffset}px center`, // Adjust the start point to center the #green line
                    end: "bottom center", // Adjust the end point similarly
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
                    ease: "none", // Ease of the animation
                }
            );

            // Add animation for greenPoints (SVG circles)
            greenPoints.forEach((point) => {
                gsap.fromTo(
                    point,
                    { opacity: 0, scale: 0 }, // Initial state: hidden and shrunk
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.2, // Duration of the reveal animation
                        ease: "power4.out", // Smooth easing
                        scrollTrigger: {
                            trigger: point, // Trigger individually for each point
                            start: "center center", // When the point reaches the center of the viewport
                            end: "center-=10 center", // Slight overlap for smooth reveal
                            toggleActions: "play none reverse none", // Play the animation only once
                        },
                    }
                );
            });
        });
    });
}
