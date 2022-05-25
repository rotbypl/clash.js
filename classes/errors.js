class NoTokenError extends Error {
    constructor (message) {
        super(message);
        this.name = "NoTokenError";
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

module.exports = { NoTokenError, InvalidAuthorizationError, InvalidArgumentError };
