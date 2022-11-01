import Header from "./Header";
import './Login.css';
import { useState } from "react";

const users = require('./users.json');
const Login = ({setIsLoggedIn}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const getLogin = (e) => {
        if(!username || !password){
            alert('please provide a valid username and password')
            return;
        }

        const userCheck = users.find(user => user.username === username);
        if(!userCheck){
            alert('No user found with Username:username');
            return;
        }

        if(password === userCheck.password){
            localStorage.setItem('username', username)
            setIsLoggedIn(true);
            return;
        }

        alert('invalid password');
        
        
    }

    return (
        <>
        {/* <Header/> */}
        <div className="login-page-container">
           
            <div className="login-content">
                <div className="login-form">
                <h1 className="login-label">Login</h1>
                <input onChange={e => setUsername(e.target.value)} placeholder='Username' type="text" />
                <input onChange={e => setPassword(e.target.value)} placeholder='Password' type="password" />
                <span onClick={getLogin} className="login-btn">Login</span>
                <span className="to-register">Dont Have a account? Register</span>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default Login;