<template>
  <div class="login-container">
    <form>
      <div class="form-container">
        <div class="columns">
          <div class="login-sub-text"><h2>Login Panel</h2></div>
          <div class="form-group username">
            <input type="email"
                class="form-control"
                name="email"
                v-model="email"
                placeholder="Email"
                required
                pattern="^([a-z0-9_\-\.]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$">
            <div class="container-fa-envelope">
              <font-awesome-icon
                icon="envelope"
                fixed-width>
              </font-awesome-icon> 
            </div>
          
          </div>  
          <div class="form-group password">
            <input type="password"
                class="form-control"
                name="password"
                v-model="password"
                placeholder="Password"
                required>
            <div class="container-fa-key">
              <font-awesome-icon
                icon="key"
                fixed-width>
              </font-awesome-icon>
            </div>
          </div>
          <b-button type="submit" v-on:click="login" variant="primary">Log in</b-button> 
          <div class="callout-info"><span>Login credentials (demo):<br>Email: jfarillas.dev@gmail.com<br>Password: demo</span></div>
          <div class="callout-error" v-if="loginError"><span>Invalid username or password</span></div>
          
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { APIService } from '../APIService';
const apiService = new APIService();

export default {
  data: function() {
    return {
      email: '',
      password: '',
      response: '',
      loginError: false
    }
  },

  methods: {
    login: function(e) {
      e.preventDefault(); 
      apiService.login(this, this.$store).then((data) => {
        console.log(this.$store.getters.loggedIn);
        this.$emit('loggedIn', this.$store.getters.loggedIn);
        this.$router.push({name: 'list'});
      }).catch((err) => {
        this.loginError = true;
      });
    }
  },

  mounted() {
    this.$router.beforeEach((to, from, next) => {
      const isLogged = this.$store.getters.loggedIn;
      if (!isLogged && to.path == '/') {
        return this.$router.push('login');
      }
      return next();
    });
  }
}
</script>
<style>
  .login-container {
    width: 387px;
    position: fixed;
    padding: 42px 49px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 10px;
    -webkit-box-shadow: 0px 2px 5px 0px #cfcfcf;;
    -moz-box-shadow: 0px 2px 5px 0px #cfcfcf;;
    box-shadow: 0px 2px 5px 0px #cfcfcf;;
  }

  .logo-login {
        width: 100%;
  }

  .logo-login img {
        margin: auto;
      display: block;
  }

  .login-container .login-sub-text {
      width: 100%;
      margin-bottom: 15px;
  }

  .login-container .login-sub-text h2 {
      font-size: 16px;
      text-align: center;
  }

  .login-container .form-group {
      margin-bottom: 0;
  }

  .login-container .form-group.username {
      margin-bottom: 10px;
  }

  .login-container .form-group.username, .login-container .form-group.password {
      position: relative;
  }

  .login-container .form-group.username input, .login-container .form-group.password input {
      padding-left: 60px;
      background-color: #e6e6e6;
      color: #6e6e6e;
  }

  .login-container .form-group.username input:-webkit-autofill, .login-container .form-group.username input:-webkit-autofill:focus {
      -webkit-text-fill-color: #6e6e6e;
      box-shadow: 0 0 0px 1000px #e6e6e6 inset;
      transition: background-color 5000s ease-in-out 0s;
  }

  .login-container .form-group.username .container-fa-envelope, .login-container .form-group.password .container-fa-key {
      position: absolute;
      width: 38px;
      height: 38px;
      top: 0;
      left: 0;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background-color: #dbdbdb;
  }

  .login-container .form-group.password {
      margin-bottom: 15px;
  }

  .login-container .fa-envelope, .login-container .fa-key {
      position: absolute;
      top: 11px;
      left: 10px;
      color: #b0b0b0;
  }

  .login-container form .btn-expanded {
      width: 100%;
      text-transform: uppercase;
      font-size: 16px;
      font-weight: bold;
      background-color: #2b8bd9;
      margin-bottom: 25px;
  }

  .login-container .forgot-password {
      margin-bottom: 25px;
  }

  .login-container .forgot-password a {
      float: right;
      font-size: 14px;
      color: #89898c;
  }

  .login-container .callout-error, .login-container .callout-info {
      text-align: center;
  }

  .login-container .callout-error span {
      color: #ff0000;
      font-size: 14px;
  }

  .login-container .callout-info span {
      font-size: 14px;
  }
</style>
