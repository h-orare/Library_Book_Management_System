import fs from "fs";
import csv from "csv-parser";

import Book from "./book.js";

import Student from "./student.js";

class Library {
  constructor() {
    this.books = [];
    this.students = [];
    this.borrowedBooks = new Map(); // Track borrowed books
  }

  // Initialize library data (read files once)
  async initialize(bookFilePath, studentFilePath) {
    await Promise.all([
      this.loadBooksFromCSV(bookFilePath),
      this.loadStudentsFromCSV(studentFilePath),
    ]);
  }

  // Load books from CSV
  loadBooksFromCSV(filePath) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          const book = new Book(
            row.BookTitle,
            row.ISBN,
            row.Author,
            row.Genre,
            row.QuantityInStock
          );
          this.books.push(book);
        })
        .on("end", () => {
          resolve();
        })
        .on("error", (error) => reject(error));
    });
  }

  // Load students from CSV
  loadStudentsFromCSV(filePath) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => {
          const student = new Student(
            row.studentName,
            row.studentID,
            row.major
          );
          this.students.push(student);
        })
        .on("end", () => {
          resolve();
        })
        .on("error", (error) => reject(error));
    });
  }

  // List all books
  listAllBooks() {
    console.log("\nAvailable Books:");
    this.books.forEach((book, index) => {
      console.log(`${index + 1}. ${book.toString()}`);
    });
  }

  // List all students
  listAllStudents() {
    console.log("\nRegistered Students:");
    this.students.forEach((student, index) => {
      console.log(`${index + 1}. ${student.toString()}`);
    });
  }

  // Borrow a book
  borrowBook(studentID, isbn) {
    const student = this.students.find((s) => s.studentID === studentID);
    const book = this.books.find((b) => b.ISBN === isbn);

    if (!student || !book) {
      console.log("Error: StudentID or ISBN not found.");
      return;
    }

    if (book.borrowBook()) {
      // Add book to the borrowed books map
      if (!this.borrowedBooks.has(studentID)) {
        this.borrowedBooks.set(studentID, []);
      }
      this.borrowedBooks.get(studentID).push(book);
      console.log(
        `Success: ${student.studentName} borrowed "${book.BookTitle}".`
      );
    } else {
      console.log(`Error: "${book.BookTitle}" is currently out of stock.`);
    }
  }

  // Return a book
  returnBook(studentID, isbn) {
    if (!this.borrowedBooks.has(studentID)) {
      console.log("No books borrowed by this student.");
      return;
    }

    const book = this.books.find((b) => b.ISBN === isbn);

    // if (!book) {
    //   console.log("Error: Book not found.");
    //   return;
    // }

    const books = this.borrowedBooks.get(studentID);
    const index = books.findIndex((b) => b.ISBN === isbn);

    if (index === -1) {
      console.log("This book is not borrowed by the student.");
      return;
    }

    // Remove book from borrowed list
    const [returnedBook] = books.splice(index, 1);
    if (books.length === 0) {
      this.borrowedBooks.delete(studentID); // Cleanup if no books are left
    }

    book.returnBook();
    console.log(
      `Success: "${book.BookTitle}" has been returned to the library.`
    );
  }

  getBorrowedBooksByStudent(studentID) {
    if (!this.borrowedBooks.has(studentID)) {
      console.log("No books borrowed by this student.");
      return;
    }

    console.log("\nBooks Borrowed:");
    const books = this.borrowedBooks.get(studentID);
    books.forEach((book) => {
      console.log(
        `${book.BookTitle} - ISBN: ${book.ISBN}, Author: ${book.Author}`
      );
    });
  }
}

export default Library;
