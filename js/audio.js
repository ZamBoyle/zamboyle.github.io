const audio = document.getElementById('audio');
const repeatCheckbox = document.getElementById('repeat');

repeatCheckbox.addEventListener('change', function () {
    audio.loop = this.checked;
});