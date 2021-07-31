const headers = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
    return next();
}

module.exports = headers;



//!    Example layout for middleware
// TODO                             Headers
// TODO                           Middleware
// TODO   POSTMAN --> SERVER INDEX     -->    USER CONTROLLER --> ENDPOINT --> SEND RESPONSE 