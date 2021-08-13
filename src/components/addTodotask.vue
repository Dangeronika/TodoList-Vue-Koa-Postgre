<template>
<div>
  <form class="manyways" v-on:submit.prevent = "onSubmit">
    <input type="text" v-model="taskName" placeholder="Enter a new task...">
    <button type="submit">Create</button>
  </form>
    <input class="searchInput" :value="search" @input="$emit('inputChange', $event.target.value)" placeholder="Enter a search task...">
</div>
</template>

<script>
export default {
  data() {
    return {
        taskName: ''
    }
  },
  props: {
    search: String,
  },
  methods: {
      onSubmit() {
        let newTodo = {
          title: this.taskName,
          completed: false,
          rename: false,
          checkbox_clicked: false,
        }
        this.$emit('add-todo', newTodo);
        this.taskName = ''
      },
    },
  }
</script>

<style>

.manyways{
  display: flex;
  justify-content: center;
}

.searchInput{
  margin-top: 5px;
}
</style>
