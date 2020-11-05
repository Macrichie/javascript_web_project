const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

//  API
let count = 5;
const apiKey = "cN2AcWS3U_9bfgJtJCShwfzrdjSljdETeR83X2IPSmk";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

// Helper function to setAttribute on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // run function for each obj in  photosArray
  photosArray.forEach((photo) => {
    // create <a> to link Unsplash
    const aLink = document.createElement("a");
    setAttributes(aLink, {
      href: photo.links.html,
      target: "",
    });
    // Create <img> for photo
    const imgElement = document.createElement("img");
    setAttributes(imgElement, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    imgElement.addEventListener("load", imageLoaded);
    // Put <img> inside <a> and then put both inside imageContainer Element
    aLink.appendChild(imgElement);
    imageContainer.appendChild(aLink);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //   catch error
    console.log(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    (window,
    innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
  ) {
    ready = false;
    getPhotos();
  }
});

// onload
getPhotos();
