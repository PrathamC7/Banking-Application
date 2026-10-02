import { useContext, useEffect, useState } from "react";
import api from "../services/api"
import { BankingContext } from "../context/BankingContext";
function Login(){
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const {setCustomerBalance} = useContext(BankingContext)
    const handleLogin = async (e)=>{
        e.preventDefault();
        const response =  await api.post("/auth/", {
            email : email,
            password : password
        });
        // const token = response.headers.authorization;
        // sessionStorage.setItem("token" , token)
        // console.log(sessionStorage.getItem("token"));
        // console.log(response)
        setToken(response.headers.authorization);
        // console.log(token);
    }
    useEffect( ()=>{
        if(!token) return;
        const getCustomer = async()=>{ 
            const response = await api.get("/customer/",
                {headers : {
                        "Authorization" : token
                }}
            );
            setCustomerBalance(response.data["balance"])
            // return <h1> "From LOGIN.JSX" {response.data}</h1>
            // return response
        };
        getCustomer();
        
    },[token]);

    return <>
        <form onSubmit={handleLogin}>
            <input type="text" onChange={(e)=>setEmail(e.target.value)} />
            <input type="text"onChange={(e) =>setPassword(e.target.value)} />
            <button type = "submit">submit</button>
            <h1>"token" : {token}</h1>
        </form>
        </>


}
export default Login