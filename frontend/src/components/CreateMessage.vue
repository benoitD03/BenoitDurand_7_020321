<template>
    <div id="container">
        <form @submit.prevent="createMessage">
            <v-text-field
              color="purple darken-2"
              label="Titre"
              id="title"
              v-model="title"
            ></v-text-field>

            <v-file-input id="file" truncate-length="15" v-model="attachment"></v-file-input>

            <v-container id="textarea" fluid>
                <v-textarea
                clearable
                clear-icon="mdi-close-circle"
                label="Exprimez-vous ..."
                v-model="content"
                ></v-textarea>
            </v-container>

            <input type="submit" id='submit' value="Envoyer">
        </form>
    </div>
</template>


<script>
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios';
export default {
    name: 'CreateMessage',
    data () {
        return {
            messages: null,
            token: null,
            title: null,
            attachment: null,
            content: null,
            user: null 
        }
    },
    methods: {
        createMessage() {
            this.token = localStorage.getItem("token");
            this.user =VueJwtDecode.decode(this.token);
            if (this.attachment == null) {
                let formData = new FormData();
                formData.append('title', this.title);
                formData.append('content', this.content);
                console.log(this.content);
                console.log(this.title);
                
                axios.post('http://localhost:3000/api/messages', formData, {
                    headers: {
                        Authorization: "Bearer "  + this.token,
                        'Content-Type': 'multipart/form-data'
                    },
                })
                .then(response => {
                    console.log(response);
                    window.location.href='/main';
                })
                .catch(error => console.log(error));
            } else {
                let formData = new FormData();
                formData.append('title', this.title);
                formData.append('attachment', this.attachment);
                formData.append('content', this.content);
                

                axios.post('http://localhost:3000/api/messages', formData, {
                    headers: {
                        Authorization: "Bearer "  + this.token,
                        'Content-Type': 'multipart/form-data'
                    },

                })
                .then(response => {
                    console.log(response);
                    window.location.href='/main';
                })
                .catch(error => console.log(error));
            }
            
        }
    }
}
</script>




<style scoped>
#container {
    max-width: 700px;
    margin: 30px auto;
    border: 2px solid black;
    padding: 20px;
    border-radius: 5px;
}
input[type=submit] {
    background-color: #26c6da;
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
    color: #26c6da;
    border: 1px solid #26c6da;
}
</style>