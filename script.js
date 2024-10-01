document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");
  const markTableBody = document.querySelector("#markTable tbody");
  let students = [];

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const regNumber = document.getElementById("regNumber").value.trim();

    const subject1 = parseFloat(document.getElementById("subject1").value) || 0;
    const subject2 = parseFloat(document.getElementById("subject2").value) || 0;
    const subject3 = parseFloat(document.getElementById("subject3").value) || 0;
    const subject4 = parseFloat(document.getElementById("subject4").value) || 0;
    const subject5 = parseFloat(document.getElementById("subject5").value) || 0;

    const totalMarks = subject1 + subject2 + subject3 + subject4 + subject5;
    const averageMarks = totalMarks / 5;
    const grade = getGrade(averageMarks);

    students.push({
      name,
      regNumber,
      subject1,
      subject2,
      subject3,
      subject4,
      subject5,
      totalMarks,
      averageMarks,
      grade,
    });

    updateTable();
    form.reset();
  });

  function getGrade(average) {
    if (average >= 90) return "A";
    if (average >= 75) return "B";
    if (average >= 50) return "C";
    return "D";
  }

  function updateTable() {
    students.sort((a, b) => b.totalMarks - a.totalMarks);

    markTableBody.innerHTML = "";

    students.forEach((student, index) => {
      const row = document.createElement("tr");

      Object.values(student).forEach((value, i) => {
        const cell = document.createElement("td");

        if (i === 8) {
          cell.style.backgroundColor = getAverageColor(value);
        }

      
        if (i === 9) {
          cell.textContent = value;
        } else {
          cell.textContent = value;
        }

        row.appendChild(cell);
      });

      const rankCell = document.createElement("td");
      rankCell.textContent = index + 1;
      row.appendChild(rankCell);

      markTableBody.appendChild(row);
    });
  }
  
  function getAverageColor(average) {
    if (average >= 75) return "green";
    if (average >= 50) return "yellow";
    return "red";
  }
});
