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
    checkbox_clicked: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    rename: {
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


router.post('/tasks/addTask', async (ctx)=>{
    let newTask = ctx.request.body.newTodo
    newTask.id = await addTask(newTask)
    ctx.response.body = newTask
})

router.get('/tasks', async (ctx)=>{
    let tasks = await getTasks()
    if (tasks.length) {
        ctx.body = tasks
    } else {
        ctx.status = 204
        ctx.body = 'No content'
    }
})

router.delete('/tasks/deleteTask/:id', async (ctx)=>{
    await taskDestroy(ctx.params.id)
    ctx.body = {id:ctx.params.id};
})

app.listen(3000, function(){
    console.log('Server running on https://localhost:3000')
});

async function getTasks() {
    let dataBD = await todoModel.findAll()
    let tasks = []
    dataBD.forEach((task)=>{
        tasks.push(task.dataValues)
    })
    return tasks
}

async function addTask(newTask) {
    let createdTask = await todoModel.create({
        title: newTask.title,
        checkbox_clicked: newTask.checkbox_clicked,
        completed: newTask.completed,
        rename: newTask.rename
    })
    return createdTask.id
}

async function taskDestroy(id) {
    await todoModel.destroy({
        where: {
            id: id
        }
    })
}
