const GOOGLE_DOODLE_ENDPOINT = "https://google-doodles.herokuapp.com/doodles/2020/11?hl=en";
const cardDestination = document.getElementsByClassName("destination")[0];

// Will use as the starting day
const today = new Date();
// console.log(today.getFullYear())
// console.log(today.getDate())
// console.log(today.getMonth())



function createCard(imageUrl, title, date) {
    let cardElement = createElement("div", "card");
    let imgElement = createElement("img", "card-img-top card-style");
    adjustAttribute(imgElement, "src", imageUrl);

    let bodyElement = createElement("div", 'card-body');
    let titleElement = createElement("h5", "card-title", title);
    let dateElement = createElement("h5", "card-title", date);
    let anchorContainer = createElement("div", "d-grid col-12 mx-auto");
    let anchorElement = createElement("a", "btn btn-primary", "What in the doodle?")

    anchorContainer.append(anchorElement);
    bodyElement.append(titleElement, dateElement, anchorContainer)
    cardElement.append(imgElement, bodyElement);

    cardDestination.append(cardElement);
}

function adjustAttribute(elem, attribute, value) {
    elem.setAttribute(attribute, value);
}


function createElement(elementType, classes, innerText = "") {
    const element = document.createElement(elementType);
    element.className = classes;
    if (innerText.length > 0) {
        element.innerText = innerText;
    }
    return element;
}



function getDoodle() {
    let month = 11;
    let year = 2021;
    let day = 18;

    let promises = [];

    for (let index = year; 1998 <= index; index--) {
        promises.push(makeFetchCall(index));
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
                        createCard(item.url, item.title, item.title);
                    }
                })
            })
        }).catch((err) => console.log(err));

}


async function makeFetchCall(doodleYear) {
    let response1 = await fetch(`https://google-doodles.herokuapp.com/doodles/${doodleYear}/11?hl=en`);
    let json = await response1.json();
    return json;
}



getDoodle();











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