import {React, useState} from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'

function Register({navigation,isCreateUser}) {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        role: "admin",
      });
      const [isValid, setIsValid] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const navigate=useNavigate();

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const validatePassword = password => {
        if (password.length < 8) { //Provera duzine
          setIsValid(false);
        } else if (!/\d/.test(password)) { //Proveravam da li postoji cifra
          setIsValid(false);
        } else if (!/[^A-Za-z0-9]/.test(password)) { //Proveravam da li postoji bilo koji specijalni znak
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      };

      const toggleShowPassword = () => {
        setShowPassword(!showPassword); 
      }

    const handleRegister = (e)=>{
        e.preventDefault();
        console.log("User data: ", userData);
        const emailreg =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailreg.test(userData.email)) {
           alert('Mail adresa nije validna');
            return;
        }
        if(isValid===false){
            alert("Password nije validan");
            return;
        }
        axios
      .post("register", userData)
      .then((res) => {
        console.log(res.data);
        if (
          res.data.email ==
          "The email has already been taken."
        ) {
        alert("Email je zauzet!");
         return;
        }
        
        else {
          setTimeout(function () {
            navigate("/login");
          }, 2500);
        }
      })
      .catch((e) => console.log(e));
  }
    
  

 
  return (
    <div className='wrapper'>
    <div className='registerForm'>
    <h2>Registracija</h2>
    
    <form  onSubmit={handleRegister}>
    <input className='input'
            type="name" 
            name="name"
            value={userData.name} 
            onChange={handleChange} 
            placeholder="Name" 
            required 
        />
        <input className='input'
            type="email" 
            name="email"
            value={userData.email} 
            onChange={value=>{
            handleChange(value);
            }} 
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
        <button type="submit" >Register</button>
        <div className='link'>
       <p> <a href="/login">Imate profil? Prijavite se</a> </p>
        </div>
    </form>
</div>
</div>
  )
}

export default Register