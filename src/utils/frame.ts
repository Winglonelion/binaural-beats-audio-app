export const tilNextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(resolve));
