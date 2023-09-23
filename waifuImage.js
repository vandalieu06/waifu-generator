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
        console.log(result)
        return result;
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

//Obtencion de datos IMG
async function imagenSrc() {
    let imageRandom = document.querySelector('#image__random');
    let tittleWaifu = document.querySelector('.waifu__tittle--image');
    let tagWaifu = document.querySelector('.waifu__tag--image');

    try {
        imageRandom.classList.remove('opacity-fade-in')
        imageRandom.classList.add('opacity-fade')

        let img = await buscarImagen();
        
        await new Promise( resolve => setTimeout(resolve, 2000))

        let url = img.images[0].url;
        let tittle = img.images[0].tags[0].description;
        let tag = img.images[0].tags[0].name;

        imageRandom.setAttribute('src', url)

        await new Promise( resolve => setTimeout(resolve, 3000))

        imageRandom.classList.remove('opacity-fade')
        imageRandom.classList.add('opacity-fade-in')

        let spanTittle = document.createElement('span');
        spanTittle.innerHTML = tittle;
        tittleWaifu.appendChild(spanTittle);
        
        let spanTag = document.createElement('span');
        spanTag.innerHTML = tag;
        tagWaifu.appendChild(spanTag)


    } catch (error) {
        console.log(error)
    };
}

//Ejecutar evento al incio de la pagina
imagenSrc()

//Evento Boton Random
let btnRandom = document.querySelector('.waifu__btn--random');
btnRandom.addEventListener('click', imagenSrc)    