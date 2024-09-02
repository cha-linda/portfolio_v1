window.addEventListener('DOMContentLoaded', (event) => {
    let card = document.querySelector('.card--recto');
    let content = document.querySelector('#content');
    let statTargets = document.querySelectorAll('#content p[data]');
    let reset = document.querySelector("#reset-btn");

    card.addEventListener('click', (event) => {
        //========================================================================DATA
        const classesData = [
            {
                roleClass: "Barbare",
                firstCaract: "force",
                secondCaract: "constit",
                thirdCaract: "dex",
                lifeDice: 12
            },
            {
                roleClass: "Barde",
                firstCaract: "char",
                secondCaract: "dex",
                thirdCaract: "int",
                lifeDice: 8
            },
            {
                roleClass: "Clerc",
                firstCaract: "sag",
                secondCaract: "force",
                thirdCaract: "char",
                lifeDice: 8
            },
            {
                roleClass: "Druide",
                firstCaract: "sag",
                secondCaract: "constit",
                thirdCaract: "dex",
                lifeDice: 8
            },
            {
                roleClass: "Ensorceleur",
                firstCaract: "char",
                secondCaract: "constit",
                thirdCaract: "int",
                lifeDice: 6
            },
            {
                roleClass: "Guerrier",
                firstCaract: "force",
                secondCaract: "dex",
                thirdCaract: "constit",
                lifeDice: 10
            },
            {
                roleClass: "Magicien",
                firstCaract: "int",
                secondCaract: "constit",
                thirdCaract: "sag",
                lifeDice: 6
            },
            {
                roleClass: "Moine",
                firstCaract: "dex",
                secondCaract: "sag",
                thirdCaract: "int",
                lifeDice: 8
            },
            {
                roleClass: "Occultiste",
                firstCaract: "char",
                secondCaract: "constit",
                thirdCaract: "int",
                lifeDice: 8
            },
            {
                roleClass: "Paladin",
                firstCaract: "force",
                secondCaract: "char",
                thirdCaract: "constit",
                lifeDice: 10
            },
            {
                roleClass: "Rodeur",
                firstCaract: "dex",
                secondCaract: "sag",
                thirdCaract: "constit",
                lifeDice: 10
            },
            {
                roleClass: "Roublard",
                firstCaract: "dex",
                secondCaract: "int",
                thirdCaract: "char",
                lifeDice: 8
            }

        ]

        const racesData = [
            {
                race: "Elfe"
            },
            {
                race: "Halfelin"
            },
            {
                race: "Humain"
            },
            {
                race: "Nain"
            },
            {
                race: "Demi-elfe"
            },
            {
                race: "Demi-orc"
            },
            {
                race: "Drakéide"
            },
            {
                race: "Gnome"
            },
            {
                race: "Tieffelin"
            }
        ]

        //========================================================================BASIS FUNCTIONS

        function rollDice(max) {
            return 1 + Math.floor(Math.random() * max);
        }

        function pickRandom(n) {
            return Math.floor(Math.random() * n);
        }

        function shuffle(n) {
            return n.sort(() => Math.random() - 0.5);
        }

        function randomAssign(array) {
            shuffle(array);
            let element = array[pickRandom(array.lenght)];
            return array.pop(pickRandom(element));
        }

        function sum(a, b) {
            return a + b;
        }

        function substract(a, b) {
            return a - b;
        }

        function modificator(n) {
            let numb = (n - 10) / 2;
            return numb % 2 === 0 ? numb : Math.floor(numb);
        }

        function statBuilder() {
            //Build a single stat.
            let dices = [0, 0, 0, 0];
            let roll = dices.map(element => element + rollDice(6)).sort(substract);
            let stat = roll.slice(1);
            return stat.reduce(sum);
        }

        function allStats() {
            //Build an array of 6 single stats
            let stats = [0, 0, 0, 0, 0, 0];
            return (stats.map(element => element + statBuilder())).sort(substract);
        }



        function buildHero() {

        }

        let heroStat = allStats();
        console.log(heroStat);
        //Make simple arrays from the roleClass column of classesData & from racesData
        let classes = classesData.map(element => element.roleClass);
        let races = racesData.map(element => element.race);
        // Pick a random class & race
        let heroClass = classes[pickRandom(classes.length)];
        let heroRace = races[pickRandom(races.length)];
        // Extract an hero pattern from classesData
        let hero = classesData.find(element => element.roleClass === heroClass);
        console.log(hero);
        let basisFeatures = ['dex', 'force', 'constit', 'int', 'sag', 'char'];

        // _____ STATS ASSIGNEMENT

        Object.assign(hero, { [hero.firstCaract]: heroStat.pop() }, { [hero.secondCaract]: heroStat.pop() }, { [hero.thirdCaract]: heroStat.pop() });

        let heroBuild = Object.keys(hero);
        console.log(heroBuild);
        let heroMainFeatures = heroBuild.filter(element => heroBuild.indexOf(element) > (heroBuild.length - 1) - 3);
        let featuresToAssign = basisFeatures.filter(element => !heroMainFeatures.includes(element));
        let heroLeftStat = [...heroStat]

        featuresToAssign.forEach(element => Object.assign(hero, { [element]: randomAssign(heroLeftStat) }));

        // _____ HEALTH ASSIGNEMENT

        let mod = modificator(hero.constit);
        Object.assign(hero, { hp: hero.lifeDice + mod })

        // _____ RACE FEATURES ASSIGNEMENT

        Object.assign(hero, { race: heroRace });

        function setRaceBonus() {
            // assign additional features to hero
            switch (hero.race) {
                case "Humain":
                    // +1 all features
                    hero.dex += 1;
                    hero.force += 1;
                    hero.constit += 1;
                    hero.int += 1;
                    hero.sag += 1;
                    hero.char += 1;
                    break;
                case "Nain":
                    // +2 constit
                    hero.constit += 2;
                    break;
                case "Demi-elfe":
                    // +2 char & +1 on two other random feat.
                    hero.char += 2;
                    basisFeatures.splice(basisFeatures.indexOf("char"), 1);
                    while (basisFeatures.length > 3) {
                        shuffle(basisFeatures);
                        let element = basisFeatures.pop();
                        hero[element] += 1;
                    }
                    break;
                case "Demi-orc":
                    // +2 force & +1 constit
                    hero.force += 2;
                    hero.constit += 1;
                    break;
                case "Drakéide":
                    // +2 force & +1 char
                    hero.force += 2;
                    hero.char += 1;
                    break;
                case "Gnome":
                    // +2 int  
                    hero.int += 2;
                    break;
                case "Tieffelin":
                    // +1 int & +2 char
                    hero.char += 2;
                    hero.int += 1;
                    break;
                default:
                    // +2 dex (Elfe & Halfelin)  
                    hero.dex += 2
                    break;
            }
        }

        setRaceBonus();



        // _____ DISPLAY DATA
        Array.from(statTargets).forEach(element => element.innerHTML = hero[element.attributes['data'].value]);
        card.classList.add('display-none');
        content.classList.remove('display-none');
        reset.classList.remove('display-none');

    })
    reset.addEventListener('click', (event) => {
        card.classList.remove('display-none');
        content.classList.add('display-none');
        reset.classList.add('display-none');
    })

})