let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// unsplash API
let count = 5;
const apiKey = 'qkJJA89quI7DbiJGenz3gXH9NofJx0sXbawmLVy-sZw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// 
function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
      
    }
    }
    

// Create elements for links & photos, add to DOM

function displayPhotos() {
    //  Run function for each object in photosArray
totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        const loader = document.querySelector('#loader');
const imageContainer = document.querySelector('.image-container');
//  create <a> to link to Unsplash
const item = document.createElement('a');
// item.setAttribute('href', photo.links.html);
// item.setAttribute('target', '_blank');

setAttributes(item, {
    href: photo.links.html,
    target: '_blank',
})
// Create <img> for photo
const img = document.createElement('img');
// img.setAttribute('src', photo.urls.regular);
// img.setAttribute('alt', photo.alt_description);
// img.setAttribute('title', photo.alt_description);
setAttributes(img, {
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.alt_description,
});

// Event listner-check when each is finished loading
function imageLoaded() {
    
    imagesLoaded++;
    if (imagesLoaded >= totalImages) {
        ready = true;
        loader.hidden = true;
  
      count = 30;
    }
};

img.addEventListener('load', imageLoaded());


// Put <img> inside <a>, then put both inside imgContainer Element
item.appendChild(img);
imageContainer.appendChild(item);


    });
}

// get photos from Unsplash
async function getPhotos() {
    try {
        const response = await fetch (apiUrl);
        photosArray = await response.json();
   
        displayPhotos();


    }

    catch (error) {
        // catch error here
    }
};

// Check to see if scrolling near bottom of page

window.addEventListener('scroll', () => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
{
    ready = false;
    getPhotos();
}});

getPhotos();

