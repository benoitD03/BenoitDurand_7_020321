<template>

  <div>
    <nav class="navbar navbar-light bg-dark py-3">
      <div id="nav">
        <router-link class="navLink" to="/myProfil">Mon profil</router-link>
        <router-link class="navLink" to="/main">Groupomania</router-link>
        <span>
          <button class="navLink" @click="disconnect">
            Se déconnecter
          </button>
        </span>
      </div>
    </nav>
  </div>

</template>

<script>
export default {
    name: 'Navigation',
    methods: {
      disconnect() {
        this.token = localStorage.getItem("token");
        localStorage.removeItem("token");
        window.location.href="/";
      },
    }
}

</script>

<style scoped>
    img {
        max-width: 150px;
        margin-left: 30px;
    }
    span {
  float: right;
}
#nav {
  padding: 30px;
  font-weight: bold;
  background: #1867c0;
  display: flex;
  justify-content: space-between;
}
.navLink {
  text-decoration: none;
  color: #f1f1f1;
}
#nav a.router-link-exact-active {
  color: #04172c;
}
a {
  text-decoration: none;
}
</style>