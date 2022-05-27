class ClientError extends Error {
    constructor (message) {
        super(message);
        this.name = "ClientError"
    }
}

class InvalidAuthorizationError extends Error {
    constructor (message) {
        super(message);
        this.name = "InvalidAuthorizationError";
    }
}

class InvalidArgumentError extends Error {
    constructor (message) {
        super(message);
        this.name = "InvalidArgumentError";
    }
}

module.exports = { ClientError, InvalidAuthorizationError, InvalidArgumentError };