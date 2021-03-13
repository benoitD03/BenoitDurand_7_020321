<template>
  <div class="app">
    <h1>Bienvenue sur Groupomania</h1>
    <img src="../assets/icon-groupomania.png" alt="logo">
    <router-link to="/login">Se connecter</router-link> |  
    <router-link to="/signup">S'inscrire</router-link><br>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
    
  }
}
</script>
