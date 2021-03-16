
<template>
<div id="container">
    <Navigation/>
    <CreateMessage/>

     <v-card
    class="mx-auto"
    color="#26c6da"
    dark
    max-width="700"
    v-for="message in messages.messages" :key="message.id"
    id="card"
  >
    <v-card-title>
    
      <span class="title font-weight-light">{{ message.createdAt }} <br> {{ message.title }}</span>
      
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{ message.content }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            :src="message.User.image"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ message.User.username }}</v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
          <v-icon class="mr-1">
            mdi-heart
          </v-icon>
          <span class="subheading mr-2">256</span>
          <span class="mr-1">·</span>
          <v-icon class="mr-1">
            mdi-share-variant
          </v-icon>
          <span class="subheading">45</span>
          <v-btn
              color="#E86969"
              dark
              medium
              @click="deleteMessage(message.id)"
              v-if="message.idUSERS == user.id"
            >
              Supprimer
            </v-btn>
        </v-row>
      </v-list-item>
    </v-card-actions>
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
          user: null,
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
</style>