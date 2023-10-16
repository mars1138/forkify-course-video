class SearchView {
  _parentElement = document.querySelector('.search'); // form element in header

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value; // form input element
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    // event listener on Form, not button, so that we can listen for submit(click or enter) instead of just click
    // cannot call handler immediately, or page will reload for submit event; must use e.preventDefault()
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
