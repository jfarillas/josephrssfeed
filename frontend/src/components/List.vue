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
import {APIService} from '../APIService';

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

  methods: {
    getList() {
      apiService.getList().then((data) => {
        this.data = data;
      })
    }
  },

  mounted() {
    this.getList();
  },
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