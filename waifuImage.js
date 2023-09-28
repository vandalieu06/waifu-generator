const apiUrl = 'https://api.waifu.im/search';
const params = {
    "height": "<=1800",
    "is_nsfw": false
};

const queryParams = new URLSearchParams(params);
const requestUrl = `${apiUrl}?${queryParams}`;

// Obtener Respuesta de la API 
async function buscarImagen () {
    try{
        const response = await fetch(requestUrl);
        let result = await response.json();
        return result;
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

//Obtencion de datos IMG
async function imagenSrc() {
    let imageRandom = document.querySelector('#image__random');
    
    //Span para datos de descripcion
    let tittleWaifu = document.querySelector('.waifu__tittleimage .waifu__text--span');
    let tagWaifu = document.querySelector('.waifu__tag .waifu__text--span');
    let artistWaifu = document.querySelector('.waifu__artist .waifu__text--span');
    
    try {
        imageRandom.classList.remove('opacity-fade-in')
        imageRandom.classList.add('opacity-fade')
        
        //Obtencion datos de la funcion API
        let img = await buscarImagen();
        await new Promise( resolve => setTimeout(resolve, 2000))

        //Attributos de la Imagen
        let url = img.images[0].url;
        let tittle = img.images[0].tags[0].description;
        let tags = img.images[0].tags.map( (e) => { return e.name } )
        let tag = tags.join(', ');
        let artistText = img.images[0].artist ? img.images[0].artist.name : 'Desconocido';
    
        //Canvio src y Transicion de la imagen
        imageRandom.setAttribute('src', url);
        imageRandom.onload = () => {
            imageRandom.classList.remove('opacity-fade');
            imageRandom.classList.add('opacity-fade-in');
        }
        
        // Añadir descripcion de imagen
        tittleWaifu.innerHTML = tittle;
        tagWaifu.innerHTML = tag;
        artistWaifu.innerHTML = artistText; 
    } catch (error) {
        console.log(error)
    };
}

//Ejecutar evento al incio de la pagina
imagenSrc();

//Evento Boton Random
let btnRandom = document.querySelector('.waifu__btn--random');
btnRandom.addEventListener('click', imagenSrc)    