import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import   "./Register.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";
import jwt_decode from 'jwt-decode';

function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
      });

      
    const [error, setError] = useState('');

    const [isValid, setIsValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate();

    const validatePassword = password => {
        if (password.length < 8) {
          setIsValid(false);
        } else if (!/\d/.test(password)) {
          setIsValid(false);
        } else if (!/[^A-Za-z0-9]/.test(password)) {
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      };

      const toggleShowPassword = () => {
        setShowPassword(!showPassword); 
      }

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    function handleLogin(e) {
       e.preventDefault();
      axios
        .post("login", userData, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then((res) => {
          console.log(res.data);
          window.localStorage.setItem("auth_token", res.data.access_token);
       
          if (res.data.success === false) {
           alert("Neuspesan login!");
           
          } else {
            navigate("/homePage");
          }
        })
        .catch((e) => console.log(e));
    }
  return (
    <div className='wrapper'>
    <div className='loginForm'>
            <h2>Login</h2>
            
            <form onSubmit={handleLogin} >
         
                <input 
                    type="email"
                    name="email" 
                    value={userData.email} 
                    onChange={(e) => handleChange(e)} 
                    placeholder="Email" 
                    required 
                />
               
                <div className="input-container">
         <input 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    value={userData.password} 
                    onChange={(e) => {
                        handleChange(e);
                        validatePassword(e.target.value);
                    }} 
                    placeholder="Password" 
                    required 
                />
                <span className="input-icon" onClick={toggleShowPassword}>
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
                </div>
                <button type="submit">Login</button>
            </form>
            <div className='register-link'>
           <p><a href='/register'>Napravite novi nalog</a></p> 
            </div>
        </div>
      
        </div>
  )
}

export default Login