<template>
  <div id="app">
    <Todohead/>
    <AddTodotask
        v-on:add-todo='addTodo'
        :search="searchStroke"
        @inputChange="searchStroke = $event"
    />
    <Todolist
        :tasks = 'filterTasks'
        :sortTasks = 'sortTasks'
        class="list"
        v-if="filterTasks.length"
        @remove-todo='remove'
        v-on:rename="rename"
        @saveCondition="saveCondition"
        @changeRenameCondition="changeRenameCondition"
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
      tasks: Array,
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
    },
    sortTasks() {
      return this.sortTasksById(this.tasks, 'id')
    }
  },
  methods: {
     remove(id){
      axios.delete(`http://localhost:3000/tasks/deleteTask/${id}`)
          .then(()=> {
            this.getTasks()
        // this.tasks = this.tasks.filter( t => t.id !==id );
      })
    },
    rename(description, id){
       axios.put(`http://localhost:3000/tasks/renameTask/${id}`, {description})
           .then(()=>{
             this.getTasks()
           })
      // this.tasks[id].rename = false;
      // this.tasks[id].title = description;
    },
    addTodo(newTodo){
      axios.post('http://localhost:3000/tasks/addTask', {newTodo})
          .then(()=>{
            this.getTasks()
      })
    },
    async getTasks(){
      axios.get('http://localhost:3000/tasks')
          .then((response)=>{
            this.tasks = response.data;
      })
    },
    saveCondition(id, taskState) {
       axios.put(`http://localhost:3000/tasks/saveCondition/${id}`, {id, taskState})
           .then(()=>{
             this.getTasks()
           })
    },
    changeRenameCondition(id) {
      this.tasks[id].rename = true;
    },
    sortTasksById(array, key) {
       return array.sort(function(a,b) {
         let x = a[key];
         let y = b[key];
         return((x<y)?-1:((x>y)?1:0));
       })
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
