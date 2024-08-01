const { Message } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

module.exports = {
    structure: {
        name: 'api',
        description: 'comando para test de la api',
        aliases: [],
        permissions: null
    },

    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        const link = "http://localhost:3000/upload";
        const filePath = path.join(__dirname, 'ticket.html'); // Asegúrate de que el archivo esté en la misma carpeta

        // Crear una instancia de FormData
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));

        try {
            const response = await axios.post(link, form, {
                headers: {
                    ...form.getHeaders()
                }
            });
            console.log('Respuesta de la API:', response.data);
        } catch (error) {
            console.error('Error al enviar el archivo:', error);
        }
    }
};