<template>
  <div class="app">
    <v-img id="img" lazy-src="../assets/icon-groupomania.png" max-height="750" max-width="950" src="../assets/icon-groupomania.png"></v-img>
    <div id="boutons">
      <router-link id="loginLink" to="/login"><v-btn id="login">Se connecter</v-btn></router-link>  
      <router-link id="signupLink" to="/signup"><v-btn id="signup">S'inscrire</v-btn></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    
  }
}
</script>

<style scoped>
.app {
  text-align: center;
}
#img {
  margin: auto;
}
#boutons {
  display: flex;
  justify-content: center;
  margin: 0px auto;
}
#login, #signup  {
  font-weight: bold;
  background-color: #DAF7A6;
  border-radius: 15px;
  color: black;
  margin: auto 10px;
  cursor: pointer;
  padding: 25px 20px;
}
#loginLink:link, #signupLink:link {
  text-decoration: none;
}
#loginLink, #signupLink {
  font-size: 20px;
}
#login:hover, #signup:hover {
    border: 1px solid #f52d03;
}
</style>
