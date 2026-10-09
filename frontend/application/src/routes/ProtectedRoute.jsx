import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import {Navigate} from 'react-router-dom'


function ProtectedRoute({children}) {

    const {isAuthenticated} = useContext(AuthContext)
    if(isAuthenticated == null){
        return <h1>CHECKING AUTHENTICATION .....</h1>
    }
    if(!isAuthenticated){
        return <Navigate to = "/login" replace/>
    }

    return children;
}

export default ProtectedRoute