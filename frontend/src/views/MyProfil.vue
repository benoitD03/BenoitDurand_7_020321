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
              @click="goToModify"
            >
              Modifier le profil
            </v-btn>
            <v-btn
              color="#26c6da"
              dark
              large
              @click="deleteProfil"
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
  },
  methods: {
      deleteProfil() {
          const confirmation = confirm("Êtes vous sûr de vouloir supprimer votre profil ?")
          if (confirmation){
              this.token = localStorage.getItem("token");
              this.user = VueJwtDecode.decode(this.token);
              console.log(this.user.userId)
              axios.delete('http://localhost:3000/api/users/' + this.user.userId, {
                  headers: { Authorization: "Bearer " + this.token }
              })
              .then(response => {
                  console.log(response.data);
                  localStorage.removeItem("token");
                  window.location.href='/signup'
              })
              .catch(error => console.log(error));
          }
      },
      goToModify() {
        window.location.href="/modifyprofil";
      }
  }
}
</script>

<style scoped>
#profil {
    text-align: center;
    margin: 30px auto;
    max-width: 800px;
    border: 1px solid #f1f1f1;
    background-color: #D9EEF0;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    border-radius: 15px;
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