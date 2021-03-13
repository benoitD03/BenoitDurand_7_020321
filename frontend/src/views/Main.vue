<template>
    <div id="container">
        <Navigation/>
    
        <ul>
            <li v-for="message in messages.messages" :key="message.id">
                {{ message.title }} <br> {{ message.content }}
            </li>
        </ul>
    </div> 
</template>



<script>
import Navigation from '@/components/Navigation.vue';
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios';

export default {
  name: 'Main',
  components: {
    Navigation
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
              createAt: null
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
              console.log(response)
              this.messages = response.data;
              console.log(this.messages)
          })
          .catch(error => console.log(error));
  }
}
</script>



<style scoped>

</style>