import { loadPrism } from './prism-loader.mjs';
import { toggleCss } from './toggle-css.mjs';
import { createSourceCodeContainer } from './createSourceCodeContainer.mjs';

window.onload = function () {
  toggleCss();
  createSourceCodeContainer();
  loadPrism();
};

