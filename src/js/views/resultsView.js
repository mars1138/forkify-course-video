import View from './View.js'; // parent class
// import icons from 'url:../../img/icons.svg'; // Parcel 2
import previewView from './previewView.js';

class ResultsView extends View {
  // this._data = model.getSearchResultsPage() = array of recipe objects
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query.  Please try again!  😊';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
