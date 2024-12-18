import readline from "readline";
import Library from "./library.js";

const library = new Library();

// Creating readline interface
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to Display menu options
function showMenu() {
  console.log(`
  === Library Management System ===
  1. List All Books
  2. List All Students
  3. Borrow Book
  4. Return Book
  5. Show Borrowed Books
  6. Exit
  `);
  reader.question("Select an option (1-5): ", handleMenuSelection);
}

// Handle menu options
function handleMenuSelection(option) {
  switch (option.trim()) {
    case "1":
      library.listAllBooks();
      showMenu();
      break;
    case "2":
      library.listAllStudents();
      showMenu();
      break;
    case "3":
      reader.question("Enter your Student ID: ", (studentID) => {
        reader.question(
          "Enter the ISBN of the book you want to borrow: ",
          (isbn) => {
            library.borrowBook(studentID, isbn);
            showMenu();
          }
        );
      });
      break;
    case "4":
      // reader.question(
      //   "Enter the ISBN of the book you want to return: ",
      //   (isbn) => {
      //     library.returnBook(isbn);
      //     showMenu();
      //   }
      // );
      reader.question("Enter your Student ID: ", (studentID) => {
        reader.question(
          "Enter the ISBN of the book you want to return: ",
          (isbn) => {
            library.returnBook(studentID, isbn);
            showMenu();
          }
        );
      });
      break;

    case "5":
      reader.question("Enter your Student ID: ", (studentID) => {
        library.getBorrowedBooksByStudent(studentID);
        showMenu();
      });
      break;
    case "6":
      console.log("Exiting the Library Management System. Goodbye!");
      reader.close(); // Close the readline interface
      break;
    default:
      console.log("Invalid option. Please select a valid option (1-5).");
      showMenu();
  }
}

async function main() {
  try {
    //Reading the files once
    await library.initialize("./books.csv", "./students.csv");
    console.log("Library Management System Initialized.\n");

    showMenu();
  } catch (error) {
    console.error("Error:", error.message);
    reader.close(); // Close the readline interface in case of error
  }
}

main();
