const JPDB_API_URL = "https://api.login2explore.com:5577/api/iml";
const JPDB_TOKEN = "90934300|-31949202327332711|90957718";

function checkRollNo() {
    let rollNo = document.getElementById("rollNo").value.trim();
    if (!rollNo) return;

    let request = {
        token: JPDB_TOKEN,
        dbname: "SCHOOL-DB",
        relation: "STUDENT-TABLE",
        cmd: "GET",
        jsonStr: JSON.stringify({ "Roll-No": rollNo })
    };

    fetch(JPDB_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 400 || !data.data || data.data.length === 0) {
            enableFields();
            document.getElementById("saveBtn").disabled = false;
        } else {
            let student = JSON.parse(data.data[0].jsonStr);
            populateForm(student);
            document.getElementById("updateBtn").disabled = false;
        }
    })
    .catch(error => console.error("Error:", error));
}

function enableFields() {
    document.querySelectorAll("input").forEach(input => input.disabled = false);
}

function populateForm(student) {
    document.getElementById("fullName").value = student["Full-Name"] || "";
    document.getElementById("class").value = student["Class"] || "";
    document.getElementById("birthDate").value = student["Birth-Date"] || "";
    document.getElementById("address").value = student["Address"] || "";
    document.getElementById("enrollmentDate").value = student["Enrollment-Date"] || "";
    enableFields();
    document.getElementById("rollNo").disabled = true;
}

function saveStudent() {
    let studentData = {
        "Roll-No": document.getElementById("rollNo").value.trim(),
        "Full-Name": document.getElementById("fullName").value.trim(),
        "Class": document.getElementById("class").value.trim(),
        "Birth-Date": document.getElementById("birthDate").value,
        "Address": document.getElementById("address").value.trim(),
        "Enrollment-Date": document.getElementById("enrollmentDate").value
    };

    let request = {
        token: JPDB_TOKEN,
        dbname: "SCHOOL-DB",
        relation: "STUDENT-TABLE",
        cmd: "PUT",
        jsonStr: JSON.stringify(studentData)
    };

    fetch(JPDB_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(() => alert("Student Saved Successfully!"))
    .catch(error => console.error("Error:", error));
}

function updateStudent() {
    let studentData = {
        "Roll-No": document.getElementById("rollNo").value.trim(),
        "Full-Name": document.getElementById("fullName").value.trim(),
        "Class": document.getElementById("class").value.trim(),
        "Birth-Date": document.getElementById("birthDate").value,
        "Address": document.getElementById("address").value.trim(),
        "Enrollment-Date": document.getElementById("enrollmentDate").value
    };

    let request = {
        token: JPDB_TOKEN,
        dbname: "SCHOOL-DB",
        relation: "STUDENT-TABLE",
        cmd: "UPDATE",
        jsonStr: JSON.stringify(studentData)
    };

    fetch(JPDB_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(() => alert("Student Updated Successfully!"))
    .catch(error => console.error("Error:", error));
}

function resetForm() {
    document.getElementById("studentForm").reset();
    document.getElementById("rollNo").disabled = false;
    document.getElementById("saveBtn").disabled = true;
    document.getElementById("updateBtn").disabled = true;
    document.querySelectorAll("input").forEach(input => input.disabled = true);
}
