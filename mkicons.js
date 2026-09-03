const { chromium } = require('playwright');

// Ikona: fialovy podklad znacky + motorka, stejne jako v hlavicce appky.
function page(size, radius, emojiScale, bg) {
  return `<!doctype html><html><body style="margin:0">
    <div style="width:${size}px;height:${size}px;background:${bg};border-radius:${radius}px;
                display:flex;align-items:center;justify-content:center;">
      <div style="font-size:${Math.round(size*emojiScale)}px;line-height:1;transform:rotate(-4deg)">🏍️</div>
    </div></body></html>`;
}

(async () => {
  const b = await chromium.launch();
  const varianty = [
    { file:'icons/icon-192.png',          size:192, radius:42,  scale:0.60 },
    { file:'icons/icon-512.png',          size:512, radius:112, scale:0.60 },
    { file:'icons/icon-maskable-512.png', size:512, radius:0,   scale:0.46 },
    { file:'icons/apple-touch-icon.png',  size:180, radius:0,   scale:0.62 },
  ];
  for (const v of varianty) {
    const ctx = await b.newContext({ viewport:{width:v.size,height:v.size}, deviceScaleFactor:1 });
    const p = await ctx.newPage();
    await p.setContent(page(v.size, v.radius, v.scale, '#7C5CFC'));
    await p.waitForTimeout(250);
    await p.screenshot({ path:v.file, omitBackground:false });
    await ctx.close();
    console.log('hotovo', v.file);
  }
  await b.close();
})();
