let toutAdmins = [];
let adminFilter = [];

function interrogAdmin(){
    fetch(`http://localhost:3000/api/admins?nom=a`)
    .then(response1=>{
        return response1.json();
        
    })
    .then(data =>{
         data.data.forEach(cle=>{
             console.log(cle)
         })
    })
}

interrogAdmin();
// // Trouver les admins
// function trouverAdmin(admin){
//     let objetAdminFull = {}
//     let url = admin.url;
//     let nameP = admin.name;
//     
// 
//     fetch(url)
//     .then(reponse=> reponse.json())
//     .then(adminData=>{
//         objetAdminFull.pic = adminData.sprites.back_default;
//         objetAdminFull.type = adminData.types[0].type.name;
//         objetAdminFull.id = adminData.id;
// 
//         fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
//         .then(reponse=> reponse.json())
//         .then(adminData=>{
//             objetAdminFull.name = adminData.names[4].name;
//             objetAdminFull.color = adminData.color.name;
//             toutAdmins.push(objetAdminFull);
//             if(toutPokemon.length === 385){
//                 let tableauFin = toutPokemon.sort((a, b)=> {
//                   return  a.id - b.id
//                 }).slice(0, 21 );
//                 afficherPokemon(tableauFin);
//             }
//             loader.style.display = "none";
//         })
//     })
// }