module.exports = (price) => {
    let check = new RegExp('[\$,]?');
    if (check.test(price)) {
        price = price.replace(',', '.')
        price = price.replace('$', '')
    }
    if (isNaN(price)) {
        throw new Error(errorShoes.price)
    }
    return Number(price)
}
