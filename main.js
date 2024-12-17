import Library from "./library.js";

const library = new Library();

async function main() {
  try {
    //Reading the files once
    await library.initialize("./books.csv", "./students.csv");
    console.log("Library Management System Initialized.\n");

    // Display all books
    library.listAllBooks();

    // Display all students
    library.listAllStudents();

    // Borrow a book
    //console.log("\n--- Borrowing a Book ---");
    library.borrowBook("8904519", "041808907-8"); // Replace with valid studentID and ISBN
    library.borrowBook("8904519", "041808907-8"); // Replace with valid studentID and ISBN
    library.borrowBook("8904519", "041808907-8"); // Replace with valid studentID and ISBN

    // Return a book
    //console.log("\n--- Returning a Book ---");
    // library.returnBook("12345"); // Replace with valid ISBN

    // List books again to check stock
    library.listAllBooks();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
