const students = [
  { id: 1, name: "Alice", score: 85 },
  { id: 2, name: "Bob", score: 52 },
  { id: 3, name: "Charlie", score: 68 },
  { id: 4, name: "David", score: 95 }
];

function filterPassedStudents(students) {

 const  passedStudents=students.filter(student => student.score >= 60);
 console.log(passedStudents);
}


filterPassedStudents(students);

function getPassingStudents(students) {
  return students
    .filter(student => student.score >= 60) 
    .sort((a, b) => b.score - a.score)      
    .map(student => `${student.name} (${student.score})`); 
}

console.log(getPassingStudents(students));
