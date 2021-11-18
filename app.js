const GOOGLE_DOODLE_ENDPOINT = "https://google-doodles.herokuapp.com/doodles/2020/11?hl=en";
const years = [1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
const cardDestination = document.getElementsByClassName("destination")[0];
const today = new Date();
console.log(today.getFullYear())
console.log(today.getDate())
console.log(today.getMonth())
// years.forEach(element => {
//     console.log(element)
// });

function createCard(imageUrl, title, date){
    let mainContainer = createElement("div", "col-3")
    let cardElement = createElement("div", "card")
    let imgElement = createElement("img", "card-img-top card-style");
    adjustAttribute(imgElement, "src", imageUrl)
    let bodyElement = createElement("div", 'card-body');
    let titleElement = createElement("h5", "card-title", title);
    let dateElement = createElement("h5", "card-title", date);
    let anchorContainer = createElement("div", "d-grid col-12 mx-auto");
    let anchorElement = createElement("a", "btn btn-primary", "What in the doodle?" )
    anchorContainer.append(anchorElement)
    bodyElement.append(titleElement, dateElement, anchorContainer )
    cardElement.append(imgElement, bodyElement)

    cardDestination.append(cardElement);
}

function adjustAttribute(elem, attribute, value){
    elem.setAttribute(attribute, value);
}


function createElement(elementType,classes, innerText = ""){
    const element = document.createElement(elementType);
    element.className = classes;
    if(innerText.length >0 ){
        element.innerText = innerText;
    }
    return element;
}

// createCard("https://www.google.com/logos/doodles/2020/st-andrews-day-2020-6753651837108633.3-l.png", "Mother's Day", "November 29, 2009"  );
// createCard();


function getDoodle(){
    let month = 11;
    let year = 2020;
    let day = 17;
    fetch(GOOGLE_DOODLE_ENDPOINT).then((res) => {
        console.log(res.ok)
        if (!res.ok) {
            throw Error(res.statusText)
        } else {
            return res.json();
        }
    }).then((doodleResult)=> {
        // console.log(doodleResult);
        doodleResult.forEach(element => {
            let item = element.run_date_array;
            // console.log(typeof(item[0]));
            // console.log(item[1]);
            // console.log(item[2])
            // console.log(item[0] === year);
            // console.log(item[1]=== month )
            // console.log(item[2] == day)

            if (item[0] === year && item[1]=== month && item[2] == day) {
                // console.log(item)
                createCard(element.url, element.title, element.title)
            }
            
        });
    
        // console.log(doodleResult);
        
    }).catch((error) => {
        console.log(error)
    });
}

getDoodle();