<template>
  <div id="container">  
      <router-link id="signupLink" to="/signup"><v-btn id="signup">S'inscrire</v-btn></router-link><br>
        <form>
            <label><v-icon class="icon">mdi-email</v-icon><b> Adresse email :</b></label>
            <input type="text" placeholder="Votre adresse email" name="email" required v-model="email">

            <label><v-icon class="icon">mdi-lock</v-icon><b> Mot de passe :</b></label>
            <input type="password" placeholder="Votre Mot de passe" name="password" required v-model="password">

            <input type="submit" id='submit' value='Connexion' @click.prevent="userLogin">
        </form>
    </div>
</template>



<script>
import axios from 'axios';
export default {
    props: ['email', 'password'],
    methods: {
        userLogin() {
            axios.post('http://localhost:3000/api/users/login', {
                email: this.email,
                password: this.password
            })
            .then(response => {
                localStorage.setItem("token", response.data.token);
                window.location.href='/main'
            })
            .catch(() => alert("Email ou Mot de passe incorrect"));
        }
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
input[type=text], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
input[type=submit] {
    background-color: #DAF7A6;
    border-radius: 15px;
    color: black;
    padding: 14px 20px;
    margin: 8px 0;
    cursor: pointer;
    width: 100%;
}
input[type=submit]:hover {
    background-color: white;
    color: #1867c0;
    border: 1px solid #1867c0 ;
}
#signup  {
  font-weight: bold;
  background-color: #1867c0 ;
  border-radius: 10px;
  color: white;
  padding: 15px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 40%;
}
#signupLink:link {
  text-decoration: none;
}
.icon {
    margin-bottom: 5px;
}

</style>