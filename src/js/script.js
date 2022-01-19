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
 
  function initActions() {
    const thisBook = this;
    const favoriteBooks = [];
    const bookImages = document.querySelectorAll(select.containerOf.bookImage);

    for(let image of bookImages) {
        image.addEventListener('dblclick', function (event){
            event.preventDefault();
            image.classList.add('favorite');
            const bookId = thisBook.bookList.getAttribute('data-id');
            favoriteBooks.push(bookId);
          });
    }
  }


  render ();
  initActions();


}