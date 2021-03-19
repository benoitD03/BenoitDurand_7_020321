
<template>
<div id="container">
    <Navigation/>
    <CreateMessage/>

     <v-card class="mx-auto" color="#FFF" dark max-width="700" v-for="message in messages.messages.slice().reverse()" :key="message.id" id="card">
        <div id="topCard">
            <v-card-title>
                <span class="title font-weight-light">{{ message.createdAt }} <br> {{ message.title }}</span>
            </v-card-title>
        </div>
    
        <div id="cardContent">

            <v-card-text class="headline font-weight-bold">
                <div id="attachment" v-if="message.attachment">
                  <img :src="message.attachment" alt="attachment">
                </div>
                <p id="messageContent">{{ message.content }}</p>
            </v-card-text>

          <v-card-actions id="bottomCard">
            <v-list-item class="grow">

              <v-list-item-avatar id="avatar" color="grey darken-3">
                <v-img class="elevation-6" alt="" :src="message.User.image"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title id="username">{{ message.User.username }}</v-list-item-title>
              </v-list-item-content>

              <v-row id="row">
                <span id="heart" class="subheading mr-2"><v-icon class="mr-1" color="#E86969">mdi-heart</v-icon>  22</span>
                <v-btn color="#E86969" dark medium @click="deleteMessage(message.id)" v-if="message.idUSERS == user.id || user.isAdmin == 1">
                    <v-icon>mdi-delete</v-icon>
                    Supprimer
                </v-btn>
              </v-row>

            </v-list-item>
          </v-card-actions>

        </div>

      </v-card>
    
</div>

</template>


<script>
import Navigation from '@/components/Navigation.vue';
import CreateMessage from '@/components/CreateMessage.vue';
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios';

export default {
  name: 'Main',
  components: {
    Navigation, CreateMessage
  },
  data() {
      return {
          messages: null,
          token: null,
          user:{
            email: null,
            username: null,
            image: null,
            isAdmin: null
          },
          message: {
              id: null,
              idUSERS: null,
              title: null,
              content: null,
              attachment: null,
              createdAt: null
          }
          
      }
  },
  mounted() {
          this.token = localStorage.getItem("token");
          VueJwtDecode.decode(this.token)
          axios.get('http://localhost:3000/api/messages', {
              headers: { Authorization: "Bearer " + this.token}
          })
          .then(response => {
              this.messages = response.data
              console.log(this.messages)
          })
          .catch(error => console.log(error));

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
    deleteMessage(id) {
      const confirmation = confirm("Êtes vous sûr de vouloir supprimer ce message ?")
          if (confirmation){
              this.token = localStorage.getItem("token");
              this.user = VueJwtDecode.decode(this.token);
              axios.delete('http://localhost:3000/api/messages/' + id, {
                  headers: { Authorization: "Bearer " + this.token }
              })
              .then(response => {
                  console.log(response.data);
                  window.location.href='/main'
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
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
#attachment img {
  max-width: 250px;
}
#row {
  display: flex;
  justify-content: space-between;
}
#avatar {
  margin-right: 10px;
}
#topCard {
  background-color: #1867c0;
}
#cardContent {
  color: black;
  margin-top: 10px;
}
#username {
  color: black;
}
#heart {
  color: black;
  margin-top: 10px;
}
#bottomCard {
  border-top: 1px solid black;
}
#messageContent {
  font-size: 18px;
}
</style>