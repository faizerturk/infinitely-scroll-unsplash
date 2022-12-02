const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

/* Unsplash API*/
let count = 5;
const apiKey = "X4AAXhBoil5wAvrdP2a9Y2mlz9Rj_20C1G8t8FJ57Bw";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

/*Check if all images were loaded*/
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true; //loader hidden
    count = 30; // after initial 5 photo loaded make the other num of photos 30
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
  }
}

/*Helper function to set attributes on DOM elements*/
function setAttiributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

/* Create Elements for links & photos, add to DOM  */
function displayPhotos() {
  imagesLoaded = 0; // reset imagesloaded otherwise it goes like 60,90,120....
  totalImages = photosArray.length;
  /* Run function for each object in photosArray */
  photosArray.forEach((photo) => {
    /* create <a> to link to unsplash */
    const item = document.createElement('a');
    setAttiributes(item, {
      href: photo.links.html,
      target: '_blank',
    })

    /*
    or without setAttributes function it can be done with more lines of code
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');
    */

    /* create <img> for photo */
    const img = document.createElement('img');
    setAttiributes(img, {
      src: photo.urls.regular,
      alt: photo.description,
      title: photo.description,
    })

    /*Event Listener, check when each is finished loading*/
    img.addEventListener('load', imageLoaded);

    /* put <img> inside <a> , then put both inside imgContainer */
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}

/*Get photos from Unsplash APı*/
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (err) {
    console.log(err);
  }
}

/*Check to see if scrolling near bottom of page, Load more photos*/
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
})

/*On Load*/
getPhotos();
