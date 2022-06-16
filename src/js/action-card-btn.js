import { moviesCashe } from './global.js';
import { refs } from './global.js';
import { DataStorage } from './data.js';

const data = new DataStorage();
let movieCard;
export let timerID = null;

// action btn on the movie card
export function onQueueBtnCard(btn, id) {
  movieCard = btn.closest('.card');

  if (data.getQueue().find(item => item.id === id)) {
    if (!refs.header.classList.contains('header-library')) {
      data.removeFromQueue(id);
      movieCard.classList.remove('in-queue');
      return;
    }

    cancelDeletingMovieCardFromQueueLibrary(movieCard, id);
    return;
  }

  let movie = data.getWatched().find(item => item.id === id);
  if (movie) {
    // NEED TO COMPLETE
    if (!refs.header.classList.contains('header-library')) {
      data.removeFromWatched(id);
      movieCard.classList.remove('in-watched');
    }
    cancelDeletingMovieCardFromWatchedLibrary(movieCard, id);
  }

  if (!movie) {
    movie = moviesCashe.state.find(item => item.id === id);
  }
  data.addToQueue(movie);
  movieCard.classList.add('in-queue');
  // add notify
}

export function onWatchedBtnCard(btn, id) {
  movieCard = btn.closest('.card');

  if (data.getWatched().find(item => item.id === id)) {
    if (!refs.header.classList.contains('header-library')) {
      data.removeFromWatched(id);
      movieCard.classList.remove('in-watched');
      return;
    }
    cancelDeletingMovieCardFromWatchedLibrary(movieCard, id);
    return;
  }

  let movie = data.getQueue().find(item => item.id === id);
  if (movie) {
    // !!! NEED TO COMPLETE
    if (!refs.header.classList.contains('header-library')) {
      data.removeFromQueue(id);
      movieCard.classList.remove('in-queue');
    }
    cancelDeletingMovieCardFromQueueLibrary(movieCard, id);
  }

  if (!movie) {
    movie = moviesCashe.state.find(item => item.id === id);
  }
  data.addToWatched(movie);
  movieCard.classList.add('in-watched');
  // add notify
}

function cancelBtnApperingAndPlacement(movieCard) {
  refs.cancelBtn.classList.remove('is-hidden');
  refs.cancelBtn.classList.add('cancel-animation');
  refs.cancelBtn.style.top = `${movieCard.offsetTop}px`;
  refs.cancelBtn.style.left = `${Math.floor(movieCard.offsetLeft - 1)}px`;
}

function cancelDeletingMovieCardFromQueueLibrary(movieCard, id) {
  cancelBtnApperingAndPlacement(movieCard);

  timerID = setTimeout(() => {
    refs.cancelBtn.classList.add('is-hidden');
    refs.cancelBtn.classList.remove('cancel-animation');
    data.removeFromQueue(id);
    movieCard.classList.remove('in-queue');
    movieCard.remove();

    // check if delete last movie in page, show an empty queue-library
    data.getQueue().length === 0
      ? refs.cardsSection.classList.add('empty-library')
      : null;
  }, 2500);
}

function cancelDeletingMovieCardFromWatchedLibrary(movieCard, id) {
  cancelBtnApperingAndPlacement(movieCard);

  timerID = setTimeout(() => {
    refs.cancelBtn.classList.add('is-hidden');
    refs.cancelBtn.classList.remove('cancel-animation');
    data.removeFromWatched(id);
    movieCard.classList.remove('in-watched');
    movieCard.remove();

    // check if delete last movie in page, show an empty queue-library
    data.getWatched().length === 0
      ? refs.cardsSection.classList.add('empty-library')
      : null;
  }, 2500);
}
