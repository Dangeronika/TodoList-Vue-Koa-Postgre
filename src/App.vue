<template>
  <div id="app">
    <Todohead/>
    <AddTodotask
        v-on:add-todo='addTodo'
        v-on:set-local="setTasks"
        :search="searchStroke"
        @inputChange="searchStroke = $event"
    />
    <Todolist
        :tasks = 'filterTasks'
        class="list"
        v-if="filterTasks.length"
        @remove-todo='remove'
        v-on:rename="rename"
        @savecondition="savecondition"
    />
    <p v-else>No tasks!</p>
  </div>
</template>

<script>

import Todohead from '@/components/Todohead'
import Todolist from '@/components/Todolist'
import AddTodotask from '@/components/addTodotask'
import axios from 'axios'
export default {
  name: "App",
  data() {
    return {
      tasks: [
        {id: 0, title: 'Make a todo list', completed:false, rename: false, checkbox_clicked: false},
        {id: 1, title: 'Refactor the code', completed:false, rename: false, checkbox_clicked: false},
        {id: 2, title: 'Done the work', completed:false, rename: false, checkbox_clicked: false}
      ],
      searchStroke: '',
    }
  },
  mounted() {
    this.getTasks();
  },
  components: {
    Todohead,
    Todolist,
    AddTodotask,
  },
  computed: {
    filterTasks() {
      if (this.searchStroke !== ''){
        return this.tasks.filter(t => t.title.includes(this.searchStroke))
      }
      else{
        return this.tasks
      }
    }
  },
  methods: {
    remove(id){
      this.tasks = this.tasks.filter( t => t.id !==id );
      this.setTasks();
    },
    rename(description, id){
      this.tasks[id].title = description;
      this.setTasks();
    },
    addTodo(newTodo){
      axios.post('http://localhost:3000/tasks/addTask',{
        newTodo
      })
    },
    setTasks(){
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    getTasks(){
      if (localStorage.getItem('tasks')){
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
      }
    },
    savecondition(id) {
      this.tasks[id].checkbox_clicked = !this.tasks[id].checkbox_clicked;
      this.setTasks();
    }
  },
};
</script>

<style>
.list{
  margin-top: 50px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
