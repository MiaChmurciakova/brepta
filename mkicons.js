const { chromium } = require('playwright');

// Ikona: gradient fialova->modra + napis "Brepta" (bez motorky).
const GRADIENT = 'linear-gradient(135deg,#7C5CFC 0%,#3B6FE4 100%)';

function page(size, radius, fontScale) {
  return `<!doctype html><html><head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@800&display=swap">
    </head><body style="margin:0">
    <div style="width:${size}px;height:${size}px;background:${GRADIENT};border-radius:${radius}px;
                display:flex;align-items:center;justify-content:center;">
      <div style="font-family:'Baloo 2',sans-serif;font-weight:800;font-size:${Math.round(size*fontScale)}px;
                  color:white;letter-spacing:-.01em;line-height:1">Brepta</div>
    </div></body></html>`;
}

(async () => {
  const b = await chromium.launch();
  const varianty = [
    // nemaskovatelne ikony: radius rovnou zaobleny (nahled), text muze byt vetsi
    { file:'icons/icon-192.png',          size:192, radius:42,  scale:0.22 },
    { file:'icons/icon-512.png',          size:512, radius:112, scale:0.22 },
    // maskable a apple ikony: bez zaobleni (oriznuti resi OS), text mensi kvuli safe-zone
    { file:'icons/icon-maskable-512.png', size:512, radius:0,   scale:0.17 },
    { file:'icons/apple-touch-icon.png',  size:180, radius:0,   scale:0.20 },
  ];
  for (const v of varianty) {
    const ctx = await b.newContext({ viewport:{width:v.size,height:v.size}, deviceScaleFactor:1 });
    const p = await ctx.newPage();
    await p.setContent(page(v.size, v.radius, v.scale));
    await p.waitForTimeout(350);
    await p.screenshot({ path:v.file, omitBackground:false });
    await ctx.close();
    console.log('hotovo', v.file);
  }
  await b.close();
})();
