const GOOGLE_SEARCH_HREF_TEMPLATE = "https://www.google.com/search?q=";

const GOOGLE_DOODLE_ENDPOINT = "https://google-doodles.herokuapp.com/doodles/2020/11?hl=en";

const cardsContainer = document.getElementById("cards-container");
const doodlesTitle = document.getElementById('doodleTitle');
const getDoodlesButton = document.getElementById("moreDoodleButton");
const scrollDateField = document.getElementById("scroll-date");
const inputDateField = document.getElementById("inputDoodleDate");
const scrollFeature = document.getElementById("scrollSearch");
const inputFeature = document.getElementById("inputForm");

const COLOR_HEX = ['#4285f4', '#34a853', '#fbbc05', '#ea4335'];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const headerLetters = ["T", "o", "d", "a", "y", " ", "i", "n", " ", "G", "o", "o", "g", "l", "e", " ", "D", "o", "o", "d", "l", "e", "s", " ", "H", "i", "s", "t", "o", "r", "y"];

// Date object used to obtain present day and using this to show today's results.
//Created new Date Object, using methods to get specific valus of Day, month, and Year (YYYY) format
const initialToday = new Date();
const initialDay = initialToday.getDate();
const initialMonth = initialToday.getMonth() + 1;
const initialYear = initialToday.getFullYear();



//Function being used to create each indivudal Card and then appending result to cards Container to be displayed
function createCard(imageUrl, title, date) {
    let cardElement = createElement("div", "card");

    let imgElement = createElement("img", "card-img-top card-style");
    adjustAttribute(imgElement, "src", imageUrl);

    let bodyElement = createElement("div", 'card-body');
    let titleElement = createElement("h5", "card-title", title);
    let dateElement = createElement("h5", "card-title", date);

    let anchorContainer = createElement("div", "d-grid col-12 mx-auto");
    let anchorElement = createElement("a", "btn btn-primary", "What in the doodle?");
    adjustAttribute(anchorElement, "style", `background-color: ${getRandomColor()};`);
    adjustAttribute(anchorElement, "href", createGoogleHref(title, date));
    adjustAttribute(anchorElement, "target", "_blank");
    anchorElement.addEventListener("mouseover", changeColor);
    anchorElement.addEventListener("mouseout", changeColor);

    anchorContainer.append(anchorElement);
    bodyElement.append(titleElement, dateElement, anchorContainer)
    cardElement.append(imgElement, bodyElement);

    cardsContainer.append(cardElement);
}

//Function used to create href attribute value for each card using the fetch result values, these values contain spaces which neeed to be accounted for. 
function createGoogleHref(title, date) {
    let customerHref;
    let customerTitle = title.replaceAll(' ', '%20');
    let customDate = date.replaceAll(' ', '%20');
    customerHref = GOOGLE_SEARCH_HREF_TEMPLATE + customerTitle + "%20" + customDate;
    return customerHref;
}

//Function that gets called when hovering over a button and dynamically changes its background color 
//Uses the event object along with the event property to determine which button needs adjustment.
//Also, uses the getRandomColor() to get random hex value from the colorHex array.
function changeColor(e) {
    adjustAttribute(e.target, "style", `background-color: ${getRandomColor()};`);
}

//Function used to make attribute adjustments
//Itthree parameters, the element, the attribute , and the value of the attribute
function adjustAttribute(elem, attribute, value) {
    elem.setAttribute(attribute, value);
}

//Function that gets a randomColor from ColorHex array using the generateRandomIndex() that returns a random index. 
function getRandomColor() {
    let randomColorIndex = generateRandomIndex(COLOR_HEX.length);
    return COLOR_HEX[randomColorIndex];
}

//Function that is used to create elements dynamically, it take three parameters. 
//string with the element that needs to be create, string with all the classes needed, and string with any innertText (optional)
//returns a created element object
function createElement(elementType, classes, innerText = "") {
    const element = document.createElement(elementType);
    element.className = classes;
    if (innerText.length > 0) {
        element.innerText = innerText;
    }
    return element;
}

//Main function that gets triggered to start creating the cardsContainer
function getDoodle(day, month, year) {
    let promises = [];

    for (let index = year; 1998 <= index; index--) {
        promises.push(makeFetchCall(index, month));
    }

    Promise.all(promises)
        .then((results) => {
            results.forEach(element => {
                element.forEach(item => {
                    let item2 = item.run_date_array;
                    if (item2[1] === month && item2[2] === day) {
                        let customDate = createCustomDate(item2[2], item2[1], item2[0]);
                        createCard(item.url, item.query, customDate);
                    }
                })
            })
        }).catch((err) => console.log(err));

}

//async function that makes the fetch call and returns a json object with results
async function makeFetchCall(doodleYear, doodleMonth) {
    let response1 = await fetch(`https://google-doodles.herokuapp.com/doodles/${doodleYear}/${doodleMonth}?hl=en`);
    let json = await response1.json();
    return json;
}

//function that getsa random integer based on the parameter passed in.  range [0, size) 
function generateRandomIndex(size) {
    return Math.floor(Math.random() * size);
}

// function used to create custom String formatted Date for displaying purposes.
function createCustomDate(day, month, year) {
    let dateString = MONTHS[month - 1] + " " + day + ", " + year;
    return dateString;
}

//Function used when "get Doodles" button gets presses and uses value in input field as query values
function getNewDoodle(form) {
    dateResult = new Date(form.date.value);
    let textArray = form.date.value.split("/");
    let day = parseInt(textArray[1]);
    let month = parseInt(textArray[0]);
    let year = parseInt(textArray[2]);
    clearCardsContainer();
    getDoodle(day, month, year);
    scrollDateField.innerText = createCustomDate(dateResult.getDate(), dateResult.getMonth() + 1, dateResult.getFullYear());
}

// function used to clear cardContainer of child elements
function clearCardsContainer() {
    let element = cardsContainer;
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

//Function called to set up Header (title)
function setUpHeader() {
    headerLetters.forEach((letter) => {
        let tempElement = createElement("span", "textFormat", letter);
        adjustAttribute(tempElement, "style", `color: ${getRandomColor()};`);
        doodlesTitle.appendChild(tempElement);
    })
}

//function used to set up elements with id's -->  scrollSearch and inputForm 
function setUpSearchElement() {
    adjustAttribute(getDoodlesButton, "style", `Background-color: ${getRandomColor()};`);
    getDoodlesButton.addEventListener("mouseover", changeColor);
    getDoodlesButton.addEventListener("mouseout", changeColor);

    let rightButton = document.getElementById("right-button");
    rightButton.addEventListener("mouseover", changeColor);
    rightButton.addEventListener("mouseout", changeColor);
    rightButton.addEventListener("click", getNextDay);

    let leftButton = document.getElementById("left-button");
    leftButton.addEventListener("click", getPreviousDay);
    leftButton.addEventListener("mouseover", changeColor);
    leftButton.addEventListener("mouseout", changeColor);

    scrollDateField.innerText = createCustomDate(initialDay, initialMonth, initialYear);
    inputDateField.value = initialToday.toLocaleDateString();

    scrollDateField.addEventListener("mouseover", unhideInputDate);
    inputFeature.addEventListener("mouseout", hideInputDate);


}

//fuunction used to unhide element with id= inputForm and hide element with id=scrollSearch
function unhideInputDate() {
    scrollFeature.classList.add("display-feature");
    inputFeature.classList.remove("display-feature");


}

//fuunction used to hide element with id= inputForm and unhide element with id=scrollSearch
function hideInputDate() {
    scrollFeature.classList.remove("display-feature");
    inputFeature.classList.add("display-feature");

}

//function that get triggered when user clicks on the right button
function getNextDay() {
    let stringValue = scrollDateField.innerText;
    let currentDay = new Date(stringValue);
    let nextDay = new Date(currentDay);
    nextDay.setDate(currentDay.getDate() + 1);
    let day = nextDay.getDate();
    let month = nextDay.getMonth() + 1;
    let year = nextDay.getFullYear();
    scrollDateField.innerText = createCustomDate(day, month, year);
    inputDateField.value = nextDay.toLocaleDateString();
    clearCardsContainer();
    getDoodle(day, month, year);
}

//Function that gets triggered when user clicks on left button
function getPreviousDay() {
    let stringValue = scrollDateField.innerText;
    let currentDay = new Date(stringValue);
    let previousDay = new Date(currentDay);
    previousDay.setDate(currentDay.getDate() - 1);
    let day = previousDay.getDate();
    let month = previousDay.getMonth() + 1;
    let year = previousDay.getFullYear();
    scrollDateField.innerText = createCustomDate(day, month, year);
    inputDateField.value = previousDay.toLocaleDateString();
    clearCardsContainer();
    getDoodle(day, month, year);
}

//function that is used to set up initial elements and triggers for cardsContainer to be populated with todays date object
function start() {
    setUpSearchElement();
    setUpHeader();
    getDoodle(initialDay, initialMonth, initialYear);
}

//call to start()
start();