module.exports = {
	name: 'play',
	description: 'play a happy little sound file.',
	async execute(msg) {
        const dispatcher = connection.playFile('/home/ubuntu/tada.mp3');
    }
}