<template>
    <div id="container">
        <Navigation/>
        <div id="profil">
            <div id="username">
                <v-avatar id="avatar" size="127"><img src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light" alt=""></v-avatar>
                <h1>{{ user.username }}</h1>
            </div>
            <div id="infos">
                <p><b>Adresse email:</b>  {{ user.email }}</p><br>
                <p><b>Description:</b>  {{ user.description }}</p>
            </div>
            <div class="my-2" id="options">
            <v-btn
              color="#26c6da"
              dark
              large
            >
              Modifier le profil
            </v-btn>
            <v-btn
              color="#26c6da"
              dark
              large
            >
              Supprimer le profil
            </v-btn>
          </div>
            

        </div>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';
export default {
    name: 'MyProfil',
    components: {
    Navigation
  },
  data() {
      return {
          user: null
      }
  },
  created() {
      this.token = localStorage.getItem("token");
      VueJwtDecode.decode(this.token);
      axios.get('http://localhost:3000/api/users/me', {
          headers: { Authorization: "Bearer " + this.token}
      })
      .then(response => {
          console.log(response.data);
          this.user = response.data;
      })
      .catch(error => console.log(error));
  }
}
</script>

<style scoped>
#profil {
    text-align: center;
    margin: 30px auto;
    max-width: 800px;
    border: 2px solid black;
}

#username, #avatar, #infos {
    margin: 50px auto;
}
#options {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 30px;
}
</style>