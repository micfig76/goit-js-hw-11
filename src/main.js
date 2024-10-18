import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { comma } from 'postcss/lib/list';

const myApiKey = '35720970-632b5595f4a574f3205602e3c';

const ligthbox = new SimpleLightbox('.gallery a#lightbox-link');

document
  .querySelector('form#image-search')
  .addEventListener('submit', async event => {
    event.preventDefault();

    const form = event.target;
    const searchQuery = form.elements['query'].value;
    form.reset();
    const gallery = document.querySelector('.gallery');
    gallery.replaceChildren(createLoader());

    const photosData = await getPhotos(searchQuery).catch(error => {
      iziToast.error({
        message: 'Sorry, the images can`t be loaded. Please try again later',
        position: 'topRight',
      });
      console.log(error);
      gallery.replaceChildren();
    });

    if (photosData.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search. Please try again later',
        position: 'topRight',
      });
      gallery.replaceChildren();
      return;
    }
    const postCards = photosData.hits
      .map(toGalleryPhoto)
      .map(createCard)
      .map(applyLightbox);

    gallery.replaceChildren(...photoCards);
    ligthbox.refresh();
  });

const getPhotos = async searchQuery => {
  const params = new URLSearchParams({
    key: myApiKey,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`https://pixabay.com/api/?${params}`).then(response =>
    response.json()
  );
};

const toGalleryPhoto = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
});

const createCard = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  comments,
  downloads,
}) => {
  const template = document.querySelector('template#card-template');
  const card = document.importNode(template.textContent, true);

  const lightboxLink = card.querySelector('a#lightbox-link');
  lightboxLink.href = largeImageURL;

  const img = card.querySelector('img.card-img');
  img.src = webformatURL;
  img.alt = tags;
  img.title = tags;

  card.querySelector(
    'span.card-stats-item-count[data-item="likes"]'
  ).textContent = likes;

  card.querySelector(
    'span.card-stats-item-count[data-item="views"]'
  ).textContent = views;

  card.querySelector(
    'span.card-stats-item-count[data-item="comments"]'
  ).textContent = comments;

  card.querySelector(
    'span.card-stats-item-count[data-item="downloads"]'
  ).textContent = downloads;

  return card;
};

const applyLightbox = card => {
  card.querySelector('a#lightbox-link').addEventListener('click', event => {
    event.preventDefault();

    const closeModalOnEscape = event => {
      if (event.key === 'Escape') {
        document.removeEventListener('keydown', closeModalOnEscape);
        ligthbox.close();
      }
    };

    document.addEventListener('keydown', closeModalOnEscape);

    ligthbox.open(event.currentTarget);
  });

  return card;
};

const createLoader = () => 
  Object.assign(document.createElement('div'), { className: 'loader' });
