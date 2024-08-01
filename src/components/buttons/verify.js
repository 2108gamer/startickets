const { ButtonInteractionEvents, AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, ButtonBuilder, ButtonStyle, TextInputStyle, Interaction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const capschema = require('../../../src/schemas/v1');
const verifyusers = require('../../../src/schemas/v2');
const LeftUsers = require('../../../src/schemas/v3')
const { CaptchaGenerator } = require('captcha-canvas');
const { createCanvas } = require('canvas');
module.exports = {
    customId: 'verify',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        try {

            if (interaction.customId === 'verify') {
     
            if (interaction.guild === null) return;
         
            const verifydata = await capschema.findOne({ Guild: interaction.guild.id });
            const verifyusersdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
         
                if (!verifydata) return await interaction.reply({ content: `The **verification system** has been disabled in this server!`, ephemeral: true});
         
                if (verifydata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: 'You have **already** been verified!', ephemeral: true});
         
                    // let letter = ['0','1','2','3','4','5','6','7','8','9','a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','f','F','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z',]
                    // let result = Math.floor(Math.random() * letter.length);
                    // let result2 = Math.floor(Math.random() * letter.length);
                    // let result3 = Math.floor(Math.random() * letter.length);
                    // let result4 = Math.floor(Math.random() * letter.length);
                    // let result5 = Math.floor(Math.random() * letter.length);
         
                    // const cap = letter[result] + letter[result2] + letter[result3] + letter[result4] + letter[result5];
         
                    // const captcha = new CaptchaGenerator()
                    // .setDimension(150, 450)
                    // .setCaptcha({ font: "Calibri", text: `${cap}`, size: 60, color: "red"})
                    // .setDecoy({ opacity: 0.5 })
                    // .setTrace({ color: "red" })
         
                    // const buffer = captcha.generateSync();
         
                    // const verifyattachment = new AttachmentBuilder(buffer, { name: `captcha.png`});
    
                    // Function to generate a random string for the captcha
    
    function generateCaptcha(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < length; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return captcha;
    }
    
    // Function to generate the captcha image
    async function generateCaptchaImage(text) {
        const canvas = createCanvas(450,150);
        const ctx = canvas.getContext('2d');
    
        // Background Color
        // ctx.fillStyle = '#FFFFFF';
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // TextColor
        ctx.fillStyle = '#FF0000'; // Red Color
        ctx.font = 'bold 100px Arial'; // first is the bold, px is the size of the text, and Arial is the text Type.
        ctx.textAlign = 'center'; // Center the text horizontally
        ctx.textBaseline = 'middle'; // Center the text vertically
        ctx.fillText(text, canvas.width / 2, canvas.height / 2); // Place the text in the center of the canvas
    
        return canvas.toBuffer();
    }
    
    // Example of how you could use the functions
    const captchaText = generateCaptcha(5); // Generate a captcha with a length of 5 characters
    generateCaptchaImage(captchaText)
        .then(async (buffer) => {
            const attachment = new AttachmentBuilder(buffer, { name: `captcha.png`});
            const verifyembed = new EmbedBuilder()
            .setColor('Green')
            .setAuthor({ name: `✅ Proceso de verificación`})
            .setFooter({ text: `✅ Captcha de verificación`})
            .setTimestamp()
            .setImage('attachment://captcha.png')
            .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081199958704791552/largegreen.png')
            .setTitle('> Verification Step: Captcha')
            .setDescription(`• Verificar valor:\n> Utilice el botón a continuación para \n> enviar su captcha.`)
         
                    const verifybutton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel('✅ Introduzca captcha')
                        .setStyle(ButtonStyle.Success)
                        .setCustomId('captchaenter')
                    )
    
                    await interaction.reply({ embeds: [verifyembed], components: [verifybutton], files: [attachment], ephemeral: true });
         
                    if (verifyusersdata) {
         
                        await verifyusers.deleteMany({
                            Guild: interaction.guild.id,
                            User: interaction.user.id
                        })
         
                        await verifyusers.create ({
                            Guild: interaction.guild.id,
                            User: interaction.user.id,
                            Key: captchaText
                        })
         
                    } else {
         
                        await verifyusers.create ({
                            Guild: interaction.guild.id,
                            User: interaction.user.id,
                            Key: captchaText
                        })
         
                    }
        })
        .catch(error => {
            console.error('Se produjo un error al generar el captcha.:', error);
        });
         
                } else if (interaction.customId === 'captchaenter') {
    
                    const vermodal = new ModalBuilder()
                        .setTitle(`Verification`)
                        .setCustomId('vermodal')
             
                        const answer = new TextInputBuilder()
                        .setCustomId('answer')
                        .setRequired(true)
                        .setLabel(`• Por favor envíe su código Captcha`)
                        .setPlaceholder(`Entrada de tu código captcha`)
                        .setStyle(TextInputStyle.Short)
             
                        const vermodalrow = new ActionRowBuilder().addComponents(answer);
                        vermodal.addComponents(vermodalrow);
        
                    await interaction.showModal(vermodal);
    
                } else if (interaction.customId === 'vermodal') {
    
                    if (!interaction.isModalSubmit()) return;
             
                    const userverdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
                    const verificationdata = await capschema.findOne({ Guild: interaction.guild.id });
             
                    if (verificationdata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: `**Ya** has verificado en este servidor!`, ephemeral: true});
             
                    const modalanswer = interaction.fields.getTextInputValue('answer');
                    if (modalanswer === userverdata.Key) {
             
                        const verrole = interaction.guild.roles.cache.get(verificationdata.Role);
             
                        try {
                            await interaction.member.roles.add(verrole);
                        } catch (err) {
                            return await interaction.reply({ content: `Hubo un **problema** al otorgarle el rol **<@&${verificationdata.Role}>**. Vuelva a intentarlo más tarde.!`, ephemeral: true})
                        }
             
                        await capschema.updateOne({ Guild: interaction.guild.id }, { $push: { Verified: interaction.user.id }});
                        const channelLog = interaction.guild.channels.cache.get("Your Channel ID");
                        if (!channelLog) {
                            await interaction.reply({ content: '¡Has sido **verificado!**', ephemeral: true});
                            return;
                        } else {
                         const channelLogEmbed = new EmbedBuilder()
                         .setColor(`Green`)
                         .setTitle('⚠️ Someone verified to the server! ⚠️')
                         .setDescription(`<@${interaction.user.id}> Is been verified to the server!`)
                         .setTimestamp()
                         .setFooter({ text: `Verified Logs` })
    
                         await channelLog.send({ embeds: [channelLogEmbed] });
                         await interaction.reply({ content: 'You have been **verified!**', ephemeral: true});
                        }
             
                    } else {
                        const channelLog = interaction.guild.channels.cache.get("Your Channel ID");
                        if (!channelLog) { 
                            await interaction.reply({ content: `**Oops!** It looks like you **didn't** enter the valid **captcha code**!`, ephemeral: true})
                            return;
                        } else {
                         const channelLogEmbed = new EmbedBuilder()
                         .setColor(`Red`)
                         .setTitle('⚠️ Watch out for a wrong verify attempt! ⚠️')
                         .setDescription(`<@${interaction.user.id}> Tries a code from the captcha but he failed, It was the wrong one, Take a look at the person maybe he has troubles when entering the code.\n\nMaybe its a bot so keep a eye on him!`)
                         .setTimestamp()
                         .setFooter({ text: `Verified Logs` })
    
                         await channelLog.send({ embeds: [channelLogEmbed] });
                         await interaction.reply({ content: `**Oops!** It looks like you **didn't** enter the valid **captcha code**!`, ephemeral: true})
                        }
                    }
    
                }
    
                } catch (err) {
                    console.error(err)
                }  

    }
};