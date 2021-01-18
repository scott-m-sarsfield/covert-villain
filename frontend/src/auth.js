let authorizationToken;

const Auth = {
  set(token){
    authorizationToken = token;
    localStorage.setItem('authtoken', token);
  },
  get(){
    return authorizationToken;
  },
  clear(){
    authorizationToken = null;
    localStorage.removeItem('authtoken');
  },
  load(){
    const localToken = localStorage.getItem('authtoken');
    if(localToken){
      authorizationToken = localToken;
    }
  }
}

export default Auth;
