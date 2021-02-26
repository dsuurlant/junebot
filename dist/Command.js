"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    /**
     * Check if given message is a valid command.
     * @param message
     */
    static isCommand(message) {
        const lowercase = message.toLowerCase();
        return message.startsWith('june') || message.startsWith('j!');
    }
    ;
}
exports.default = new Command();
//# sourceMappingURL=Command.js.map