async function createCapture(page, selector) {
  try {
    let screenshot;
    let url = await page.url();
    const rect = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      if (!element) {
        return null;
      }
      const { x, y, width, height } = element.getBoundingClientRect();
      return { left: x, top: y, width, height, id: element.id };
    }, selector);
    if (rect) {
      screenshot = await page.screenshot({
        clip: {
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        }
      });
      console.log(`📸 `, `${url} => ${selector}`);
      return screenshot;
    } else {
      console.error(`💥 `, `Can't find selector ${selector} on ${url}`);
    }
  } catch (e) {
    console.error(e);
  }
}
exports.createCapture = createCapture;
