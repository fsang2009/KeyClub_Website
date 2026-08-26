// Southport Key Club countdown
// Counts down to October 4, 2026 at 11:59:59 PM Eastern Time

document.addEventListener("DOMContentLoaded", () => {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    // Stop if the countdown elements are not on the page
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const deadline = new Date("2026-09-04T23:59:59-04:00").getTime();

    const pad = (value) => String(value).padStart(2, "0");

    function updateCountdown() {
        const now = Date.now();
        const distance = deadline - now;

        if (distance <= 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) /
            1000
        );

        daysEl.textContent = pad(days);
        hoursEl.textContent = pad(hours);
        minutesEl.textContent = pad(minutes);
        secondsEl.textContent = pad(seconds);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});