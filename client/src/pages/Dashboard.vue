<template>
    <div>
      <h2>This is Dashboard</h2>
      <Demo />
      <router-link to="/">Log out</router-link>
    </div>
  </template>
  
  <script>
  import Demo from '../components/Dashboard/Demo.vue';
  export default {
    name: 'Dashboard',
    components: {
    Demo,
  },
    components:{
      Demo,
    }
    
  };
  </script>
  