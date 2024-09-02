document.addEventListener('DOMContentLoaded', (event) => {

    const targets = document.querySelectorAll('#highlight .item h3 span');
    let targetsData = Array.from(targets).map(element => element.attributes.data.value);
        
    function launchCounter(el, value, speed) {
        let elVal = 0;
        const counter = setInterval(() => {
            elVal++;
    
            if (elVal === value) {
                clearInterval(counter);
            }
            
            el.textContent = elVal;
            
        }, speed);
}

targets.forEach((element, index) => launchCounter(element, Number(targetsData[index]), 350));
    


    // déclencher le compteur en fonction de la position au scroll de son parent
    /* const observer = new IntersectionObserver(function (entries) {
        for(const entry of entries) {
            console.log(entry.target);
            if(entry.isIntersecting === true) {
                targets.forEach((element, index) => launchCounter(element, Number(targetsData[index])));
            }
        }
    }, {
        threshold: 0.5 // permet d'indiquer la zone à partir de laquelle l'élément devient 'visible'
    }); */

        
})