<template>
    <div id="container">
        <router-link id="loginLink" to="/login"><v-btn id="login">Se connecter</v-btn></router-link><br>
        <form>
            
            <label><v-icon class="icon">mdi-email</v-icon><b> Adresse email</b></label>
            <input type="text" placeholder="Votre adresse email" name="email" required v-model="email">

            <label><v-icon class="icon">mdi-account</v-icon><b> Pseudo</b></label>
            <input type="text" placeholder="Votre Pseudo" name="username" required v-model="username">

            <label><v-icon class="icon">mdi-lock</v-icon><b> Mot de passe</b></label>
            <input type="password" placeholder="Votre Mot de passe" name="password" required v-model="password">

            <label><v-icon class="icon">mdi-chat</v-icon><b> Description</b></label>
            <textarea name="description" rows="5" cols="33" placeholder="Votre Description" v-model="description"></textarea>

            <input type="submit" id='submit' value="S'inscrire" @click.prevent="userSignup">        
        </form>    
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props:['email', 'username', 'password', 'description'],
    methods: {
        userSignup() {
            axios.post('http://localhost:3000/api/users/signup', {
                email: this.email,
                username: this.username,
                password: this.password,
                description: this.description
            })
            .then(response => {
                console.log(response);
                window.location.href='/login'
            })
            .catch(() => alert("Champs manquants ou incorrects. Le mot de passe doit contenir minimum 6 caractères dont un chiffre."));
        }, 
    }
}
</script>

<style scoped>

#container{
    width:400px;
    margin:0 auto;
    margin-top:10%;
}

form {
    width:100%;
    padding: 30px;
    border: 1px solid #f1f1f1;
    border-radius: 15px;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

input[type=text], input[type=password], textarea {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

input[type=submit] {
    background-color: #1867c0;
    border-radius: 15px;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    cursor: pointer;
    width: 100%;
}
input[type=submit]:hover {
    background-color: white;
    color: #1867c0;
    border: 1px solid #1867c0;
}
#login  {
  font-weight: bold;
  background-color: #1867c0;
  border-radius: 10px;
  color: white;
  padding: 15px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 40%;
}
#loginLink:link {
  text-decoration: none;
}
.icon {
    margin-bottom: 5px;
}
</style>