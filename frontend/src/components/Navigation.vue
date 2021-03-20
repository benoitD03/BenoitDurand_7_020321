<template>
  <v-toolbar id="navbar" color="#1867c0" dark>

    <v-btn id="profil" text @click="goToProfil">
        <v-icon>mdi-account</v-icon><p class="text">Mon profil</p>
    </v-btn>

    <v-divider class="mx-4 divider" vertical></v-divider>
    <v-btn text @click="goToMainPage">
      <span class="subheading"><img src="../assets/icon-left-font-monochrome-black.png"></span>
    </v-btn>
    
    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">

      <v-divider class="divider" vertical></v-divider>

      <v-btn text @click="disconnect">
        <v-icon>mdi-logout</v-icon><p class="text">Se déconnecter</p>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
    name: 'Navigation',
    methods: {
      disconnect() {
        this.token = localStorage.getItem("token");
        localStorage.removeItem("token");
        window.location.href="/login";
      },
      goToProfil() {
        window.location.href="/myprofil";
      },
      goToMainPage() {
        window.location.href="/main";
      }
    }
}

</script>

<style scoped>
    img {
        max-width: 150px;
        margin-left: 30px;
    }
    .vbtn {
        margin: 10px 0;
    }
    #divider {
        margin-left: 30px;
    }
    @media all and (max-width: 600px) {
      img {
        width: 100px;
        margin-left: 0;
      }
      .text {
        display: none;
      }
      

    }
</style>