const tabInActive = ["text-gray-500", "border-gray-200",];
const tabActive = ["btn-primary", "text-white", "border-blue"];
const allContainer = document.getElementById("all-container");
const issueCount = document.getElementById("issue-count");
const openBox = document.getElementById("open-box");
const closeBox = document.getElementById("close-box");

let allIssues = [];


function loadAllIssue() {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            // console.log(allIssue)
            showAll()
        })
}


function renderIssues(issues) {
    allContainer.innerHTML = "";

    for (const issue of issues) {
        const lavels = issue.labels;
        const lavelsButtons = lavels.map(el =>
            `
                <button class="
                 font-medium  py-2 px-5 rounded-full
                 ${el === 'bug' ? "border border-red-700 text-red-500 bg-red-100" : ""}
                 ${el === "help wanted" ? "border-yellow-600 text-yellow-600 bg-yellow-100" : ""}
                 ${el === "enhancement" ? "border-green-300 text-green-800 bg-green-200" : ""}
                 ${el === "good first issue" ? "border-green-300 text-green-800 bg-green-200" : "border-green-300 text-green-800 bg-green-200"}
                ">
                ${el.toUpperCase()}
                </button>
            
            `).join('')
        const div = document.createElement("div");


        const isOpen = issue.status === "open";

        const statusImg = isOpen
            ? "./assets/Open-Status.png"
            : "./assets/Closed- Status .png";

        const borderColor = isOpen
            ? "border-green-500"
            : "border-red-500";

        div.className = `card bg-white h-cover shadow-2xl p-4 border-t-4 ${borderColor}`;

        div.innerHTML = `
            <div class="space-y-4">
                <div class="flex justify-between">
                    <img src="${statusImg}">
                    <p class="px-6 py-1 bg-red-200 text-red-800 rounded-full">${issue.priority}</p>
                </div>

                <h2 class="font-semibold">${issue.title}</h2>

                <p class="text-gray-500 line-clamp-2"> ${issue.description}
                </p>
                <div class="space-x-4 space-y-4 mb-8">
                         ${lavelsButtons}
                </div>
               <div class="shadow-2xl text-gray-500 p-4">
                         <p># ${issue.author}</p>
                         <p>1/15/2024</p>
              </div>
            </div>
        `;

        allContainer.append(div);

    }
}

function showAll() {
    renderIssues(allIssues);
    issueCount.innerText = allIssues.length
}

function showOpen() {
    const openIssues = allIssues.filter(i => i.status === "open");
    renderIssues(openIssues);
}

function showClosed() {
    const closedIssues = allIssues.filter(i => i.status === "closed");
    renderIssues(closedIssues);
}

function switchTab(tab) {
    // console.log(tab)
    const tabs = ["all", "open", "closed"];
    

    for (const t of tabs) {
        const tabName = document.getElementById('tab-' + t);
        // console.log(tabName)

        if (t === tab) {
            tabName.classList.remove(...tabInActive);
            tabName.classList.add(...tabActive)
            
        }
        else {
            tabName.classList.add(...tabInActive);
            tabName.classList.remove(...tabActive)
        }
    }
    if (tab === "all") {
         issueCount.innerText = allContainer.children.length
           openBox.classList.remove("hidden");
             closeBox.classList.remove("hidden");

        
        showAll();
       
        
    }
    else if (tab === "open") {
        closeBox.classList.add("hidden");
        openBox.classList.remove("hidden");
    

        showOpen();
        issueCount.innerText = allContainer.children.length
    }
    else if (tab === "closed"){
         openBox.classList.add("hidden");
         closeBox.classList.remove("hidden");
        showClosed();
        issueCount.innerText = allContainer.children.length
    }
}




loadAllIssue()



