// navigation
const HEADER = document.getElementById("header");
const NAVIGATION = document.getElementById('navigation');
const PHONES_ITEM = document.querySelectorAll('.phones__item');

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

/*phones*/
Array.from(PHONES_ITEM, el => el.addEventListener('click', e => {
    event.target.parentNode.querySelector('.phone__screen').classList.toggle('phone__screen_off');
}));