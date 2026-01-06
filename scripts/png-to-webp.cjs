const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  'public/images/minimax-api-1.png',
  'public/images/minimax-api-2.png',
  'public/images/minimax-api-3.png'
];

async function convertToWebp(inputPath) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const outputPath = inputPath.replace(/\.png$/i, '.webp');

  try {
    await sharp(inputPath)
      .webp({ quality: 80 })  // 80% 质量，平衡大小和质量
      .toFile(outputPath);

    // 获取文件大小
    const stats = fs.statSync(inputPath);
    const webpStats = fs.statSync(outputPath);

    console.log(`✅ ${filename}.png → ${filename}.webp`);
    console.log(`   PNG: ${(stats.size / 1024).toFixed(1)} KB → WebP: ${(webpStats.size / 1024).toFixed(1)} KB`);
    console.log(`   压缩率: ${((1 - webpStats.size / stats.size) * 100).toFixed(1)}%\n`);
  } catch (error) {
    console.error(`❌ 转换失败 ${inputPath}:`, error.message);
  }
}

async function main() {
  console.log('🔄 开始转换 PNG 到 WebP...\n');

  for (const image of images) {
    if (fs.existsSync(image)) {
      await convertToWebp(image);
    } else {
      console.log(`⚠️  文件不存在: ${image}`);
    }
  }

  console.log('✨ 转换完成！');
}

main();
