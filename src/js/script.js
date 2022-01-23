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

      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating*10; 

      book.ratingBgc = ratingBgc;
      book.ratingWidth = ratingWidth;

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

    const form = document.querySelector('.filters'); 

    form.addEventListener('click', function (event){
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        console.log('value:', event.target.value); 
        if(event.target.checked){ 
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

      const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]'); 
      if(shouldBeHidden == true){
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    } 
  }

  
  function determineRatingBgc(rating) {
    let background = '';

    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }
  
  render ();
  initActions();
  


  

}