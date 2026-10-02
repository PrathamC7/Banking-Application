import { useEffect, useState } from "react";


function Customer(){
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setTimeout(()=>{
            setCustomer({name : "Pratham", balance : 2500});
            setLoading(false);
        },2000);
    },[]);
    if(loading){
        return <h1>THE PAGE IS LOADING .....</h1>
    }
    if(error){
        return <h1>SOMETHING WENT WRONG.....</h1>
    }
    return <>
            <h1>HELLO, {customer.name}</h1>
            <h1>Your Balance is {customer.balance}</h1>
        </>
}
export default Customer;