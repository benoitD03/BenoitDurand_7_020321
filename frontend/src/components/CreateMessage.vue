<template>
    <div id="container">
        <v-text-field
              color="purple darken-2"
              label="Titre"
              id="title"
        ></v-text-field>

         <v-file-input id="file" truncate-length="15" v-model="image"></v-file-input>

        <v-container id="textarea" fluid>
            <v-textarea
            clearable
            clear-icon="mdi-close-circle"
            label="Exprimez-vous ..."
            ></v-textarea>
        </v-container>

        <input type="submit" id='submit' value="Envoyer">
    </div>
</template>

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