const DELAY = 500;

export const showLoader = () => {
    document.body.classList.add('loaded-hiding');
    console.log("loader");
}

export const hideLoader = () => {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded-hiding');
}

// window.onload = function () {
//     showLoader();
//     window.setTimeout(hideLoader(), DELAY);
// }

// window.onload = function () {
//     document.body.classList.add('loaded-hiding');
//     window.setTimeout(function () {
//         document.body.classList.add('loaded');
//         document.body.classList.remove('loaded-hiding');
//     }, DELAY);
// }