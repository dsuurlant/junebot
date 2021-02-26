class Command {

    /**
     * Check if given message is a valid command.
     * @param message
     */
    public static isCommand(message: string): boolean {
        const lowercase = message.toLowerCase();
        return message.startsWith('june') || message.startsWith('j!');
    };
}

export default new Command()

