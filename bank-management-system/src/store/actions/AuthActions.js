
export const signupAction=(userdata)=>dispatch=>{
    dispatch({
        type:"REGISTERED_USER",
        payload:userdata,
    })
}

export const loginAction=(logindata)=>dispatch=>{
    dispatch({
        type:"LOGIN",
        payload:logindata,
    })
}

export const logoutAction=()=>dispatch=>{
    dispatch({
        type:"LOGOUT",
    })
}