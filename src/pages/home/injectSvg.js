export default function injectSvg() {
// Select the .logo_box element
const logoBox = document.querySelector('.logo_box');

if (logoBox) {
  // Find the <img> element inside .logo_box
  const imgElement = logoBox.querySelector('img');

  if (imgElement && imgElement.src) {
    // Fetch the SVG file from the img src
    fetch(imgElement.src)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.text();
      })
      .then(svgCode => {
        // Inject the fetched SVG code into the .logo_box div
        logoBox.innerHTML = svgCode;

        console.log('SVG successfully injected into the .logo_box wrapper.');
      })
      .catch(error => {
        console.error('Failed to fetch SVG:', error);
      });
  } else {
    console.error('No <img> element or src attribute found inside .logo_box.');
  }
}

}