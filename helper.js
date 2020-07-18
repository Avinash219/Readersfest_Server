const crypto = require("crypto");

module.exports = {
    setPassword: async (password) => {
        const salt = await crypto.randomBytes(16).toString("hex");

        const hash = await crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

        return {
            salt,
            hash
        }
    },

    validatePassword: (password, hashedPasword, salt) => {
        return new Promise(function (resolve, reject) {
            const hash =  crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
            resolve(hash === hashedPasword)
        })
    }
}