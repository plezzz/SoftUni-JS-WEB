const {checkAuth} = require("../utils");
const {expense} = require('../controllers');

module.exports = (router) => {
    router.get('/addExpense', checkAuth(true), expense.get.create);
    router.get('/details/:expenseId', checkAuth(true), expense.get.details);
    router.get('/delete/:expenseId', checkAuth(true), expense.get.delete);

    router.post('/create', checkAuth(true), expense.post.create);

    return router
}
