class Book {
  constructor(BookTitle, ISBN, Author, Genre, QuantityInStock) {
    this.BookTitle = BookTitle;
    this.ISBN = ISBN;
    this.Author = Author;
    this.Genre = Genre;
    this.QuantityInStock = parseInt(QuantityInStock);
  }

  // Decrease stock when book is borrowed
  borrowBook() {
    if (this.QuantityInStock >= 1) {
      this.QuantityInStock -= 1;
      return true;
    }
    return false;
  }

  // Increase stock when book is returned
  returnBook() {
    this.QuantityInStock += 1;
  }

  toString() {
    return `${this.BookTitle} (ISBN: ${this.ISBN}) by ${this.Author} | Genre: ${this.Genre} | Stock: ${this.QuantityInStock}`;
  }
}

export default Book;
