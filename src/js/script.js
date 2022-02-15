(function() {
    'use strict';

    const sidenav = document.getElementById('sidenav');
    const sidenavClose = document.getElementById('sidenav-close');

    sidenavClose.addEventListener('click', () => sidenav.classList.toggle('closed'));
})();