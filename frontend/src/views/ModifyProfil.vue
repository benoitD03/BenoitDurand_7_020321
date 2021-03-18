<template>
    <div id="modify">
        <Navigation/>
         <div id="container">  
            <form @submit.prevent="modify">

            <label><b><v-icon class="icon">mdi-email</v-icon> Adresse email</b><br>(Actuellement: {{ user.email }})</label>
            <input type="text" placeholder="Votre Nouvelle adresse email" name="email" required v-model="email">

            <label><v-icon class="icon">mdi-account</v-icon><b> Pseudo</b><br>(Actuellement: {{ user.username }})</label>
            <input type="text" placeholder="Votre nouveau Pseudo" name="username" required v-model="username">

            <label><v-icon class="icon">mdi-chat</v-icon><b> Description</b><br>(Actuellement: {{ user.description }})</label>
            <textarea name="description" rows="5" cols="33" placeholder="Votre nouvelle Description" v-model="description"></textarea>

            <label><v-icon class="icon">mdi-image</v-icon><b> Photo de profil</b></label><br>
            <input id="uploadImage" type="file" ref="image" @change="uploadImage">

            <input type="submit" id='submit' value="Enregistrer les modifications">        
        </form>  
        </div>
    </div>
</template>



<script>
import Navigation from '@/components/Navigation.vue';
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';
export default {
    name: 'ModifyProfil',
    components: {
    Navigation
  },
  data() {
      return {
          user: {
              email: null,
              username: null,
              image: null
          }
          
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
      modify() {
          let formData = new FormData;

          formData.append('email', this.email);
          formData.append('username', this.username);
          formData.append('description', this.description);
          formData.append('image', this.user.image);

          axios.put('http://localhost:3000/api/users/me', formData, {
              headers: { Authorization: "Bearer " + this.token,
                        'Content-Type': 'multipart/form-data'
                },    
          })
          .then(response => {
              console.log(response);
              window.location.href="/myprofil"
          })
          .catch(error => console.log(error));
      },
      uploadImage() {
          this.user.image = this.$refs.image.files[0];
      }
  }
    
}
</script>



<style scoped>
#container{
    max-width:700px;
    margin:0 auto;
    margin-top:10%;
}
/* Bordered form */
form {
    width:100%;
    padding: 30px;
    border: 1px solid #f1f1f1;
    border-radius: 15px;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}


/* Full-width inputs */
input[type=text], input[type=password], textarea {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

/* Set a style for all buttons */
input[type=submit] {
    background-color: #1867c0;
    border-radius: 15px;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}
input[type=submit]:hover {
    background-color: white;
    color: #1867c0;
    border: 1px solid #1867c0;
}
#uploadImage {
    background-color: #DAF7A6;
    border-radius: 10px;
    border: 2px solid black;
    margin: 20px auto;
    text-align: center;
}
.icon {
    margin-bottom: 5px;
}
</style>