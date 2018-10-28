let stuff = [];

//add data to stuff array and call buildItemList function
addItemToList = () => {
    stuff.push({ author: "John Doe", title: document.getElementById("titleNewToWork").value, content: document.getElementById("enterNewToWork").value, isComplete: false });
    document.getElementById("enterNewToWork").value =""; 
    document.getElementById("titleNewToWork").value = "";
    buildItemList(); 
}
//fetch data from JSON file
fetch ('./resources/sample.json')
    .then(response => response.json())
    .then(data => {
        stuff = data
        console.log(stuff)
        buildItemList();
    })
    
//function to create elements based on  arguments
createElement =(element, id, className, innerText)=>{
            let item = document.createElement(element);
            item.id = id;
            item.className =className;
            item.innerText = innerText;
            return item;
        }

checkEvent = (e) =>{
            e = e || window.event;
            const targetCheck = e.targetCheck || e.srcElement;
            if (targetCheck.checked) {
                stuff[parseInt(targetCheck.id)].isComplete = true;
            }
            else {
                stuff[parseInt(targetCheck.id)].isComplete = false;
            }
            buildItemList();
        }
//generate UI for on every add item event
buildItemList = () => {

    let prevDiv = document.getElementById("contToWork");
    if (prevDiv !== null) {
        prevDiv.remove();
    }

    let divCont = document.getElementById("containerToWork");
    let divNew = document.createElement("div");
    divNew.id = "contToWork";

    stuff.forEach(function(s, i){

        let divItem = createElement("div", i,"divItemClass", "");
        if (i%2 == 0)
            divItem.style.backgroundColor = "#feeae1";
        else 
            divItem.style.backgroundColor = "#dbfceb";

        let toWorkCheck = createElement("input", i, "checkbox", "");
        toWorkCheck.type = "checkbox";
        toWorkCheck.addEventListener('change', checkEvent, false);

        let authorItem = createElement("p", i, "authorClass", s.author);
        let titleItem = createElement("p", i, "titleClass", s.title);
        let paraItem = createElement("p", i, "contentClass", s.content);

        let today = new Date();
        let date = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();

        today = month + "/" + date + "/" + year;

        let dateItem = createElement("p", i, "dateClass", today);

        if (stuff[i].isComplete) {
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

        divItem.appendChild(titleItem);
        divItem.appendChild(toWorkRemove);
        divItem.appendChild(paraItem);
        divItem.appendChild(dateItem);
        divItem.appendChild(authorItem);
        divItem.appendChild(toWorkCheck);
        divNew.appendChild(divItem);
    })
    divCont.appendChild(divNew);
}

//remove item from list
removeItemFromList = (i) => {
    stuff.splice(i, 1);
    buildItemList();
}