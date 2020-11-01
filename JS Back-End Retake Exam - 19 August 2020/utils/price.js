module.exports = (price) => {
    let check = new RegExp('[\$,]?');
    if (check.test(price)) {
        price = price.replace(',', '.')
        price = price.replace('$', '')
    }
    return Number(price)
}
