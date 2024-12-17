class Student {
  constructor(studentName, studentID, major) {
    this.studentName = studentName;
    this.studentID = studentID;
    this.major = major;
  }

  toString() {
    return `Student: ${this.studentName} (ID: ${this.studentID}) | Major: ${this.major}`;
  }
}

export default Student;
