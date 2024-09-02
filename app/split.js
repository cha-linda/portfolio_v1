let splits = document.querySelectorAll('.split');

console.log(splits);
splits.forEach(function (split) {
    let splitRange = split.querySelector('.split__range');
    let splitLeft = split.querySelector('.split__left');
    let splitSeparator = split.querySelector('.split__separator');
    console.log(splitRange.value);
    function updateSliderPosition() {
        splitLeft.style.width = `width:${splitRange.value}%`;
        splitSeparator.style = `left:${splitRange.value}%`;
    }

    splitRange.addEventListener('input', updateSliderPosition);

    let isDragging = false;

    splitSeparator.addEventListener('mousedown', function () {
        isDragging = true;
    });

    splitSeparator.addEventListener('touchstart', function () {
        isDragging = true;
    });
    document.addEventListener('mouseup', function () {
        isDragging = false;
    });
    document.addEventListener('touchend', function () {
        isDragging = false;
    });

    document.addEventListener('mousemove', function (e) {
        processMove(e.clientX);
    });

    document.addEventListener('touchmove', function (e) {
        processMove(e.touches[0].clientX);
    });

    function processMove(x) {
        if (isDragging) {
            let splitRect = split.getBoundingClientRect();
            let newWidth = (x - splitRect.left) /
                splitRect.width * 100;
            splitRange.value = newWidth;
            updateSliderPosition();
        }
    }
});