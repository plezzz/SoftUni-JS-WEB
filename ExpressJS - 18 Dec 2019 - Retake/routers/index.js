const routers = [
    {home: require('./home')},
    {user: require('./user')},
    {trip: require('./trip')},
    {error: require('./error')}
];

module.exports = (router) => {
    return routers.reduce((acc, curr) => {
        const key = Object.keys(curr)[0];
        return Object.assign(acc, { [key]: curr[key](router) });
    }, {});
};
