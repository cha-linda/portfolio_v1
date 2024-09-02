document.addEventListener("DOMContentLoaded", () => {

    const closeBtns = document.querySelectorAll('.close');
    const moreBtns = document.querySelectorAll('.more');
    const articles = document.querySelectorAll('article');
    const navBtn = document.querySelector("#nav-btn");
    const navUl = document.querySelector("nav ul");

    moreBtns.forEach((btn, index) => btn.addEventListener('click', ()=> {
        articles.forEach(article => article.classList.remove('deployed'));
        articles[index].classList.add('deployed');
    }))

    closeBtns.forEach(btn => btn.addEventListener('click', () => {
        (btn.parentNode.parentNode.parentNode).classList.remove('deployed');
    }));

    navBtn.addEventListener('click', () => {
        navBtn.classList.toggle('close');
        navUl.classList.toggle('deployed');
    });

})