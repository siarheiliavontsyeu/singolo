// navigation
const NAVIGATION = document.getElementById('navigation');


NAVIGATION.addEventListener('click', (event) => {
    event.preventDefault();

    // add/remove active class
    NAVIGATION.querySelectorAll('a').forEach(elem => {
        elem.classList.remove('navigation__link_active');
    });
    event.target.classList.add('navigation__link_active');

    //smooth scroll
    const anchorID = event.target.getAttribute('href').substr(1);

    document.getElementById(anchorID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});