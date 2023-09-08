import React, { useState } from 'react';
import './navBar.css';
import FrmKreirajKandidata
 from './FrmKreirajKandidata';
import FrmObrisiKandidata from './FrmObrisiKandidata';
import FrmIzmeniKandidata from './FrmIzmeniKandidata';



function NavBar() {
    const [isKandidatMenuOpen, setKandidatMenuOpen] = useState(false);
    const [isUgovorMenuOpen, setUgovorMenuOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

  const toggleKandidatMenu = () => {
    setKandidatMenuOpen(!isKandidatMenuOpen);
  };

  const toggleUgovorMenu=()=>{
    setUgovorMenuOpen(!isUgovorMenuOpen);
  }

  const handleOptionChange = (option) => {
    setSelectedOption(option); 
  };
  
    const prikaziForme = () => {
        switch (selectedOption) {
          case "kreirajkandidata":
            return < FrmKreirajKandidata/>;
          case "izmenikandidata":
            return < FrmIzmeniKandidata/>;
          case "obrisikandidata":
            return < FrmObrisiKandidata/>;
       
          default:
            return null;
        }
      };

      return (
        <div className="navbar-container">
          <div className="menu">
            <div className="menu-content">
              <ul className="menu-buttons">
                <li>
                  <button onClick={toggleKandidatMenu}>Kandidat</button>
                  <button onClick={toggleUgovorMenu}>Ugovor</button>
                  {isKandidatMenuOpen && (
                    <ul className="submenu">
                      <li>
                        <button onClick={() => handleOptionChange('kreirajkandidata')}>
                          Kreiraj
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleOptionChange('obrisikandidata')}>
                          Obrisi
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleOptionChange('izmenikandidata')}>
                          Izmeni
                        </button>
                      </li>
                    
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="form-container">{prikaziForme()}</div>
        </div>
        
      );
}

export default NavBar