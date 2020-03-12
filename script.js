// navigation
const HEADER = document.getElementById("header");
const NAVIGATION = document.getElementById('navigation');

/* sticky header*/
window.onscroll = function() {
    if (window.pageYOffset > 0) {
        HEADER.classList.add('header_sticky');
    } else {
        HEADER.classList.remove('header_sticky');
    }
};

/* navigation */
NAVIGATION.addEventListener('click', (event) => {
    console.log(event);
    event.preventDefault();
    // add/remove active class
    NAVIGATION.querySelectorAll('a').forEach(elem => {
        elem.classList.remove('navigation__link_active');
    });
    event.target.tagName === 'A' && event.target.classList.add('navigation__link_active');

    //smooth scroll
    const anchorID = event.target.tagName === 'A' && event.target.getAttribute('href').substr(1);

    event.target.tagName === 'A' && document.getElementById(anchorID).scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});