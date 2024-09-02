document.addEventListener("DOMContentLoaded", (event) => {
    
    /********************************************/
    /******* COMMANDE SON VIDEO ACCUEIL *********/
    /********************************************/
    const audioBtn = document.querySelector('.audio-btn');
    const isHome = document.querySelector(".page-accueil");
    
    function toggleMute() {
        let video = document.querySelector("video");
        video.muted = !video.muted;
        audioBtn.classList.toggle("active-btn");
    }
    
    if(isHome) {
        audioBtn.addEventListener("click", (event) => {
            toggleMute();
        });        
    }
    
    /********************************************/
    /********* FILTRES AFFICHAGE PRODUITS *******/
    /********************************************/
    const items = document.querySelectorAll('.projects .card');
    const productsFilters = document.querySelectorAll('.filters button');
    
    productsFilters.forEach(element => element.addEventListener("click", () => {
        /* paramétrage des icones */
        element.classList.add("active-filter");
        let currentIndex = element;
        let notActive = Array.from(productsFilters).filter(button => button != currentIndex);
        notActive.forEach(element => element.classList.remove("active-filter"));
        
        /* gestion de l'affichage des articles */
        Array.from(items).forEach(item => item.classList.add("hide"));
        let data = element.attributes.data.value;
        let show = Array.from(items).filter(item => item.attributes.data.value.includes(data));
        show.forEach(item => item.classList.remove("hide"));
        
        /* gestion affichage message no-result */
        let hidden = document.querySelectorAll('.hide');
        
        if (hidden.length === items.length) {
            noResultMessage.style.display = "flex";
        } else {
            noResultMessage.style.display = "none";
        }
    }));
    

})
