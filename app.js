const GOOGLE_DOODLE_ENDPOINT = "https://google-doodles.herokuapp.com/doodles/2020/11?hl=en";
const cardDestination = document.getElementsByClassName("destination")[0];
const title = document.getElementById('doodleTitle')
const colorsHex = ['#4285f4', '#34a853', '#fbbc05', '#ea4335'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const headerLetters = ["T", "o", "d", "a", "y", " ", "i", "n", " ", "G", "o", "o", "g", "l", "e", " ", "D", "o", "o", "d", "l", "e", "s", " ", "H", "i", "s", "t", "o", "r", "y"];

// Will use as the starting day
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year =today.getFullYear();
console.log(day);
console.log(month);
console.log(year);




function createCard(imageUrl, title, date) {
    let cardElement = createElement("div", "card");
    let imgElement = createElement("img", "card-img-top card-style");
    adjustAttribute(imgElement, "src", imageUrl);

    let bodyElement = createElement("div", 'card-body');
    let titleElement = createElement("h5", "card-title", title);
    let dateElement = createElement("h5", "card-title", date);
    let anchorContainer = createElement("div", "d-grid col-12 mx-auto");

    let anchorElement = createElement("a", "btn btn-primary", "What in the doodle?");
    adjustAttribute(anchorElement, "style",`background-color: ${getRandomColor()};`)
    anchorElement.addEventListener("mouseover", changeColor)
    anchorElement.addEventListener("mouseout", changeColor)

    anchorContainer.append(anchorElement);
    bodyElement.append(titleElement, dateElement, anchorContainer)
    cardElement.append(imgElement, bodyElement);

    cardDestination.append(cardElement);
}

function changeColor(e){

    adjustAttribute(e.target,"style",`background-color: ${getRandomColor()};`);
}

function adjustAttribute(elem, attribute, value) {
    elem.setAttribute(attribute, value);
}

function getRandomColor(){
    let randomColorIndex = generateRandomIndex(colorsHex.length);
    
    return colorsHex[randomColorIndex];
}

function createElement(elementType, classes, innerText = "") {
    const element = document.createElement(elementType);
    element.className = classes;
    if (innerText.length > 0) {
        element.innerText = innerText;
    }
    return element;
}



function getDoodle(day, month, year) {
    // let month = 11;
    // let year = 2021;
    // let day = 18;

    let promises = [];

    for (let index = year; 1998 <= index; index--) {
        promises.push(makeFetchCall(index, month));
    }

    Promise.all(promises)
        .then((results) => {
            // console.log(results[0]);
            results.forEach(element => {
                console.log(element);
                element.forEach(item => {
                    let item2 = item.run_date_array;
                    if (item2[1] === month && item2[2] === day) {
                        console.log(item2);
                        let customDate = createCustomDate(item2[2],item2[1], item2[0]);
                        createCard(item.url, item.title, customDate);
                    }
                })
            })
        }).catch((err) => console.log(err));

}


async function makeFetchCall(doodleYear, doodleMonth) {
    let response1 = await fetch(`https://google-doodles.herokuapp.com/doodles/${doodleYear}/${doodleMonth}?hl=en`);
    let json = await response1.json();
    return json;
}

function generateRandomIndex(size) {
    return Math.floor(Math.random() * size)
}

function createCustomDate(day, month, year){
    let dateString = months[month - 1] + " " + day + ", " + year;
    return dateString
}


function getNewDoodle(form){
    console.log(form.date.value)
    console.log(typeof(form.date.value))
    let textArray = form.date.value.split("/");
    console.log(parseInt(textArray[0]))
    console.log(textArray[1])
    console.log(textArray[2])

    let day = parseInt(textArray[1]);
    let month =  parseInt(textArray[0]);
    let year = parseInt(textArray[2]);
    clearDestination();
    getDoodle(day, month, year)
 
}


function clearDestination(){
    let element = cardDestination;
    while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
}

function setUpHeader(){
    headerLetters.forEach((letter) => {
        let tempElement =  createElement("span","textFormat", letter)
        adjustAttribute(tempElement, "style",`color: ${getRandomColor()};`)
        title.appendChild(tempElement)
    })
}


setUpHeader();
getDoodle(day, month, year);








//Old code that did not work 


// fetch(`https://google-doodles.herokuapp.com/doodles/${year}/11?hl=en`).then((res) => {
//     console.log(res.ok)
//     if (!res.ok) {
//         throw Error(res.statusText)
//     } else {
//         return res.json();
//     }
// }).then((doodleResult) => {
//     // console.log(doodleResult);
//     doodleResult.forEach(element => {
//         let item = element.run_date_array;
//         // console.log(typeof(item[0]));
//         // console.log(item[1]);
//         // console.log(item[2])
//         // console.log(item[0] === year);
//         // console.log(item[1]=== month )
//         // console.log(item[2] == day)

//         if (item[1] === month && item[2] == day) {
//             // console.log(item)
//             createCard(element.url, item[0].toString(), item[2].toString())
//         }

//     });

// }).catch((error) => {
//     console.log(error)
// });
// year = year - 1;


// function makeFetchCall(dodleYear) {
//     fetch(`https://google-doodles.herokuapp.com/doodles/2020/11?hl=en`).then((res) => {
//         console.log(res.ok)
//         if (!res.ok) {
//             throw Error(res.statusText)
//         } else {
//             return res.json();
//         }
//     }).then((doodleResult) => console.log(doodleResult))
//         .catch((error) => console.log(error));
// }