<template>
    <div id="container">
        <form @submit.prevent="createMessage">
            <v-text-field color="purple darken-2" label="Titre" id="title" v-model="title"></v-text-field>
            <input id="uploadImage" type="file" ref="attachment" @change="uploadImage()">

            <v-container id="textarea" fluid>
                <v-textarea clearable clear-icon="mdi-close-circle" label="Exprimez-vous ..." v-model="content"></v-textarea>
            </v-container>

            <input type="submit" id='submit' value="Publier">
        </form>
    </div>
</template>


<script>
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios';
export default {
    name: 'CreateMessage',
    props: ['title', 'content', 'attachment'],
    data () {
        return {
            messages: null,
            token: null,
            user: null, 
            message: {
                title: null,
                content: null,
                attachment: null
            }
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
                
                axios.post('http://localhost:3000/api/messages', formData, {
                    headers: {
                        Authorization: "Bearer "  + this.token,
                        'Content-Type': 'multipart/form-data'
                    },
                })
                .then(response => {
                    console.log(response);
                    
                    window.location.href='/main';
                    console.log(this.attachment);
                })
                .catch(error => console.log(error));
            } else {
                let formData = new FormData();
                formData.append('title', this.title);
                formData.append('attachment', this.attachment)
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
            
        },
        uploadImage() {
            this.attachment = this.$refs.attachment.files[0];
        }
    }
}
</script>




<style scoped>
#container {
    max-width: 700px;
    margin: 30px auto;
    padding: 20px;
    border: 1px solid #f1f1f1;
    border-radius: 15px;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
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
    border: 1px solid black;
    margin: 20px auto;
    text-align: center;
}
</style>