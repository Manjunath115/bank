
export const applyLoan=(userdetails)=>dispatch=>{
    dispatch({
        type:"APPLY_LOAN",
        payload:userdetails,
    })
}

export const alreadyApplied=()=>dispatch=>{
    dispatch({
        type:"ALREADY_APPLIED",
    })
}