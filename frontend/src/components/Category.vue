<template>
<div>
  <h3>Category: {{ this.$route.params.name | capitalize }}</h3>
  <div v-if="data.length !== 0">
    <h4><a :href="headerTitlePermalink">{{ headerTitle }}</a></h4>
    <div v-for="(value, key) in data" :key="key" class="article-pane">
      <div class="text">
        <h4><a :href="value.permalink">{{ value.title }}</a></h4>
        <p>{{ value.description }}</p>
        <p><small>Posted on {{ value.datePosted }}</small></p>
      </div>
    </div>
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
  name: 'Category',
  components: {
  },

  data() {
    return {
      data: [],
      headerTitle: '',
      headerTitlePermalink: ''
    };
  },

  methods: {
    getList() {
      const category = this.$route.params.name;
      apiService.getList(category).then((data) => {
        this.data = data.getItems;
        this.headerTitle = data.headerTitle.title;
        this.headerTitlePermalink = data.headerTitle.permalink;
        console.log(this.data);
        console.log(this.headerTitle);
        console.log(this.headerTitlePermalink);
      })
    }
  },

  mounted() {
    this.getList();
  },
}
</script>

<style>
  .article-pane {
    position: relative;
    width: 45%;
    min-height: 250px;
    margin: 20px 15px;
    padding: 5px 15px;
    float: left;
    overflow: auto;
    background-color: #fff;
    border-radius: 10px;
    -webkit-box-shadow: 0px 2px 5px 0px #cfcfcf;
    -moz-box-shadow: 0px 2px 5px 0px #cfcfcf;
    box-shadow: 0px 2px 5px 0px #cfcfcf;
  }

  .article-pane:nth-child(even) {
    float: right;
  }

  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 95%;
  }

  .pre-loader {
    text-align: center;
    line-height: 30px;
  }

  .pre-loader > div {
    text-align: center;
  }
</style>