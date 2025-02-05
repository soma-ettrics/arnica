// import { gsap } from "gsap";

function footer() {
        const yearElement = document.querySelector("#year");
        if (yearElement) {
          yearElement.textContent = new Date().getFullYear();
        }
      
}

export default footer