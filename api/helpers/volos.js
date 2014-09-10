module.exports.passwordCheck = passwordCheck;

function passwordCheck(username, password, cb) {
    // Implement as necessary
    var passwordOk = (username === 'scott' && password === 'apigee');
    cb(null, passwordOk);
}