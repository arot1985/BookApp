'use strict';
{  
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      bookImage: '.books-list .book__image',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  function render (){

    for(let book of dataSource.books) {

      /*generate HTML based on template*/
      const generatedHTML = templates.bookTemplate(book);
  
      /*create element using utils.createElementFromHTML */
      const element = utils.createDOMFromHTML(generatedHTML);
  
      /*find booklist container*/
      const bookListContainer = document.querySelector(select.containerOf.bookList);
      /*add element to book-list*/
      bookListContainer.appendChild(element);
    }
  }

  /*function initActions() {
    const favoriteBooks = [];
    const bookImages = document.querySelectorAll(select.containerOf.bookImage);

    for(let image of bookImages) {
      image.addEventListener('dblclick', function (event){
        event.preventDefault();
        const bookId = image.getAttribute('data-id'); 

        if(favoriteBooks.includes(bookId)){
          image.classList.remove('favorite');
          const indexOfImage = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(indexOfImage, 1);
        } else {
          image.classList.add('favorite');
          favoriteBooks.push(bookId);
        }

      });
    }
  }*/

  const favoriteBooks = [];
  const filters = [];

  function initActions() {
    const bookList = document.querySelector(('.books-list'));

    bookList.addEventListener('dblclick', function (event){
      event.preventDefault();
        
      if(event.target.offsetParent.classList.contains('book__image')){
        const image = event.target.offsetParent;
        const bookId = image.getAttribute('data-id'); 
        if(favoriteBooks.includes(bookId)){
          image.classList.remove('favorite');
          const indexOfImage = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(indexOfImage, 1);
        } else {
          image.classList.add('favorite');
          favoriteBooks.push(bookId);
        }
      }

    });

    const form = document.querySelector('filters'); /*?????*/

    form.addEventListener('click', function(event){
      event.preventDefault();

      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        console.log('value:', event.target.value); /* ????*/
        if(event.target.checked){ /*czy ma być checked == true? */
        filters.push(event.target.value);
        } else {
        const indexOfFilters = filters.indexOf(event.target.value);
        filters.splice(indexOfFilters, 1);
        }
      }

      filterBooks();
    });
  
  }

  function filterBooks (){

    for(let book of dataSource.books){
      let shouldBeHidden = false;
      for(const filter of filters) {
        if(!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
    }

    if(shouldBeHidden == true){
      const bookImage = document.querySelectorAll('book__image[data-id="id"]'); /*??????????*/ 
      bookImage.classList.add('hidden');
    } else {
        bookImage.classList.remove('hidden');
    }

  }
  
  render ();
  initActions();

  

}