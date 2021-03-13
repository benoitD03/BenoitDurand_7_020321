<template>
    <v-top-navigation id="navbar">
    <v-btn>
      <span>Mon profil</span>

      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn>
      <img src="../assets/icon-left-font-monochrome-black.png">

    </v-btn>

    <v-btn>
      <span>Se déconnecter</span>

      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-top-navigation>
</template>

<script>
export default {
    name: 'Navigation'
}
</script>

<style scoped>
    img {
        width: 150px;
    }
    #navbar {
        display: flex;
        justify-content: space-around;
    }
</style>