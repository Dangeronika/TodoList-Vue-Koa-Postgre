<template>
  <div :class="{viewed: task.checked}">
    <li :class="{completed: task.completed}">
      <span :class="{checked: task.completed}">
        <input type="checkbox"
               v-bind:checked="task.checkbox_clicked"
               v-on:change ="completer(), $emit('chbxchange', task.id, !task.checkbox_clicked)"
        >
        <strong>{{task.id}}</strong>
        {{task.title}}
      </span>
      <div class="buttons">
        <input type="text" v-model="renameDescription"
          :class="{usable: !task.rename}">
        <button class="rename-but"
          v-on:click =" hider(index), $emit('rename-task', renameDescription, task.id)"
          :class="{usable: !task.rename}"><img src="~@/assets/accepted.png" class="img" alt="">
        </button>

        <button class="rename-but"
          v-on:click ="hider(index)"
          :class="{usable: task.rename}" ><img src="~@/assets/pencil-pen.png" class="img" alt="">
        </button>

        <button class="rename-but"
          v-on:click ="$emit('remove-todo', task.id)">&times;
        </button>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
    index: Number,
  },
  data() {
    return {
      renameDescription: '',
    }
  },
  methods: {

    hider: function(index) {
      this.$emit('changeRename', index)
    },
    completer: function() {
      this.task.completed = !this.task.completed;
    },
  }
}
</script>

<style scoped>
li{
  border: 3px solid #DDE0E6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 15px;
  padding: 3px;
}
.checked{
  text-decoration: line-through;
  background-color: greenyellow;
}
.completed{
  background-color: greenyellow;
}
span{
  padding: 5px;
}
.img{
  width: 12px;
}
.rename-but{
  margin-right: 10px;
  width: 30px;
  height: 30px;
}
.buttons{
  padding-right: 10px;
}
.usable{
  visibility:  hidden;
}
input{
  margin-right: 15px;
}
.viewed{
  visibility:  hidden;
}
</style>
