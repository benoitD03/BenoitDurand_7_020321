<template>
    <div id="container">
        <form>
            <router-link to="/login">Se connecter</router-link><br>
            
            <label><b>Adresse email</b></label>
            <input type="text" placeholder="Votre adresse email" name="email" required v-model="email">

            <label><b>Pseudo</b></label>
            <input type="text" placeholder="Votre Pseudo" name="username" required v-model="username">

            <label><b>Mot de passe</b></label>
            <input type="password" placeholder="Votre Mot de passe" name="password" required v-model="password">

            <label><b>Description</b></label>
            <textarea name="description" rows="5" cols="33" v-model="description"></textarea>

            <v-file-input truncate-length="15" v-model="image"></v-file-input>

            <input type="submit" id='submit' value="S'inscrire" @click.prevent="userSignup">        
        </form>    
    </div>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
        userSignup() {
            axios.post('http://localhost:3000/api/users/signup', {
                email: this.email,
                username: this.username,
                password: this.password,
                description: this.description,
                image: this.image
            })
            .then(response => {
                console.log(response);
                window.location.href='/login'
            })
            .catch(error => console.log(error));
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
    background-color: #53af57;
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
    color: #53af57;
    border: 1px solid #53af57;
}

</style>