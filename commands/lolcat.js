const fetch = require('node-fetch');

module.exports = {
    name: 'lolcat',
    description: 'And wear little bow-ties',
    async execute(msg) {
        fetch('https://aws.random.cat/meow')
            .then(res => res.json())
            .then(json => json.split('.')[2])
            .then(json => console.log(json));
    }
};
