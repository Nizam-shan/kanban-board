<script >
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import HomeView from './views/HomeView.vue';
export default {
components:{
  HomeView
}
}
</script>

<template>
 
  <RouterView />
</template>
