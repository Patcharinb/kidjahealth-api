module.exports = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw Error;
};
