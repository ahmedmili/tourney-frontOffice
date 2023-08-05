
function setUserCredentials(user,token) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user.id.toString());
    localStorage.setItem('user', JSON.stringify(user));
}
function unsetUserCredentials() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
}

function setUserToken(token){
    localStorage.setItem('token',token)
}
function getUserToken() {
    return localStorage.getItem('token')
}
function getUser() {
    return localStorage.getItem('user')
}
function getUserId() {
    return localStorage.getItem('userId')
}



export const localStorageService = {
    setUserCredentials,
    unsetUserCredentials,
    setUserToken,
    getUserToken,
    getUser,
    getUserId,
};
