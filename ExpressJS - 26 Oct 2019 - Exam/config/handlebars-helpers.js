module.exports = {
    distanceFixed: function (distance) {
        return distance
            .toFixed(2)
            .toString()
    },
    dateFixed: function (date) {
        let newDate = new Date(date);
        return `${newDate.getFullYear()}-${transformDate(newDate.getMonth())}-${transformDate(newDate.getDate())}`
    }
}

function transformDate(date) {
    return date.toString().length === 1 ? `0${date}` : date;
}
