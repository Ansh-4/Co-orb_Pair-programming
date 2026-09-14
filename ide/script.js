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

// AI Chat elements
const chat = document.querySelector(".chat");
const agentInput = document.querySelector(".agent-input input");
const askButton = document.querySelector(".agent-input button");

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

// Add click events to files
function addFileClickEvent(fileElement) {
    fileElement.addEventListener("click", function () {
        openFile(fileElement.id);
    });
}

// Add events to original files
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

    // Create file
    files[fileName] = "";

    // Create file element
    const newFile = document.createElement("div");

    newFile.className = "file";
    newFile.id = fileName;
    newFile.textContent = "📄 " + fileName;

    // Add to Explorer
    fileList.appendChild(newFile);

    // Make clickable
    addFileClickEvent(newFile);

    // Open file
    openFile(fileName);
});


// =========================
// AI CHAT
// =========================

// Add a message to the chat
function addMessage(message, type) {

    const messageDiv = document.createElement("div");

    messageDiv.className = "message " + type + "-message";

    messageDiv.textContent = message;

    chat.appendChild(messageDiv);

    // Automatically scroll down
    chat.scrollTop = chat.scrollHeight;
}


// Ask AI
async function askAI() {

    const question = agentInput.value.trim();

    if (!question) {
        return;
    }

    // Show user's message
    addMessage(question, "user");

    // Clear input
    agentInput.value = "";

    // Show loading message
    addMessage("Thinking...", "agent");

    try {

        const response = await fetch("http://127.0.0.1:5000/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                question: question,

                code: codeArea.value,

                fileName: currentFile

            })

        });

        const data = await response.json();

        // Remove "Thinking..."
        chat.removeChild(chat.lastElementChild);

        // Show AI response
        addMessage(data.response, "agent");

    } catch (error) {

        console.error(error);

        // Remove "Thinking..."
        chat.removeChild(chat.lastElementChild);

        addMessage(
            "Could not connect to the AI server.",
            "agent"
        );
    }
}


// Ask button
askButton.addEventListener("click", askAI);


// Press Enter to ask
agentInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        askAI();
    }

});