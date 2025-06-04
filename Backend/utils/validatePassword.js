
//validate password, password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
module.exports = validatePassword;
