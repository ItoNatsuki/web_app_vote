<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="post">clickMe</button>
  </div>
</template>

<script>
import Methods from '../api/method'
export default {
  name: 'Hello',
  data(){
    return{
      msg:'Welcome to Your Vue.js App'
    }
  },
  methods:{
    async post(){
      let response = await Methods.testPosting()
      console.log(response)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
