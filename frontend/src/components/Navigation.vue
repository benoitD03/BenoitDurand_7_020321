<template>
  <v-toolbar
    color="#26c6da"
    dark
  >
    <v-toolbar-title><v-icon>mdi-account</v-icon>Mon profil</v-toolbar-title>

    <v-divider
      class="mx-4"
      vertical
      id="divider"
    ></v-divider>

    <span class="subheading"><img src="../assets/icon-left-font-monochrome-black.png"></span>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">

      <v-divider vertical></v-divider>

      <v-btn text>
        <v-icon>mdi-logout</v-icon>Se déconnecter
      </v-btn>

      <v-divider vertical></v-divider>
    </v-toolbar-items>

    <v-app-bar-nav-icon></v-app-bar-nav-icon>
  </v-toolbar>
</template>

<script>
export default {
    name: 'Navigation'
}
</script>

<style scoped>
    img {
        width: 150px;
        margin-left: 30px;
    }
    #navbar {
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid black;
    }
    .vbtn {
        margin: 10px 0;
    }
    #divider {
        margin-left: 30px;
    }
</style>