/**
  * █▀▀ █░░ █░█ █ █▀▄   █░█░█ █▀▀ █▄▄ █▀▀ █░░ █▀█ █░█░█   ░░█ █▀
  * █▀░ █▄▄ █▄█ █ █▄▀   ▀▄▀▄▀ ██▄ █▄█ █▀░ █▄▄ █▄█ ▀▄▀▄▀   █▄█ ▄█
  * █▀ ▀█▀ ▄▀█ █▀█ ▀█▀ █▀▀ █▀█   ▀█▀ █▀▀ █▀▄▀█ █▀█ █░░ ▄▀█ ▀█▀ █▀▀
  * ▄█ ░█░ █▀█ █▀▄ ░█░ ██▄ █▀▄   ░█░ ██▄ █░▀░█ █▀▀ █▄▄ █▀█ ░█░ ██▄
*/
// Variable for checking if dev server is running
const parceled = true

// Initialize Parcel.js with Webflow | Don't forget to delete or comment this line after project setup! ;) 
//alert('Your Parcel.js based Webflow development environment is up and running! 👍');

// Import global scripts
// import branch from "./src/global/branchanim";
import logoproof from "./src/global/logoproof";
import autotab from "./src/global/autotab";
import injectSvg from "./src/global/injectSvg";

injectSvg();
autotab();
//branch();
logoproof();

// Import page-specific scripts
import home from "./src/pages/home/home";
import integration from "./src/pages/sub-pages/integration-page";

// Function to initialize page-specific scripts
const initializePageScripts = () => {
  const pages = [
    { className: 'body--home', initFunction: home },
    { className: 'body--integration', initFunction: integration }
  ];

  pages.forEach(page => {
    if (document.querySelector('body').classList.contains(page.className)) {
      page.initFunction();
    }
  });
};

// Execute page-specific scripts
initializePageScripts();