const { Canvas, loadImage } = require('canvas');
const CanvasGrid = require('merge-images-grid');
const fs = require('fs');
const fse = require('fs-extra');

const dir = './input/';
const listFiles = fs.readdirSync(dir);

async function work() {
  const list = await Promise.all(
	    listFiles.map(async (f) => ({
	       image: await loadImage(dir + f),
	    }))
	);
  const merge = new CanvasGrid({
    canvas: new Canvas(list.length, 1),
    list,
    gap: 0,
    padding: 0,
    col: list.length,
  })
  const buffer = merge.canvas.toBuffer();
  fse.outputFileSync(`./output/${Date.now()}.png`, buffer);
}

work()
.catch(e => {
	console.error(e);
})
