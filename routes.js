module.exports = (app) => {
    const user = require('./controller.js')

    app.post('/user',user.create);

    app.get('/user/:userId',user.findOne);

    app.delete('/user/:userId',user.delete);

    app.patch('/user/:userId',user.addText)

}