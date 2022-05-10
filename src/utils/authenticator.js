// const server_type = process.env.TARGET_SERVER;

var server_url = ""
// if(server_type === "prod"){
//   server_url = "https://organizerserver.azurewebsites.net/"
// }else if(server_type === "local"){
//   server_url = "https://localhost:44353"
// }else{
//   console.warn(`server type is ${server_type}`)
// }
// console.log(`Build (${server_type})  for ${server_url}`);

// console.log(`node env: ${process.env.NODE_ENV}`)
// console.log(`node env my: ${process.env.TARGET_SERVER}`)

if(process.env.NODE_ENV === "production"){
  server_url = "https://organizerserver.azurewebsites.net/"
}else if(process.env.NODE_ENV  === "development"){
  server_url = "https://localhost:44353"
}else{
  server_url = "https://localhost:44353"
  console.warn(`Build for (${process.env.NODE_ENV}) not recognized, url: ${server_url}`)
}
console.log(`Build for (${process.env.NODE_ENV}), url: ${server_url}`);

function validateEmail (email) {
  let re = /\S+@\S+\.\S+/
  return re.test(email)
}

//TODO in UI this not show, need add dialogue
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
  localStorage.removeItem('wl');          //widget list
}


export {auth_user_check, loginSend, registerSend, validateEmail, auth_user_logout}