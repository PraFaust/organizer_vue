const server_url = "https://organizerserver.azurewebsites.net/"

function validateEmail (email) {
    let re = /\S+@\S+\.\S+/
    return re.test(email)
  }
  
  function autorizeError () {
    console.log(`autorize server error!!!`)
  }
  
  function registerSend (dataReg, callback) {
    $.ajax({
      url: server_url + '/User/register',
      dataType: 'text',
      method: 'GET',
      cache: false,
      success: callback,
      error: autorizeError,
      data: {'registerData': dataReg}
    })
  }
  
  function loginSend (dataLog, callback) {
    $.ajax({
      url: server_url + '/User/login',
      dataType: 'text',
      method: 'GET',
      cache: false,
      success: callback,
      error: autorizeError,
      data: {'loginData': dataLog}
    })
  }

function auth_user_check(){
    let user = localStorage.getItem('last_user');
    let valid = localStorage.getItem('valid');
    console.log(user);
    if(user === null){
      return false;
    }
    console.log(`_auth_user_check_, valid ${user} = ${valid}...`);
    return valid;
}
function auth_user_logout(){
  console.log(`auth_user_logout...`);
  localStorage.removeItem('last_user');
  localStorage.removeItem('valid');
}


export {auth_user_check, loginSend, registerSend, validateEmail, auth_user_logout}