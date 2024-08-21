const { ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const { options } = require('superagent');

module.exports = {
    customId: 'btns',
    options: {
        public: true
    },
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.message.delete()
        await interaction.showModal(
            {
                custom_id: 'skm',
                title: 'Nick',
                components: [{
                    type: 1,
                    components: [{
                        type: 4,
                        custom_id: 'nick',
                        label: 'Nick del usuario?',
                        max_length: 15,
                        min_length: 2,
                        placeholder: 'Nick en minecraft!',
                        style: 1,
                        required: true
                    }]
                }]
            }
        )

    }
};