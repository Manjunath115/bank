
export const initialDeposite=(initialAmount)=>dispatch=>{
    // console.log(initialAmount);
    dispatch({
        type:"SET_INITIAL_DEPOSITE",
        payload:initialAmount,
    })
}

export const depositeAmount=(amount)=>dispatch=>{
    // console.log(amount,'in action');
    dispatch({
        type:"DEPOSITE",
        payload:amount,
    })
}