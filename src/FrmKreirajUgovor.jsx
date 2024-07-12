import React, { useState,useEffect } from 'react'
import axios from 'axios';
import  './FrmKreirajUgovor.css';

function FrmKreirajUgovor() {

const[datum,setDatum]=useState('');
const[sadrzajUgovora,setSadrzajUgovora]=useState('');
const[kandidat,setKandidat]=useState('');
const[zakoni,setZakoni]=useState([]);
const[clanovi,setClanovi]=useState([]);
const[zakon,setZakon]=useState('');
const[kandidati,setKandidati]=useState([]);
const[clan,setClan]=useState('');
const[sadrzajStavke, setSadrzajStavke]=useState('');
const [stavkeUgovora, setStavkeUgovora] = useState([]);
const[iDStavke,SetidStavke]=useState('');

const UgovorData={
  datum: datum,
  sadrzaj: sadrzajUgovora,
  kandidat_id:kandidat
}

const stavkeData = stavkeUgovora.map((stavka) => {
  return {
    ID: stavka.ID,
    zakonik_id: stavka.zakonik_id,
    clan_id: stavka.clan_id,
    sadrzaj: stavka.sadrzaj,
  };
});

const requestData = {
  ugovor: UgovorData,
  stavke: stavkeData,
};

const saveUgovorAndStavke = async (e) => {
  e.preventDefault();

  const authToken = window.localStorage.getItem('auth_token');

  try {
    const response = await axios.post('/ugovor', requestData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'     
      }
    });

    if (response.status === 201) {
      alert('Uspesno: ' + response.data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    if (error.response) {
      alert('Neuspesno: ' + error.response.data.message);
    } else {
      alert('Neuspesno: Doslo je do greske prilikom slanja zahteva.');
    }
  }
};

 



const addStavka = () => {
  if (iDStavke && clan && zakon && sadrzajStavke) {
    const novaStavka = {
      ID:iDStavke,
      zakonik_id: zakon,
      clan_id: clan,
      sadrzaj: sadrzajStavke,
    };
console.log(novaStavka);
    setStavkeUgovora([...stavkeUgovora, novaStavka]);
    SetidStavke('');
    //setZakon('');
    //setClan('');
    setSadrzajStavke('');
  }
};

useEffect(() => {
   
   
  fetchKandidati();
}, []);

useEffect(()=>{
  fetchZakone();
}, []);

useEffect(()=>{
  if(zakon){ fetchClanove(zakon);}
 
},[zakon]
)

const fetchClanove=async(zakonikId)=>{
try{
  const response=await axios.get(`/clanZakona?zakonikId=${zakonikId}`);
  setClanovi(response.data);


}catch(error){
  console.error('Grrska u prikazu clanova',error);
}
}


const fetchZakone=async ()=>{
  try{
const response=await axios.get('/zakon');
setZakoni(response.data);
console.log(zakoni);
  }catch(error){
console.error('Grrska u prikazu zakona',error);
  }
}

const fetchKandidati=async ()=>{
  try {
    const response = await axios.get('/kandidat');
    setKandidati(response.data);
  } catch (error) {
    console.error('Error kod prikaza Kandidata:', error);
  }
}

const removeStavka = (indexToRemove) => {
  const updatedStavke = stavkeUgovora.filter((_, index) => index !== indexToRemove);
  setStavkeUgovora(updatedStavke);
};

  return (
    <div className='container-ugovor'>
      {/* <h3>Kreiranje ugovora</h3> */}
      <form className='forma-ugovor'>
   
        <div className='form-row'>
      <div className='form-group'>
        <label>Datum:</label>
        <input type="date" value={datum} onChange={(e)=>setDatum(e.target.value)}  required/>
      </div>
      <div className='form-group'>
        <label>Kandidat:</label>
        <select className='combobox' onChange={(e)=>setKandidat(e.target.value)} >
          <option value="">Izaberite kandidata</option>
          {kandidati.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
             {`${candidate.Ime} ${candidate.Prezime}`}
            </option>
          ))}
           
        
        </select>
      </div>
      </div>
      <div className='form-group'>
        <label>Sadrzaj:</label>
        <textarea value={sadrzajUgovora} onChange={(e)=>setSadrzajUgovora(e.target.value)}/>
      </div>
      </form>
      <div>
      <hr />
      <div className="stavke-container">
        <form className='stavke-form'>
        <h3>Stavke Ugovora</h3>
        <div className='stavke-group'>
  <label>ID Stavke:</label>
  <input
    type="number"   
    value={iDStavke}
    onChange={(e) => {
      SetidStavke(parseInt(e.target.value, 10));
    }}
    min="1"         
    step="1"       
    required        
  />
</div>
        <div className='stavke-group'>
          <label>Zakonik:</label>
          <select    onChange={(e)=>setZakon(e.target.value)}>    
  <option value="">Izaberite pravni osnov</option>
  {zakoni.map((zakon) => (
    <option key={zakon.id} value={zakon.id}>
      {zakon.naziv}
    </option>
  ))}
</select>
        </div>
        <div className='stavke-group'>
          <label>Clan</label>
          <select onChange={(e)=>setClan(e.target.value)}>
            <option value="">Izaberite clan</option>
            {clanovi.map((clan)=>(
              <option key={clan.id} value={clan.id}>
                {clan.sadrzaj}
              </option>
            ))}
          </select>
        </div>
        <div className='stavke-group'>
          <label>Sadrzaj Stavke:</label>
          <textarea
            type="text"
           value={sadrzajStavke}
           onChange={(e)=>setSadrzajStavke(e.target.value)}
          />
        </div>
        <div className='dugme'>
        <button type="button" onClick={addStavka} >
          Dodaj stavku 
        </button>
        <span className='button-separator'></span>
        <button type="button" onClick={saveUgovorAndStavke}>Kreiraj Ugovor</button>
        </div>
        </form>
       
        
        <div className="table-container">
        <table className='custom-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Zakonik ID</th>
              <th>Clan ID</th>
              <th>Sadrzaj</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {stavkeUgovora.map((stavka, index) => (
      <tr key={index}>
        <td>{stavka.ID}</td>
        <td>{stavka.zakonik_id}</td>
        <td>{stavka.clan_id}</td>
        <td>{stavka.sadrzaj}</td>
        <td>
        <button  onClick={() => removeStavka(index)}>Remove</button>
        </td>
      </tr>
    ))}
          </tbody>
        </table>
      
        </div>
        
        </div>
        
      </div>
      
    


    
    </div>
  )
}

export default FrmKreirajUgovor