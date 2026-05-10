
document.addEventListener('DOMContentLoaded', () => {
    // Create and inject the loading bar
    const loader = document.createElement('div');
    loader.id = 'top-page-loader';
    // Using secondary color #006a61 (or variable) for the bar
    loader.style.cssText = 'position:fixed;top:0;left:0;height:4px;background:#006a61;z-index:99999;width:0%;transition:width 0.3s ease, opacity 0.3s ease;box-shadow: 0 0 10px #006a61;';
    document.body.appendChild(loader);

    // Initial page fade-in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease-in-out';
    
    // Simulate loading completion on page load
    requestAnimationFrame(() => {
        loader.style.width = '40%';
        setTimeout(() => {
            document.body.style.opacity = '1';
            loader.style.width = '100%';
            setTimeout(() => {
                loader.style.opacity = '0';
            }, 300);
        }, 150);
    });

    // Intercept clicks on navigation links
    document.querySelectorAll('a[href], button[onclick]').forEach(el => {
        el.addEventListener('click', (e) => {
            let href = '';
            
            if (el.tagName.toLowerCase() === 'a') {
                href = el.getAttribute('href');
                if (!href || href.startsWith('#') || href.startsWith('http') || el.target === '_blank') {
                    return; // Ignore external links or anchor links
                }
            } else if (el.tagName.toLowerCase() === 'button') {
                const onclick = el.getAttribute('onclick');
                if (onclick && onclick.includes('window.location.href')) {
                    // Extract href from onclick="window.location.href='...'"
                    const match = onclick.match(/window\.location\.href\s*=\s*['"]([^'"]+)['"]/);
                    if (match) href = match[1];
                }
                if (!href) return;
            }

            // Prevent immediate navigation
            e.preventDefault();
            
            // Reset and start loader
            loader.style.transition = 'none';
            loader.style.width = '0%';
            loader.style.opacity = '1';
            
            // Trigger animation
            requestAnimationFrame(() => {
                loader.style.transition = 'width 0.4s ease';
                loader.style.width = '60%';
                document.body.style.opacity = '0'; // Smooth fade out
                
                // Complete navigation
                setTimeout(() => {
                    loader.style.width = '90%';
                    setTimeout(() => {
                        window.location.href = href;
                    }, 100);
                }, 300);
            });
        });
    });
});
