//Creado por Sebas Gibaja Aka Strowblack 
const formulario = document.getElementById("busqueda");
const inputNombre = document.getElementById("nombre");
const divResultados = document.querySelector(".resultados");
const urlCharacters = "https://rickandmortyapi.com/api/character/";
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const pagina = document.getElementById("pagina");
const contenedorpagina = document.getElementById("pages"); 
var nextpagina = 0;
var prevpagina = 0;
var paginastotales= 0;
var paginas = 1;

async function getCharactersByName(name)
{
    const urlFetch = urlCharacters + "?name=" + name;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getCharactersBypagenext(nextpagina)
{
    const urlFetch = nextpagina;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getCharactersBypageprev(prevpagina)
{
    const urlFetch = prevpagina;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

formulario.addEventListener("submit", e => {
    contenedorpagina.style.display="block";
    e.preventDefault();
    const name = inputNombre.value.trim();
    getCharactersByName(name)
        .then(characters => {
            divResultados.innerHTML = " ";
            console.log(characters)
            nextpagina = characters.info.next;
            prevpagina = characters.info.prev;
            paginastotales = characters.info.pages;
            characters.results.forEach(element => {
                var template = `<div class="contenedorfotos">
                                        <div class="foto">
                                            <img src="${element.image}" alt="a">
                                        </div>
                                        <div class="texto">
                                            <p>Nombre: ${element.name}</p>
                                            <p>Sexo: ${element.gender}</p>
                                            <p>Origen: ${element.origin.name}</p>
                                            <p>Especie: ${element.species}</p>
                                            <p>Status: ${element.status}</p>
                                        </div>
                                    </div>`;
                divResultados.innerHTML += template;
            });
            pagina.innerHTML=paginas+"/"+paginastotales;
        });
});

next.addEventListener("click",function(){
    if(paginas<paginastotales){
        paginas++;
    }
    const name = nextpagina;
    getCharactersBypagenext(name)
        .then(characters => {
            divResultados.innerHTML = " ";
            console.log(characters)
            nextpagina = characters.info.next;
            prevpagina = characters.info.prev;
            paginastotales = characters.info.pages;
            characters.results.forEach(element => {
                var template = `<div class="contenedorfotos">
                                        <div class="foto">
                                            <img src="${element.image}" alt="a">
                                        </div>
                                        <div class="texto">
                                            <p>Nombre: ${element.name}</p>
                                            <p>Sexo: ${element.gender}</p>
                                            <p>Origen: ${element.origin.name}</p>
                                            <p>Especie: ${element.species}</p>
                                            <p>Status: ${element.status}</p>
                                        </div>
                                    </div>`;
                divResultados.innerHTML += template;
            });
            pagina.innerHTML=paginas+"/"+paginastotales;
        });
})

prev.addEventListener("click",function(){
    if(paginas>1){
        paginas--;
    }
    const name = prevpagina;
    getCharactersBypageprev(name)
        .then(characters => {
            divResultados.innerHTML = " ";
            console.log(characters)
            nextpagina = characters.info.next;
            prevpagina = characters.info.prev;
            paginastotales = characters.info.pages;
            characters.results.forEach(element => {
                var template = `<div class="contenedorfotos">
                                        <div class="foto">
                                            <img src="${element.image}" alt="a">
                                        </div>
                                        <div class="texto">
                                            <p>Nombre: ${element.name}</p>
                                            <p>Sexo: ${element.gender}</p>
                                            <p>Origen: ${element.origin.name}</p>
                                            <p>Especie: ${element.species}</p>
                                            <p>Status: ${element.status}</p>
                                        </div>
                                    </div>`;
                divResultados.innerHTML += template;
            });
            pagina.innerHTML=paginas+"/"+paginastotales;
        });
})