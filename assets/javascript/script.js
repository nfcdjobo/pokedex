const inputSearch = document.querySelector(".input-search");
const listePokemon = document.querySelector(".liste-pokemon");
const loader = document.querySelector(".loader");

// scroll infini



inputSearch.addEventListener("input", (e)=>{
    if(e.target.value != ""){
        e.target.parentNode.classList.add("move-label");
    }else{
        e.target.parentNode.classList.remove("move-label");
    }
}) ;

let toutPokemon = [];
let pokemonFilter = [];

function interrogPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=500`)
    .then(response1=>{
        return response1.json();
    })
    .then(data =>{
         data.results.forEach(cle=>{
             trouverPokemon(cle)
         })
    })
}
interrogPokemon();

// Trouver les pokemon
function trouverPokemon(pokemon){
    let objetPokemonFull = {}
    let url = pokemon.url;
    let nameP = pokemon.name;
    

    fetch(url)
    .then(reponse=> reponse.json())
    .then(pokeData=>{
        objetPokemonFull.pic = pokeData.sprites.back_default;
        objetPokemonFull.type = pokeData.types[0].type.name;
        objetPokemonFull.id = pokeData.id;

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
        .then(reponse=> reponse.json())
        .then(pokeData=>{
            objetPokemonFull.name = pokeData.names[4].name;
            objetPokemonFull.color = pokeData.color.name;
            toutPokemon.push(objetPokemonFull);
            if(toutPokemon.length === 385){
                let tableauFin = toutPokemon.sort((a, b)=> {
                  return  a.id - b.id
                }).slice(0, 21 );
                afficherPokemon(tableauFin);
            }
            loader.style.display = "none";
        })
    })
}

// Afficher les pokemon
function afficherPokemon(bigData){
    for(let i = 0; i < bigData.length; i++){
        const li = document.createElement("li");
        li.id = `li-${bigData[i].id}`;
        let couleur = bigData[i].color;
        li.style.background = couleur;

        const textCarte = document.createElement("h5");
        textCarte.textContent = bigData[i].name;

        const idCarte = document.createElement("p");
        idCarte.textContent = `#ID: ${bigData[i].id}`;

        const img = document.createElement("img");
        img.src = bigData[i].pic;

        li.append(img);
        li.append(textCarte);
        li.append(idCarte);
        listePokemon.append(li);
    }
}

window.addEventListener("scroll", ()=>{
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight -20){
        ajouterPokemon(6);
    }
});

let indece = 21;
function ajouterPokemon(nombre){
    if(indece > 385){
        return;
    }
    const newTableau = toutPokemon.slice(indece, indece + nombre);
    afficherPokemon(newTableau);
    indece += nombre;
}

inputSearch.addEventListener("keyup", rechercher);
function rechercher(){
    if(indece < 385){
        ajouterPokemon(364)
    }
    let filtrer, allLi, titreValeur, allTitles;
    filtrer = inputSearch.value.toUpperCase();
    allLi = document.querySelectorAll("li");
    allTitles = document.querySelectorAll("li > h5");
    for(let i =0; i < allLi.length; i++){
        titreValeur = allTitles[i].innerText;
        if(titreValeur.toUpperCase().indexOf(filtrer) > -1){
            allLi[i].style.display = "flex";
        }else{
            allLi[i].style.display = "none";
        }
    }
}

// Action de recherche sur le bouton recherche 
// const formGlobal = document.querySelector(".form-global");
// 
// formGlobal.addEventListener("click", (e)=>{
//     e.preventDefault();
//     rechercher();
// })
