import React, { useState } from 'react';
import './navBar.css';
import FrmKreirajKandidata from './FrmKreirajKandidata';
import FrmObrisiKandidata from './FrmObrisiKandidata';
import FrmIzmeniKandidata from './FrmIzmeniKandidata';
import FrmKreirajUgovor from './FrmKreirajUgovor';
import FrmObrisiUgovor from './FrmObrisiUgovor';
import FrmIzmenaUgovora from './FrmIzmenaUgovora';

function NavBar() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

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
        case "home":
          return null;
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
    <div className="navbar-container">
      <div className="menu">
        <div className="menu-content">
          <ul className="menu-buttons">
            <li>
              <button onClick={() => handleOptionChange('home')}>Početna</button>
              <button onClick={() => handleOptionChange('kreirajkandidata')}>Kreiraj Kandidata</button>
              <button onClick={() => handleOptionChange('izmenikandidata')}>Izmeni Kandidata</button>
              <button onClick={() => handleOptionChange('obrisikandidata')}>Obriši Kandidata</button>
              <button onClick={() => handleOptionChange('kreirajugovor')}>Kreiraj Ugovor</button>
              <button onClick={() => handleOptionChange('obrisiugovor')}>Obriši Ugovor</button>
              <button onClick={() => handleOptionChange('izmeniugovor')}>Izmeni Ugovor</button>
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