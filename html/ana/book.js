print("Hello");

emptyShelf = {};
books = { book: { title: "The Disposessed",
                  author: { first: "Ursula K.", last: "LeGuin" } },
          neighbors: { book: { title: "Lathe of Heaven",
                               author: { first: "Ursula K.", last: "LeGuin" } },
                       neighbors: { book: { title: "Left Hand of Darkness",
                                            author: { first: "Ursula K.", last: "LeGuin" } },
                                    neighbors: emptyShelf }
                                }
                    };

var disposessed = books.book
var latheofheaven = books.neighbors.book
var lefthandofdarkness = books.neighbors.neighbors.book

// shelf = emptyShelf OR { book : { title: string,
//                                  author : {first: string, last: string} },
//                         neighbors : shelf }
// shelf -> number

// If the shelf is an emptyShelf, the count is 0. If the shelf is a
// book with neighbors (the rest of the shelf), then return "1" added
// to the count of the neighbors.

function countBooks (shelf) {
    if (_.isEqual(shelf, emptyShelf)) {
      return 0;
    } else {
	   return 1 + countBooks(shelf.neighbors);
    }
}

shouldEqual(countBooks(emptyShelf), 0);
shouldEqual(countBooks(books), 3);

// firstBook
//// shelf = emptyShelf OR { book : { title: string,
//                                  author : {first: string, last: string} },
//                         neighbors : shelf }
// shelf --> object

//firstBook will input our shelf and return the first whole book (as object). 
//If the shelf is emptyShelf then return "emptyShelf" because that is an empty object (?????????). 
//If the shelf is a book with neighbors then return the first book, which is an object. 

function firstBook (shelf){
	if (_.isEqual(shelf, emptyShelf)) {
		return emptyShelf;
	}
	else {
		return shelf.book;
	}
}

shouldEqual(firstBook(emptyShelf), emptyShelf);
shouldEqual(firstBook(books), { title: "The Disposessed",
author: { first: "Ursula K.", last: "LeGuin" }} );
