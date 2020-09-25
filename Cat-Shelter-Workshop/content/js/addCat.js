function addBreeds() {
    let breeds = document.querySelector("#group");
    fetch("database.json")
        .then(response => response.json())
        .then(json => {
            Object.entries(json.breed).forEach(entry => {
                const [key, value] = entry;
                let option = document.createElement("option");
                option.setAttribute("value", key);
                option.textContent = value;
                breeds.appendChild(option)
            });
        });
}

addBreeds()