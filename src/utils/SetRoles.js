/**
 * @mudule SetRoles
 * @param ClientDiscord
 * @return {Objet} client with roles set
 */
module.exports = (client) => {
   const Roles = [
        {
            name: "THE EXILE",
            description: "L'exilé de la solo q",
            authorization: 10
        },
        {
            name: "Administrator",
            description: "Dictateur du serveur",
            authorization: 10
        },
        {
            name: "the master of balec",
            description: "l'exilé de la solo q",
            authorization: 10
        },
        {
            name: "The kulbutoké",
            description: "Le meilleur pokemon",
            authorization: 10
        },
        {
            name: "the strength of yggdrasil",
            description: "Le plus fort du serveur",
            authorization: 6
        },
        {
            name: "The Miro",
            description: "Un oublier",
            authorization: 5
        },
        {
            name: "Dj",
            description: "GO GO la music",
            authorization: 10
        },
        {
            name: "Princesse",
            description: "Une princesse !!",
            authorization: 10
        },
        {
            name: "@everyone",
            description: "Mr tout le monde",
            authorization: 10
        },
    ]
    for (i = 0; i < Roles.length; i++) {
        // console.log(Roles[i].authorization)
        client.roles.set(Roles[i].name, Roles[i])
    }
    // console.log(client.roles.get("exilesdfsd").authorization)
}


