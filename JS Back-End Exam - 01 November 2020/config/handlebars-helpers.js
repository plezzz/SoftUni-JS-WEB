module.exports = {
    dateFixed: function (date) {
        let options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        let newDate = new Date(date).toLocaleTimeString('en-en', options).toString();
        return newDate.split(",").join(" ");
    },
    countArr: function (arr) {
        return arr.length;
    }
}
