<template>
    <div id="container">
        <Navigation/>

        <v-card class="mx-auto" max-width="600" outlined v-for="user in users" :key="user.id" id="card">
            <v-list-item three-line>
                <v-list-item-content>
                     <div class="overline mb-4" id="username">
                        {{ user.username }}
                    </div>
                    <v-list-item-subtitle id="description">{{ user.description !== 'undefined' ? user.description : "Pas de description"  }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="80">
                    <v-img class="elevation-6" alt="" :src="user.image"></v-img>
                </v-list-item-avatar>
            </v-list-item>

            <v-card-actions id="actions">
                <v-btn small dark text id="admin" v-if="user.isAdmin == 0" @click="becomeAdmin(user.id)">
                    <v-icon>mdi-tools</v-icon>
                    Nommer administrateur
                </v-btn>
                <v-btn small dark text id="delete" v-if="user.isAdmin == 1" @click="stopAdmin(user.id)">
                    <v-icon>mdi-tools</v-icon>
                    Supprimer les droits 
                </v-btn>
                <v-btn small dark text id="deleteUser" @click="deleteUser(user.id)">
                    <v-icon>mdi-delete</v-icon>
                    Supprimer utilisateur 
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>



<script>
import Navigation from '@/components/Navigation.vue';
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios';
export default {
    name: 'AllUsers',
  components: {
    Navigation
  },
  data() {
      return {
          users: null,
          token: null,
          user:{
            id:null,
            email: null,
            username: null,
            image: null,
            isAdmin: 0
          }
      }
  },
  mounted() {
      this.token = localStorage.getItem("token");
          VueJwtDecode.decode(this.token)
          axios.get('http://localhost:3000/api/users/all', {
              headers: { Authorization: "Bearer " + this.token}
          })
          .then(response => {
              this.users = response.data
              console.log(this.users)
          })
          .catch(error => console.log(error));
  },
  methods: {
      becomeAdmin(id, user) {
          const confirmation = confirm("Êtes vous sûr de vouloir donner les droits d'administrateur à cet utilisateur ?")

          if(confirmation) {
              axios.put('http://localhost:3000/api/admin/isadmin/' + id, user, {
                  headers: { Authorization: "Bearer " + this.token }
              })
              .then(response => {
                  console.log(response.data);
                  location.reload();
              })
              .catch(error => console.log(error))
          }
      },
      stopAdmin(id, user) {
          const confirmation = confirm("Êtes vous sûr de vouloir retirer les droits de cet utilisateur ?")

          if(confirmation) {
              axios.put('http://localhost:3000/api/admin/isnotadmin/' + id, user, {
                  headers: { Authorization: "Bearer " + this.token }
              })
              .then(response => {
                  console.log(response.data);
                  location.reload();
              })
              .catch(error => console.log(error))
          }
      },
      deleteUser(id) {
          const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur définitivement ?")

          if(confirmation) {
              axios.delete('http://localhost:3000/api/admin/' + id, {
                  headers: { Authorization: "Bearer " + this.token}
              })
              .then(response => {
                  console.log(response.data);
                  location.reload();
              })
              .catch(error => console.log(error));
          }
      }
  }
}
</script>



<style scoped>
#card {
    margin: 20px auto;
    border: 1px solid #f1f1f1;
    border-radius: 15px;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
#username {
    font-size: 20px;
    font-weight: bold;
}
#description {
    font-size: 18px;
}
#admin {
    background-color: #1867c0;
    border-radius: 8px;
}
#deleteUser {
    margin: 10px;
}
#delete, #deleteUser {
    background-color: #E86969;
    border-radius: 8px;
}
@media all and (max-width: 570px) {
    #actions {
        display: flex;
        flex-direction: column;
        
    }
}
</style>