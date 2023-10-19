// Parcel can import more than just javaScript files
// need to tell
// import icons from '../imgs/icons.svg';  // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (ie. recipe);
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns { undefined | string} A markup string is returned if render=false
   * @this { Object } View instance
   * @author Jonas Schmedtmann
   * @todo Finish implementation
   */
  render(data, render = true) {
    // API will return empty array if no query match
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    // If rendering search results or bookmarks via previewView->render(), immediately return the html string
    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // create a new virtual DOM in memory
    // createContextualFragment() accepts a string and converts to real DOM node objects
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // create arrays of elements from node lists returned by query selector
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates have changed TEXT:
      // check that nodes are equal AND that first child is text (since we only want to change text value);
      // otherwise, might modify a parent element that contains an element as first child
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates have changed ATTRIBUTES:
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
