export default function injectSvg() {
  // Select all .logo_box elements
  const logoBoxes = document.querySelectorAll('.logo_box');

  if (logoBoxes.length === 0) {
    return;
  }

  // Loop through each .logo_box element
  logoBoxes.forEach(logoBox => {
    // Find the <img> element inside .logo_box
    const imgElement = logoBox.querySelector('img');

    if (imgElement && imgElement.src) {
      // Check if the image is an SVG
      if (imgElement.src.endsWith('.svg')) {
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
          })
          .catch(error => {
            console.error('Failed to fetch SVG:', error);
          });
      } else {
        console.log('Image is not an SVG, leaving it unchanged.');
      }
    } else {
      console.error('No <img> element or src attribute found inside .logo_box.');
    }
  });
}