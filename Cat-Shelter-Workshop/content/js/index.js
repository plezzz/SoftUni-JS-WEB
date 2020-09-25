//<li>
//                     <img src="https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg" alt="">
//                     <h3>Pretty Kitty</h3>
//                     <p><span>Breed: </span>Bombay Cat</p>
//                     <p><span>Description: </span>Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.</p>
//                     <ul class="buttons">
// 						<li class="btn edit"><a href="">Change Info</a></li>
// 						<li class="btn delete"><a href="">New Home</a></li>
// 					</ul>
//                 </li>
//<li>
// <img src="https://cdn.pixabay.com/photo/2015/03/27/13/16/cat-694730_1280.jpg">
// <h3>Pretty Kitty</h3>
// <p><span>Breed: </span> Bombay Cat</p>
// <p><span>Description: </span> Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.</p>
// <ul class="buttons">
// <li class="btn edit"><a href="1">Change Info</a></li>
// <li class="btn delete"><a href="1">New Home</a></li>
// </ul>
// </li>

function allCats() {

    let cats = document.querySelector("body > main > section > ul")
    fetch("database.json")
        .then(response => response.json())
        .then(json => {
            Object.entries(json.cats).forEach(entry => {
                const [id, cat] = entry
                const {name, description, image, breed} = cat;
                let li = htmlFactory('li');
                let img = htmlFactory('img', 'src', image)
                let h3 = htmlFactory('h3');
                h3.textContent = name;
                let pOne = htmlFactory('p');
                pOne.innerHTML = `<span>Breed: </span> ${json.breed[breed]}`
                let pTwo = htmlFactory('p');
                pTwo.innerHTML = `<span>Description: </span> ${description}`
                let ul = htmlFactory('ul', 'class', 'buttons');
                let liOne = htmlFactory('li', 'class', 'btn edit');
                let editLink = htmlFactory("a", 'href', `${id}`)
                editLink.textContent = 'Change Info'
                liOne.appendChild(editLink)
                let liTwo = htmlFactory('li', 'class', 'btn delete');
                let deleteLink = htmlFactory("a", 'href', `${id}`)
                deleteLink.textContent = 'New Home'
                liTwo.appendChild(deleteLink)
                ul.append(liOne, liTwo)

                li.append(img, h3, pOne, pTwo, ul)
                // console.log(li)
                cats.appendChild(li)
                // let option = document.createElement("option");
                // option.setAttribute("value", key);
                // option.textContent = value;
                // breeds.appendChild(option)
            });
        });
}

function htmlFactory(type, att = null, value = null, text) {
    let el = document.createElement(type)
    att ? el.setAttribute(att, value) : null
    return el
}

allCats()

