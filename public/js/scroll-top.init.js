// Set footer year
document.addEventListener('DOMContentLoaded', function() {
    var yearSpan = document.querySelector('.footer-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Scroll to top
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
