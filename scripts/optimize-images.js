const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const BACKGROUNDS_DIR = path.join(__dirname, '../public/backgrounds');
const MAX_WIDTH = 2560; // 4K display width
const QUALITY = 85;

async function optimizeImage(filename) {
  const inputPath = path.join(BACKGROUNDS_DIR, filename);
  const outputPath = path.join(BACKGROUNDS_DIR, `optimized-${filename}`);

  const metadata = await sharp(inputPath).metadata();

  console.log(`Optimizing ${filename}...`);
  console.log(`Original: ${metadata.width}x${metadata.height}, ${(fs.statSync(inputPath).size / 1024 / 1024).toFixed(2)}MB`);

  await sharp(inputPath)
    .resize(MAX_WIDTH, null, {
      withoutEnlargement: true,
      fit: 'inside'
    })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(outputPath);

  const newSize = fs.statSync(outputPath).size;
  console.log(`Optimized: ${(newSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Saved: ${((1 - newSize / fs.statSync(inputPath).size) * 100).toFixed(1)}%\n`);

  return outputPath;
}

async function main() {
  const images = ['japan.jpg', 'rio.jpg', 'swiss.jpg'];

  for (const image of images) {
    try {
      await optimizeImage(image);
    } catch (error) {
      console.error(`Failed to optimize ${image}:`, error);
    }
  }

  console.log('Optimization complete!');
  console.log('Review optimized-*.jpg files, then replace originals if satisfied.');
}

main();
