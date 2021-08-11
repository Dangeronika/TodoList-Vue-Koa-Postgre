const koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger')
const KoaBody = require('koa-body')
const Router = require('@koa/router')
const app = new koa();
const router = new Router();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("todoListBase", "postgres", "5525", {
    dialect: "postgres",
    host: "localhost"
});


app.use(cors());
app.use(logger());
app.use(KoaBody());
app.use(router.routes());
app.use(router.allowedMethods())

const todoModel = sequelize.define('todoListBase', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    renameState: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    checkboxState: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    completedState: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
    // eslint-disable-next-line no-unexpected-multiline
(async ()=>{
    await todoModel.sync({ force: true });//{ force: true }
})();


router.post('/tasks/addTask', (ctx)=>{
    let todo = todoModel.create({
        title: ctx.request.body.newTodo.title,
        renameState: ctx.request.body.newTodo.rename,
        checkboxState: ctx.request.body.newTodo.checkbox_clicked,
        completedState: ctx.request.body.newTodo.completed
    })
})

app.listen(3000, function(){
    console.log('Server running on https://localhost:3000')
});
