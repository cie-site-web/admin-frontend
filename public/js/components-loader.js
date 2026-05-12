document.addEventListener('DOMContentLoaded', function() {
    // Load partials with data-include attribute
    document.querySelectorAll('[data-include]').forEach(function(el) {
        var file = el.getAttribute('data-include');
        if (file) {
            fetch(file)
                .then(response => response.text())
                .then(data => {
                    el.innerHTML = data;
                    // Re-initialize any scripts in the loaded content
                    el.querySelectorAll('script').forEach(function(script) {
                        var newScript = document.createElement('script');
                        newScript.textContent = script.textContent;
                        document.body.appendChild(newScript);
                    });
                })
                .catch(err => console.log('Error loading partial:', file, err));
        }
    });
});
