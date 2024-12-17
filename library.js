import fs from "fs";
import csv from "csv-parser";

import Book from "./book.js";

import Student from "./student.js";

class Library {
  constructor() {
    this.books = [];
    this.students = [];
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
    const book = this.books.find((b) => b.isbn === isbn);

    if (!student || !book) {
      console.log("Error: StudentID or ISBN not found.");
      return;
    }
    // if (!book) {
    //   console.log("Error: Book not found.");
    //   return;
    // }
    if (book.borrowBook()) {
      console.log(
        `Success: ${student.studentName} borrowed "${book.bookTitle}".`
      );
    } else {
      console.log(`Error: "${book.bookTitle}" is currently out of stock.`);
    }
  }

  // Return a book
  returnBook(isbn) {
    const book = this.books.find((b) => b.isbn === isbn);

    if (!book) {
      console.log("Error: Book not found.");
      return;
    }
    book.returnBook();
    console.log(
      `Success: "${book.bookTitle}" has been returned to the library.`
    );
  }
}

export default Library;
