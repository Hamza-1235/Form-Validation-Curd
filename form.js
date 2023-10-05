const registrationForm = document.getElementById("registrationForm");
const resultDisplay = document.getElementById("resultDisplay");
const editIndexField = document.getElementById("editIndex");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
let savedData = JSON.parse(localStorage.getItem("registrationData")) || [];

document.addEventListener("DOMContentLoaded", function () {
    showRecords();
    ListenFormSubmit();
});

function showRecords() {
    resultDisplay.innerHTML = "<h2>Registration Results:</h2>";
    savedData.forEach(function (data, index) {
        const recordContainer = document.createElement("div");
        recordContainer.className = "record-container";

        const newRecord = document.createElement("div");
        newRecord.className = "record";
        newRecord.innerHTML = "<h1>" + data.name + "</h1><p>" + data.email + "</p>";

        const editButton = createEditButton(data, index);
        const deleteButton = createDeleteButton(index);

        recordContainer.appendChild(newRecord);
        recordContainer.appendChild(editButton);
        recordContainer.appendChild(deleteButton);
        resultDisplay.appendChild(recordContainer);
    });
}

function createEditButton(data, index) {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
        Editrecord(data, index);
    });

    function Editrecord(data, index) {
        registrationForm.elements["name"].value = data.name;
        registrationForm.elements["email"].value = data.email;
        editIndexField.value = index;
    }

    return editButton;
}

function createDeleteButton(index) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
        deleteRecord(index);
    });

    function deleteRecord(index) {
        savedData.splice(index, 1);
        localStorage.setItem("registrationData", JSON.stringify(savedData));
        showRecords();
    }

    return deleteButton;
}

function ListenFormSubmit() {
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(registrationForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const editIndex = editIndexField.value;

        if (validateForm(name, email)) {
            if (editIndex === "-1") {
                const newRecord = { name, email };
                savedData.push(newRecord);
            } else {
                savedData[editIndex] = { name, email };
                editIndexField.value = "-1";
            }
            localStorage.setItem("registrationData", JSON.stringify(savedData));
            registrationForm.reset();
            showRecords();
        }
    });
}

function validateForm(name, email) {
    const emailRegex =  /^[a-z0-9$_.]+@[a-z]+(.[a-zA-Z0-9-]+)/;
    nError.textContent="";
    eError.textContent="";
    let Valid=true;

    if (name.trim() === "") {
        nError.textContent="Please filled the empty field";
        Valid = false;
    }
    else if(/\d/.test(name)){
        nError.textContent="Name Should Contain Alphabets Only."
    }

    if(email.trim() === ""){
        eError.textContent="Please Filled the empty field";
    }
    else if (!email.match(emailRegex)) {
        eError.textContent="Please Enter Valid Email";
        Valid = false;
    }
   return Valid;   
}