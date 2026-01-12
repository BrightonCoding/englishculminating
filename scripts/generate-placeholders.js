const fs = require('fs');
const path = require('path');

// Image to phase mapping
const imagePhases = {
  1: [1, 2, 3, 4, 5, 6],
  2: [7, 8, 9],
  3: [10],
  4: [11, 12, 13, 14, 15, 16, 17],
  5: [18, 19, 20],
  6: [21, 22, 23],
  7: [24, 25],
  8: [26, 27, 28, 29],
  9: [30, 31, 32, 33],
  10: [], // No images
  11: [34, 35, 36],
};

// Create a simple SVG placeholder
function createPlaceholderSVG(imageNumber, phaseNumber) {
  return `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${imageNumber}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1816;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f0e0c;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad${imageNumber})"/>
  <rect x="20" y="20" width="760" height="560" fill="none" stroke="#d4a574" stroke-width="1" stroke-dasharray="8,4" opacity="0.2"/>
  <text x="400" y="280" font-family="Georgia, serif" font-size="72" fill="#d4a574" text-anchor="middle" opacity="0.3">${imageNumber}</text>
  <text x="400" y="340" font-family="system-ui, sans-serif" font-size="14" fill="#a39e94" text-anchor="middle" opacity="0.5">Phase ${phaseNumber} • Image ${imageNumber}</text>
  <text x="400" y="370" font-family="system-ui, sans-serif" font-size="12" fill="#a39e94" text-anchor="middle" opacity="0.4">Replace with your photo</text>
</svg>`;
}

// Generate placeholders
for (const [phase, images] of Object.entries(imagePhases)) {
  const phaseDir = path.join(__dirname, '..', 'public', 'images', `phase${phase}`);
  
  // Ensure directory exists
  if (!fs.existsSync(phaseDir)) {
    fs.mkdirSync(phaseDir, { recursive: true });
  }
  
  for (const imageNum of images) {
    const svgContent = createPlaceholderSVG(imageNum, phase);
    const filePath = path.join(phaseDir, `${imageNum}.jpg`);
    
    // Save as SVG with .jpg extension (browsers will still render it)
    // In production, replace these with actual JPG files
    fs.writeFileSync(filePath.replace('.jpg', '.svg'), svgContent);
    console.log(`Created placeholder: phase${phase}/${imageNum}.svg`);
  }
}

console.log('\\nPlaceholder generation complete!');
console.log('\\nTo use actual images:');
console.log('1. Replace the .svg files with your .jpg photos');
console.log('2. Keep the same naming convention (1.jpg, 2.jpg, etc.)');
console.log('3. Images should ideally be 4:3 aspect ratio');
