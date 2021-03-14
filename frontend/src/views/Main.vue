
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
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
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
  }
}
</script>



<style scoped>
#card {
    margin: 20px auto;
}
</style>