import { CountUp } from "countup.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function stats() {
    const statsBoxes = document.querySelectorAll(".stats_box");

    if (statsBoxes.length === 0) {
        return;
    }

    statsBoxes.forEach((box) => {
        const stat = box.querySelector(".stats_num");
        if (stat) {
            const endValue = parseFloat(stat.textContent.replace(/,/g, ''));
            const countUp = new CountUp(stat, endValue, {
                duration: 4,
                separator: ",",
            });

            ScrollTrigger.create({
                trigger: box,
                start: "top bottom",
                onEnter: () => countUp.start(),
            });
        }
    });
}