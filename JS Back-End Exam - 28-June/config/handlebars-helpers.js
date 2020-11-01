module.exports = {
    distanceFixed: function (distance) {
        return distance
            .toFixed(2)
            .toString()
            .replace('.', ',')
    }
}
