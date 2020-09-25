const config = require('./config.json')
const fs = require('fs')

exports.addBreed = (post) => {
    fs.readFile(config.database, config.encoding, function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            let obj = JSON.parse(data);
            const breeds = Object.values(obj.breed)
            const checkExisting = breeds.includes(post['breed']);
            const key = Number(Object.keys(obj.breed).sort((a, b) => a - b).pop()) + 1;
            if (!checkExisting && post['breed'] !== "") {
                obj.breed[String(key)] = post['breed'];
                let json = JSON.stringify(obj);
                fs.writeFile(config.database, json, config.encoding, (err) => {
                    if (err) throw err;
                })
            }
        }
    });
}
exports.addCat = (post) => {

}