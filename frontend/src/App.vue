<template>
  <div id="app">
    <h2>My Scrape Thing - RSS Feed</h2>
      <nav v-if="isLoggedIn">
        <div><a href="javaScript:void(0);" v-on:click="logout">Logout</a></div>
        <h3><router-link to="/list">Categories</router-link></h3>
      </nav>
      <router-view @loggedIn="loginStatus"/>
    
  </div>
</template>

<script>
//const store = import('./store/store')
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'app',
  components: { },

  data() {
    return {
      isLoggedIn: false,
    };
  },

  methods: {
    redirect: function() {
      if (this.$store.getters.loggedIn) {
        this.isLoggedIn = true;
        console.log('Login status :: '+this.$store.getters.loggedIn);
        if (null !== localStorage.getItem('category')) {
          this.$router.push(localStorage.getItem('category'));
        } else {
          this.$router.push({name: 'list'});
        }
      } else {
        this.isLoggedIn = false;
        console.log('Login status :: '+this.$store.getters.loggedIn);
        this.$router.push('login');
      }
    },
    logout: function(e) {
      e.preventDefault();
      let initialState = {
				user: {
					loggedIn: false
				}
			};
      this.$store.replaceState(initialState);
      console.log('LoggedIn store :: '+this.$store.getters.loggedIn);
      this.isLoggedIn = false;
      console.log('Login status :: '+this.$store.getters.loggedIn);
      this.$router.push({name: 'login'});
      localStorage.removeItem('vuex');
      localStorage.removeItem('category');
    },
    loginStatus: function(value) {
      this.isLoggedIn = value;
    } 
  },

  mounted() {
    this.redirect();
  }
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
