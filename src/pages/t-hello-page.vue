<template>
  <div class="t-hello-page">
    <h1>Tiles Game</h1>
    <router-link :to="{ name: 'gameplay' }">
      <span>Press to start</span>
    </router-link>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 't-hello-page',
    mounted() {
      let isFieldExist = false
      this.setFieldExist(isFieldExist)
    },
    methods: {
      ...mapActions([
      'CHANGE_IS_FIELD_EXIST'
        ]),
      //сбрасываем поле на 1 уровень при переходе к экрану приветствия и обратно
      setFieldExist(isFieldExist) {
        this.CHANGE_IS_FIELD_EXIST(isFieldExist)
      }
    }
  }
</script>

<style>
</style>