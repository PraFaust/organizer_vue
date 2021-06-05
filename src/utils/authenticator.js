var user = new Object();

function auth_user_check(user, valid){
    user.valid = false;
    console.log(`_auth_user_check_, ${user}, ${pass}...`);
    return user.valid;
}

export {auth_user_check}