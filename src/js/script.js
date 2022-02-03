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
  
  class BooksList {
    constructor() {
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
      
    }
  
    initData() {
      
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
     
    }
  
    getElements() {
      const thisBooksList = this;
      thisBooksList.bookListContainer =  document.querySelector(select.containerOf.bookList);
      thisBooksList.bookList =  document.querySelector(('.books-list'));
      thisBooksList.form =  document.querySelector('.filters'); 
      thisBooksList.bookImage =  document.querySelector('book__image[data-id=id]'); 
      
    }
  
    render() {
      const thisBooksList = this;

      for(let book of thisBooksList.data) {
  
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating*10; 
  
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;
    
        /*generate HTML based on template*/
        const generatedHTML = templates.bookTemplate(book);
      
        /*create element using utils.createElementFromHTML */
        const element = utils.createDOMFromHTML(generatedHTML);
      
        /*add element to book-list*/
        thisBooksList.bookList.appendChild(element);
      }
    }
  
    initActions() {
      const thisBooksList = this;
      
      thisBooksList.bookList.addEventListener('dblclick', function (event){
        event.preventDefault(); 
        if(event.target.offsetParent.classList.contains('book__image')){
          const image = event.target.offsetParent;
          const bookId = image.getAttribute('data-id'); 
          if(thisBooksList.favoriteBooks.includes(bookId)){
            image.classList.remove('favorite');
            const indexOfImage = thisBooksList.favoriteBooks.indexOf(bookId);
            thisBooksList.favoriteBooks.splice(indexOfImage, 1);
          } else {
            image.classList.add('favorite');
            thisBooksList.favoriteBooks.push(bookId);
          }
        }
      });
  
      thisBooksList.form.addEventListener('click', function (event){
        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
          console.log('value:', event.target.value); 
          if(event.target.checked){ 
            thisBooksList.filters.push(event.target.value);
          } else {
            const indexOfFilters = thisBooksList.filters.indexOf(event.target.value);
            thisBooksList.filters.splice(indexOfFilters, 1);
          }
        }
    
        thisBooksList.filterBooks();
      });
    }
  
    filterBooks() {
      const thisBooksList = this;
      for(let book of dataSource.books){
        let shouldBeHidden = false;
        for(const filter of thisBooksList.filters) {
          if(!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        
        if(shouldBeHidden == true){
          document.querySelector('.book__image[data-id="' + book.id + '"]').classList.add('hidden');
        } else {
          document.querySelector('.book__image[data-id="' + book.id + '"]').classList.remove('hidden');
        }
      } 
    }
  
    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        return 'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if (rating > 8 && rating <= 9) {
        return 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        return 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }
  new BooksList();
}