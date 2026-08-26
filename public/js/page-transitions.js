// ============================================
// PAGE TRANSITIONS - Smooth navigation animations
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only intercept same-origin links
            const href = this.getAttribute('href');
            
            // Skip external links, anchor links, or links with target="_blank"
            if (!href || 
                href.startsWith('http') || 
                href.startsWith('#') || 
                this.getAttribute('target') === '_blank') {
                return;
            }
            
            e.preventDefault();
            
            // Add fade-out animation
            document.body.classList.add('page-transition-out');
            
            // Navigate after animation completes
            setTimeout(() => {
                window.location.href = href;
            }, 400); // Match the CSS animation duration (0.4s)
        });
    });
});
