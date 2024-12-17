class Book {
  constructor(bookTitle, isbn, author, genre, quantityInStock) {
    this.bookTitle = bookTitle;
    this.isbn = isbn;
    this.author = author;
    this.genre = genre;
    this.quantityInStock = parseInt(quantityInStock);
  }

  // Decrease stock when book is borrowed
  borrowBook() {
    if (this.quantityInStock >= 1) {
      this.quantityInStock -= 1;
      return true;
    }
    return false;
  }

  // Increase stock when book is returned
  returnBook() {
    this.quantityInStock += 1;
  }

  toString() {
    return `${this.bookTitle} (ISBN: ${this.isbn}) by ${this.author} | Genre: ${this.genre} | Stock: ${this.quantityInStock}`;
  }
}

export default Book;
