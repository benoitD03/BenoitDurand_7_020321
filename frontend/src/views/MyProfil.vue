<template>
    <div id="container">
        <Navigation/>
        <div id="profil">
            <router-link to="/allusers" id="btnUsersLink">
                <v-btn id="btnUsers" color="#1867c0" dark medium class="boutons" v-if="user.isAdmin == 1">
                    <v-icon>mdi-tools</v-icon>
                    Gérer tous les utilisateurs
                </v-btn>
            </router-link>
            
            <div id="username">
                <v-avatar id="avatar" size="250"><img :src="user.image" alt="Photo de profil"></v-avatar>
                <h1>{{ user.username }}</h1>
            </div>
            <div id="infos">
                <p class="info"><v-icon class="icon">mdi-email</v-icon><b> Adresse email:</b>  {{ user.email }}</p><br>
                <p class="info" id="description"><v-icon class="icon">mdi-chat</v-icon><b> Description:</b>  {{ user.description }}</p>
            </div>
            <div class="my-2" id="options">
                <v-btn color="#DAF7A6" large class="boutons" @click="goToModify">
                    <v-icon>mdi-pen</v-icon>
                    Modifier le profil
                </v-btn>
                <v-btn color="#E86969" dark large class="boutons" @click="deleteProfil">
                    <v-icon>mdi-delete</v-icon>
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
          const confirmation = confirm("Êtes vous sûr de vouloir supprimer votre profil et tous les messages qui y sont associés?")
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
    font-size: 20px;
    text-align: center;
    margin: 30px auto;
    max-width: 800px;
    border: 1px solid #f1f1f1;
    background-color: white;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    border-radius: 15px;
}

#username, #avatar, #infos {
    margin: 50px auto;
}
.info {
    margin: 10px auto;
    padding: 15px 0;
    border: 1px solid #f1f1f1;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    border-radius: 10px;
    text-align: center;
    width: 70%;
}
#description {
    padding: 15px;
}
#options {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 30px;
}
.icon {
    margin-bottom: 5px;
}
#btnUsersLink:link {
    text-decoration: none;
}
#btnUsers {
    margin-top: 15px;
}
@media all and (max-width: 600px) {
    #options {
        display: block;
    }
    .boutons {
        margin: 10px;
    }
    .info {
        width: 95%;
        font-size: 15px;
    }
}
</style>