const wheel = document.querySelector('.wheel');
const spinButton = document.getElementById('spinButton');
let spinning = false;

spinButton.addEventListener('click', startSpin);

function startSpin() {
    if (!spinning) {
        spinning = true;

        const spinDuration = 5000; // You can adjust this for how long it spins
        const startRotation = getCurrentRotation();
        const targetRotation = startRotation + 360 * 10 + Math.floor(Math.random() * 360 * 5);

        spinWheel(startRotation, targetRotation, spinDuration);
    }
}

function spinWheel(startRotation, targetRotation, duration) {
    const startTime = performance.now();

    function animateSpin(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);

        const currentRotation = startRotation + easeProgress * (targetRotation - startRotation);
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            spinning = false;
            wheel.style.transform = `rotate(${targetRotation % 360}deg)`;
            spinButton.disabled = false;
        }
    }

    requestAnimationFrame(animateSpin);
    spinButton.disabled = true;
}

function getCurrentRotation() {
    const transformValue = window.getComputedStyle(wheel).getPropertyValue('transform');
    const matrix = new DOMMatrix(transformValue);
    return Math.round((Math.atan2(matrix.b, matrix.a) * (180 / Math.PI) + 360) % 360);
}
