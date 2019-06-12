<template>
  <div id="app">
    <h2>My Scrape Thing - RSS Feed</h2>
    <nav>
      <h3><router-link to="/list">Categories</router-link></h3>
    </nav>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: { }
}
</script>

<style>
body {
  background-color: #e2e0e0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
