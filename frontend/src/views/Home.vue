<template>
  <div class="app">
    <v-img id="img" lazy-src="../assets/icon-groupomania.png" max-height="750" max-width="950" src="../assets/icon-groupomania.png"></v-img>
    <div id="boutons">
      <v-btn id="login"><router-link id="loginLink" to="/login">Se connecter</router-link></v-btn>   
      <v-btn id="signup"><router-link id="signupLink" to="/signup">S'inscrire</router-link></v-btn>
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
  justify-content: space-around;
  margin: 0px auto;
}
#login, #signup  {
  font-weight: bold;
  background-color: #fcd7d7;
  border-radius: 15px;
  color: white;
  padding: 25px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 40%;
}
#loginLink:link, #signupLink:link {
  text-decoration: none;
  color: white;
}
#loginLink, #signupLink {
  color: #f52d03;
  font-size: 20px;
}
#login:hover, #signup:hover {
    background-color: white;
    border: 1px solid #f52d03;
}
</style>
