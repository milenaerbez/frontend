import React, { useState } from 'react';
import './navBar.css';
import FrmKreirajKandidata from './FrmKreirajKandidata';
import FrmObrisiKandidata from './FrmObrisiKandidata';
import FrmIzmeniKandidata from './FrmIzmeniKandidata';
import FrmKreirajUgovor from './FrmKreirajUgovor';
import FrmObrisiUgovor from './FrmObrisiUgovor';
import FrmIzmenaUgovora from './FrmIzmenaUgovora';
import FrmKreiranjeKorisnika from './FrmKreiranjeKorisnika';
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserPlus } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';



function NavBar() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate=  useNavigate();
  const role = window.sessionStorage.getItem("auth_token");
  const [rola, setRola] =useState(null);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };


  useEffect(() => {
    const token = window.localStorage.getItem('auth_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setRola(decodedToken.role);

    }
  }, []);

  console.log("Role je ", rola);

  function handleLogout(e) {
    var config = {
      method: "post",
      url: "logout",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("auth_token"),
      },
    };
    axios(config).then((res) => {
      console.log(res.data);
      window.localStorage.removeItem("auth_token");

    });
    navigate("/login");
    e.preventDefault();
  }


  const prikaziForme = () => {
    switch (selectedOption) {
      case "kreirajkandidata":
        return <FrmKreirajKandidata />;
      case "izmenikandidata":
        return <FrmIzmeniKandidata />;
      case "obrisikandidata":
        return <FrmObrisiKandidata />;
      case "kreirajugovor":
        return <FrmKreirajUgovor />;
      case "obrisiugovor":
        return <FrmObrisiUgovor />;
      case "izmeniugovor":
        return <FrmIzmenaUgovora />;
        case "kreirajKorisnika":
          return <FrmKreiranjeKorisnika/>
        case "home":
          return null;
      default:
        return null;
    }
  };
  useEffect(() => {
    const token = window.localStorage.getItem("auth_token");
    if (!token || token==="null") {
      navigate("/login");
    }
  });

  return (
    <div className="page-container">
    <div className="navbar-container">
      <div className="menu">
        <div className="menu-content">
          <ul className="menu-buttons">
            <li>
              <button onClick={() => handleOptionChange('home')}>Hello {rola}</button>
              {rola === 'admin' &&(
                  <>
                    <button onClick={() => handleOptionChange('kreirajkandidata')}>Kreiraj Kandidata</button>
                    <button onClick={() => handleOptionChange('izmenikandidata')}>Izmeni Kandidata</button>
                    <button onClick={() => handleOptionChange('obrisikandidata')}>Obriši Kandidata</button>
                    <button onClick={() => handleOptionChange('kreirajugovor')}>Kreiraj Ugovor</button>
                    <button onClick={() => handleOptionChange('obrisiugovor')}>Obriši Ugovor</button>
                    <button onClick={() => handleOptionChange('izmeniugovor')}>Izmeni Ugovor</button>
                    <FaUserPlus color='white' size={20}onClick={ ()=> handleOptionChange('kreirajKorisnika')} cursor={'pointer'} style={{"margin-right":'20px'}}/>
                  </>
                 )} 
                 {rola=== 'user' &&(
                   <>
                     <button onClick={() => handleOptionChange('kreirajkandidata')}>Kreiraj Kandidata</button>
                     <button onClick={() => handleOptionChange('izmenikandidata')}>Izmeni Kandidata</button>
                     <button onClick={() => handleOptionChange('obrisikandidata')}>Obriši Kandidata</button>
                     </>
                )} 
    
              <HiOutlineLogout color='white' size={20} onClick={ handleLogout } cursor={'pointer'} />
           
              
            </li>
          </ul>
        </div>
      </div>
      </div>
    <div className="form-container">{prikaziForme()}</div>
    
    </div>
  );
 
  
  
  
  
}

export default NavBar;