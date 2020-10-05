const fs = require('fs');
const config = require('../config/config.js');

module.exports = {
    async getAll() {
        return getCubes();
    },
    async getOneCube(id) {
        let cubes = await getCubes();
        return cubes[id]
    },
    async insertCube(newCube) {
        let database = await getCubes();
        database.push(newCube);
        await setCubes(database)
    },
    async searchCube(name, from, to) {
        let result = [];
        let cubes = await getCubes();
        if (name && from && to) {
            cubes.forEach(row => {
                if (row['name'] === name && row['difficultyLevel'] >= from && row['difficultyLevel'] <= to) {
                    result.push(row)
                }
            });
        } else if (name) {
            cubes.forEach(row => {
                if (row['name'] === name) {
                    result.push(row)
                }
            });
        } else if (from && to) {
            cubes.forEach(row => {
                if (row['difficultyLevel'] >= from && row['difficultyLevel'] <= to) {
                    result.push(row)
                }
            });
        } else if (from) {
            cubes.forEach(row => {
                if (row['difficultyLevel'] >= from) {
                    result.push(row)
                }
            });
        } else if (to) {
            cubes.forEach(row => {
                if (row['difficultyLevel'] <= to) {
                    result.push(row)
                }
            });
        } else {
            return cubes
        }
        return result
    },
    async deleteCube(id) {
        getCubes()
            .then(data => {
                   data.splice(Number(id), 1);
                    return data
                }
            ).then(data => {
             setCubes(data)
        });
    },
   async editCube(body,id) {
        getCubes()
            .then(data => {
                    data.splice(Number(id), 1,body);
                    return data
                }
            ).then(data => {
            setCubes(data)
        });
    }
};

async function getCubes() {
    return await fs.promises.readFile(config.database, 'utf8').then(data => {
        return JSON.parse(data);
    }).catch(err => {
        console.log(err)
    });
}

async function setCubes(data) {
    let database = JSON.stringify(data);
    fs.writeFile(config.database, database, (err) => {
        if (err) throw err;
    });
}
