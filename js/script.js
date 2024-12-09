document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.link-7');
    const burgerMenu = document.querySelector('.burgermenuexpanded');

    links.forEach(function(link) {
        link.addEventListener('click', function() {
            burgerMenu.style.display = 'none';
        });
    });
});