<template>
<div class="list-pane">
  <div v-if="data.length !== 0">
    <ul>
      <li v-for="(value, key) in data" :key="key">
        <router-link :to="{ name: 'category', params: {name: key } }">{{ value }}</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
  <div v-else>
    <div class="pre-loader">
      <font-awesome-icon 
        icon="spinner" 
        size="3x" 
        spin fixed-width>
      </font-awesome-icon>
      <div>Loading...</div>
    </div>
  </div>
</div>
</template>
<script>
import router from '../router'
import { APIService } from '../APIService';
const apiService = new APIService();

export default {
  name: 'List',
  props: {
    section: String
  },
  components: {
  },

  data() {
    return {
      data: [],
    };
  },

  computed: {
    loggedIn: function() {
      return this.$store.getters.loggedIn;
    }
  },

  methods: {
    loginHandler: function() {
      if (this.loggedIn) {
        // action here
      } else {
        this.$router.push('login')
      }
    },
    getList: function() {
      apiService.getList().then((data) => {
        this.data = data;
      })
    }
  },

  mounted() {
    this.loginHandler();
    this.getList();
    this.$router.beforeEach((to, from, next) => {
      const isLogged = this.$store.getters.loggedIn;
      if (isLogged && to.name == 'login') {
        // no need to go to login page, if user is already logged in - redirect
        return this.$router.push('list');
      }
      return next();
    });
  },

  watch: {
    loggedIn: function() {
      this.loginHandler;
    }
  }
}
</script>

<style>
  .list-pane {
    width: 30%;
    margin: 0 auto;
    padding: 5px 15px;
    background-color: #fff;
    border-radius: 10px;
    -webkit-box-shadow: 0px 2px 5px 0px #cfcfcf;
    -moz-box-shadow: 0px 2px 5px 0px #cfcfcf;
    box-shadow: 0px 2px 5px 0px #cfcfcf;
  }

  .list-pane div {
    margin: 0 auto;
    width: 80%;
    text-align: left;
  } 

  ul {
    padding-inline-start: 0;
  }

  li {
    list-style-type: none;
    line-height: 25px !important;
  }

  .list-pane .pre-loader {
    text-align: center;
    line-height: 30px;
  }

  .list-pane .pre-loader > div {
    text-align: center;
  }
</style>
