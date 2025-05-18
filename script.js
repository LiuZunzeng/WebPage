document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.section-link');
    const sections = document.querySelectorAll('.section');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            document.querySelectorAll('.section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(sectionId).style.display = 'block';
        });
    });
});