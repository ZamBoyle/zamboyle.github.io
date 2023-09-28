export function toggleCss() {
  let url = window.location.href;
  if (url.indexOf('css=off') !== -1) {
    needCss(true);
  }
};

export function needCss(needed) {
  document.querySelectorAll('link[rel=stylesheet]').forEach(function (styleSheet) {
    styleSheet.disabled = needed;
  });
}