import View from './View.js'; // parent class
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class BookmarksView extends View {
  // this._data = model.state.bookmarks = array of recipe objects
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet.  Find a nice recipe and bookmark it  😊';
  _message = '';

  // must add this to make sure any bookmarks are rendered before an update() is performed after a load event
  // otherwise, the contents of bookmarks array will be compared to the html of an empty bookmarks section
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
