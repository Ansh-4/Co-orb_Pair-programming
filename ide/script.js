const files = {
    "index.html": `<!DOCTYPE html>
<html>
    <body>
        <h1>Hello World</h1>
    </body>
</html>`,

    "style.css": `body {
    background: black;
    color: white;
}`,

    "script.js": `console.log("Hello World");`
};

const codeArea = document.getElementById("codeArea");
const fileList = document.getElementById("fileList");
const newFileBtn = document.getElementById("newFileBtn");

let currentFile = "index.html";

// Load the first file
codeArea.value = files[currentFile];

// Save code whenever the user types
codeArea.addEventListener("input", function () {
    files[currentFile] = codeArea.value;
});

// Function to open a file
function openFile(fileName) {
    files[currentFile] = codeArea.value;

    currentFile = fileName;

    codeArea.value = files[currentFile];
}

// Add click events to existing files
function addFileClickEvent(fileElement) {
    fileElement.addEventListener("click", function () {
        openFile(fileElement.id);
    });
}

// Add events to the original files
document.querySelectorAll(".file").forEach(function (file) {
    addFileClickEvent(file);
});

// NEW FILE
newFileBtn.addEventListener("click", function () {

    const fileName = prompt("Enter file name:");

    if (!fileName) {
        return;
    }

    if (files[fileName]) {
        alert("File already exists!");
        return;
    }

    // Create the file in our files object
    files[fileName] = "";

    // Create the file element
    const newFile = document.createElement("div");

    newFile.className = "file";
    newFile.id = fileName;
    newFile.textContent = "📄 " + fileName;

    // Add it to the Explorer
    fileList.appendChild(newFile);

    // Make the new file clickable
    addFileClickEvent(newFile);

    // Open the new file
    openFile(fileName);
});