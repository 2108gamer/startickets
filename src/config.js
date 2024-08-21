module.exports = {
    client: {
        token: "Your Bot token (USE .env FOR SAFETY)",
        id: "Your Bot ID (USE .env FOR SAFETY)",
    },
    handler: {
        prefix: "!",
        deploy: true,
        commands: {
            prefix: true,
            slash: true,
            user: true,
            message: true,
        },
        mongodb: {
            enabled: true,
            uri: "mongodb+srv://star:Radio12@cluster0.aazhqb6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        },
    },
    users: {
        developers: ["758027231955124325", "Another account ID"],
        ownerId: "758027231955124325"
    },
    channels: {
        modLogs: {
            enabled: true,
            channel: "The moderation-logs channel"
        }
    },
    development: { 
        enabled: false,
        guild: "Enter your guild ID here or you can use .env",
    }, 
    messageSettings: {
        nsfwMessage: "Este canal no es para eso.",
        ownerMessage: "Solo tiene permiso el developer",
        developerMessage: "No puedes usar este conando.",
        cooldownMessage: "Podras usar este comando en {cooldown}.", // '{cooldown}' is a variable that shows the time to use the command again (in seconds)
        globalCooldownMessage: "Podras usar este comando en {cooldown}.", // '{cooldown}' is a variable that shows the time to use the command again (in seconds)
        notHasPermissionMessage: "No tienes permisos suficientes.",
        notHasPermissionComponent: "No.",
        missingDevIDsMessage: "Solo es para developers este comando."
    }
};
