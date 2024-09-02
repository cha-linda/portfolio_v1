document.addEventListener('DOMContentLoaded', () => {

    const app = document.querySelector(".app");

    const gallery = [
        "/test_gallery/akira.jpeg",
        "/test_gallery/blue_velvet.webp",
        "/test_gallery/gang_starr.jpg",
        "/test_gallery/in_the_mood_for_love.jpg",
        "/test_gallery/kobe_champion.jpg",
        "/test_gallery/kobe.jpg",
        "/test_gallery/kurosawa.jpg",
        "/test_gallery/log_lady.jpg",
        "/test_gallery/miles_davis.webp",
        "/test_gallery/nirvana.webp",
        "/test_gallery/only_god_forgives.webp"

    ]

    function pickRandom(n) {
        return Math.floor(Math.random() * n);
    }

    function toUrl(i) {
        return "url('" + i + "')";
    }
    let current = app.style.backgroundImage;
    console.log(app.style.backgroundImage);
    app.addEventListener('mouseenter', () => {
        let current = app.style.backgroundImage;
        console.log(current);
        let picked = toUrl(gallery[pickRandom(gallery.length)]);
        picked == current ? picked : app.style.backgroundImage = picked;
       /* if(picked !== current) {
            app.style.backgroundImage = picked;
            console.log("ok");
        } else {
            console.log("same");
            let newpick = picked;
            app.style.backgroundImage = newpick;
        }*/
    })


    const distorsion = document.querySelector(".skew");
    let baseW = distorsion.clientWidth / 2;
    let baseH = distorsion.clientHeight / 2;
    distorsion.addEventListener("mousemove", (e) => {
        let targets = document.querySelectorAll(".target");
        const rect = distorsion.getBoundingClientRect(),
        x = e.clientX - rect.left - baseW,
        y = e.clientY - rect.top - baseH;


        //console.log(rect);
        console.log([x,y]);
        targets.forEach(target => {
            target.style.setProperty("--mouse-x", `${x / 20}deg`);
            target.style.setProperty("--lat-shadow", `${x / 30}px`);
        })


    })

})