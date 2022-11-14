













import  axios  from 'axios';
export const loginCall= async (userCrendentials,dispatch)=>{
    dispatch({type: "LOGIN_START"});
    try{
        let res=await  axios.post("http://localhost:8080/auth/login", userCrendentials)
        dispatch({ type:"LOGIN_SUCCESS", payload: res.data })
    }catch (err){
        dispatch({type:"LOGIN_FALIURE",payload: err})
    }
}