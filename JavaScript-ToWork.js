let stuff = [];

function addItemToList() {
    stuff.push({ author: document.getElementById("authorNewToWork").value, title: document.getElementById("titleNewToWork").value, content: document.getElementById("enterNewToWork").value, date: document.getElementById("dateNewToWork").value, isComplete: false });
    document.getElementById("enterNewToWork").value =""; 
    buildItemList(); 
}

let xmlhttp = new XMLHttpRequest();
let jsonURL = "sample-json.json";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        stuff = JSON.parse(this.responseText);
        buildItemList();
    }
};
xmlhttp.open("GET", jsonURL, true);
xmlhttp.send();

function buildItemList() {

    let prevDiv = document.getElementById("contToWork");
    if (prevDiv !== null) {
        prevDiv.remove();
    }

    let divCont = document.getElementById("containerToWork");
    let divNew = document.createElement("div");
    divNew.id = "contToWork";

    for (let i = 0; i < stuff.length; i++) {

        let divItem = document.createElement("div");
        divItem.className = "divItemClass";
        divItem.id = i;
        if (i%2 == 0)
            divItem.style.backgroundColor = "#feeae1";
        else 
            divItem.style.backgroundColor = "#dbfceb";

        let toWorkCheck = document.createElement("input");
        toWorkCheck.type = "checkbox";
        toWorkCheck.className = "checkbox";
        toWorkCheck.id = i;
        toWorkCheck.addEventListener('change', e => {

            e = e || window.event;
            const targetCheck = e.targetCheck || e.srcElement;
            if (targetCheck.checked) {
                strikePara(parseInt(targetCheck.id));
            }
            else {
            authorItem.style = "text-decoration: none";
            paraItem.style = "text-decoration: none";
            dateItem.style = "text-decoration: none";
            titleItem.style = "text-decoration: none";
            }
        }, false);

        let authorItem = document.createElement("p");
        authorItem.id = i;
        authorItem.innerText = stuff[i].author;

        let titleItem = document.createElement("p");
        titleItem.id = i;
        titleItem.innerText = stuff[i].title;

        let paraItem = document.createElement("p");
        paraItem.id = i;
        paraItem.className = "contentClass";
        paraItem.innerText = stuff[i].content;

        let dateItem = document.createElement("p");
        dateItem.id = i;
        dateItem.innerText = stuff[i].date;

        if (stuff[i].isComplete === true) {
            toWorkCheck.checked = stuff[i].isComplete;
            authorItem.style = "text-decoration: line-through";
            paraItem.style = "text-decoration: line-through";
            dateItem.style = "text-decoration: line-through";
            titleItem.style = "text-decoration: line-through";
        } else {
            toWorkCheck.checked = stuff[i].isComplete;
            toWorkCheck.style.removeProperty("text-decoration");
        }

        let toWorkRemove = document.createElement("input");
        toWorkRemove.type = "button";
        toWorkRemove.id = i;
             toWorkRemove.addEventListener('click', e => {
            e = e || window.event;
            const target = e.target || e.srcElement;
            removeItemFromList(parseInt(target.id))
        }, false);

        divItem.appendChild(toWorkCheck);
        divItem.appendChild(titleItem);
        divItem.appendChild(dateItem);
        divItem.appendChild(authorItem);
        divItem.appendChild(paraItem);
        divItem.appendChild(toWorkRemove);
        divNew.appendChild(divItem);
    }
    divCont.appendChild(divNew);
}

function removeItemFromList(i) {
    stuff.splice(i, 1);
    buildItemList();
}

function strikePara(i) {
    stuff[i].isComplete = true;
    buildItemList();
}
