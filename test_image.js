const fs = require('fs');
const https = require('https');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function main() {
    await download('https://www.transparenttextures.com/patterns/rice-paper.png', 'rice-paper.png');
    // Using a public domain or free-to-use floral engraving for the demo.
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Vintage_floral_design_element.svg/512px-Vintage_floral_design_element.svg.png', 'floral-engraving.png');
}

main();
