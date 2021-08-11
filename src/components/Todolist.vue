<template>
  <div>
      <ul>
        <Todotask
            v-for="(task, index) in tasks" :key="task"
            :task='task'
            :index='index'
            v-on:remove-todo="remove"
            v-on:rename-task="rename"
            @chbxchange="savecondition">
        </Todotask>
      </ul>
  </div>
</template>

<script>
import Todotask from '@/components/Todotask'
export default {
  components: {
    Todotask,
  },
  props: ['tasks'],
  methods: {
    remove(id){
      this.$emit('remove-todo', id)
    },
    rename(description, id){
      this.$emit('rename', description, id)
    },
    savecondition(id) {
      this.$emit('savecondition', id)
    }
  }

}
</script>

<style>
  ul{
    list-style: none;
    margin: 0px;
    padding: 0px;
  }
</style>