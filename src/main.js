import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

const myApiKey = '35720970-632b5595f4a574f3205602e3c';

const ligthbox = new SimpleLightbox('.gallery a#lightbox-link');

document.querySelector(
  'form#image-search'.addEventListener('submit', async event => {
    event.prventDefault();
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
