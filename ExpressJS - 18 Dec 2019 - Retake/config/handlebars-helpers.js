module.exports = {
    ifeq: function (a, b, options) {
        if (a === b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    bar: function () {
        return "BAR!";
    },
    distanceFixed: function (distance) {
         return distance
             .toFixed(2)
             .toString()
             .replace('.',',')
    }
}
