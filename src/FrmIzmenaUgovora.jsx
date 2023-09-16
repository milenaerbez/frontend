import React from 'react'
import { useState,useEffect } from 'react';
import axios from "axios";
import "./FrmIzmenaUgovora.css";

function FrmIzmenaUgovora() {

    const [ugovori, setUgovori] = useState([]);
    const [selektovanUgovor, setSelektovanUgovor] = useState(null);
    const[datum,setDatum]=useState('');
    const[sadrzaj,setSadrzaj]=useState('');
    const[kandidat,setKandidat]=useState('');
    const [stavkeUgovora, setStavkeUgovora] = useState([]);
    const [sadrzajStavke, setSadrzajStavke] = useState('');
    const [selectedUgovorId, setSelectedUgovorId] = useState(null);
    const [deletedStavke, setDeletedStavke] = useState([]);
    const[iDStavke,SetidStavke]=useState('');
    const[zakoni,setZakoni]=useState([]);
    const[clanovi,setClanovi]=useState([]);
    const[zakon,setZakon]=useState('');
    const[clan,setClan]=useState('');
    const[sadrzajDodavanje, setSadrzajDodavanje]=useState('');
    const [noveStavke, setNoveStavke] = useState([]);
    const [kriterijum,setKriterijum]=useState('');


    useEffect(()=>{
      fetchZakone();
    },[]);
    const fetchZakone=async ()=>{
      try{
    const response=await axios.get('/zakon');
    setZakoni(response.data);
    console.log(zakoni);
      }catch(error){
    console.error('Grrska u prikazu zakona',error);
      }
    }
    
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

const pretrazi=async()=>{

 
  try{
   if(kriterijum===''){
    axios.get('/ugovor')
    .then((response) => {
      // prikaz
      setUgovori(response.data);
    })
   }
const response=await axios.get(`/pretraga?jmbg=${kriterijum}`);
setUgovori(response.data);
  }catch(error){
    console.log('error');
  }
}

    useEffect(() => {
        //ucitavanje kandidata
        axios.get('/ugovor')
          .then((response) => {
            // prikaz
            setUgovori(response.data);
          })
          .catch((error) => {
            console.error('Error prikaz ugovora:', error);
          });
      }, []);


      const handleUgovorClick = (ugovor) => {
        console.log(ugovor);
        setSelektovanUgovor(ugovor);
        setSelectedUgovorId(ugovor.id)
      setDatum(ugovor.datum);
      setSadrzaj(ugovor.sadrzaj);
      setKandidat(ugovor.kandidat);
    
      }



      
const addStavka = () => {
  if (iDStavke && clan && zakon && sadrzajDodavanje) {
    const novaStavka = {
      id:iDStavke,
      ugovor_id:selektovanUgovor.id,
      zakonik_id: zakon,
      clan_id: clan,
      sadrzaj: sadrzajDodavanje,
    };

    setNoveStavke([...noveStavke, novaStavka]);
    SetidStavke('');
    //setZakon('');
    //setClan('');
    setSadrzajDodavanje('');
  }
};

const removeStavka = (indexToRemove) => {
  const azurirano = noveStavke.filter((_, index) => index !== indexToRemove);
  setNoveStavke(azurirano);
};

 

      const handleUpdateUgovor = async () => {
        try {
          const updatedUgovor = {
          id:selektovanUgovor.id,
          sadrzaj:sadrzaj,
          };

          const updatedStavke = stavkeUgovora
          .filter((stavka) => stavka.ugovor_id === selektovanUgovor.id)
          .map((stavka) => ({
            id: stavka.id,
            ugovor_id: stavka.ugovor_id, // dodajem ugovor_id zbog primarnog kljuca
            sadrzaj: stavka.sadrzaj,
          }));

         
       
      
          const deletedStavkeFormatted = deletedStavke.map((deletedStavka) => ({
            id: deletedStavka.id,
            ugovor_id: deletedStavka.ugovor_id,
            sadrzaj: deletedStavka.sadrzaj,
          }));
          
          const nove=noveStavke.map((novaStavka)=>({
            id:novaStavka.id ,
            ugovor_id: novaStavka.ugovor_id,
            sadrzaj: novaStavka.sadrzaj,
            clan_id: novaStavka.clan_id,
            zakonik_id: novaStavka.zakonik_id,
          
            

          }));

          
          const data = {
            ugovor: updatedUgovor,
            stavke: updatedStavke,
            deletedStavke: deletedStavkeFormatted,
            addedStavke:nove
        
          };
          
      console.log(data);
          ///put obavezno
       const response=   await axios.put(`/ugovor/${selektovanUgovor.id}`, data);

          // alert('Uspesno: 'response.data.message);
          if(response.status===201){
            alert('Uspesno'+ response.data.message);
          }
        setSelektovanUgovor(null);
        axios.get('/ugovor')
        .then((response) => {
          // prikaz
          setUgovori(response.data);
        })
        .catch((error) => {
          console.error('Error prikaz ugovora:', error);
        });
        } catch (error) {
          console.error('Error updating Ugovor:', error);
        }
      };


      useEffect(() => {
        
        fetchStavkeForSelectedUgovor(selectedUgovorId);
      }, [selectedUgovorId]);


      const fetchStavkeForSelectedUgovor = async (selectedUgovorId) => {
        try {
          if (selectedUgovorId) {
            const response = await axios.get(`/stavke?selectedUgovorId=${selectedUgovorId}`);
            setStavkeUgovora(response.data);
          } else {
            setStavkeUgovora([]);
          }
        } catch (error) {
          console.error('Error fetching Stavke Ugovora:', error);
        }
      };

      const handleStavkaChange = (e, stavkaId) => {
        const updatedStavke = stavkeUgovora.map((stavka) => {
          if (stavka.id === stavkaId  && stavka.ugovor_id === selektovanUgovor.id) {
            return { ...stavka, sadrzaj: e.target.value };
          }
          return stavka;
        });
      
        setStavkeUgovora(updatedStavke);
      };

      const handleCheckboxChange = (stavka) => {
       
        if (deletedStavke.some((s) => s.id === stavka.id)) {
          // Remove the stavka from deletedStavke if already selected
          setDeletedStavke(deletedStavke.filter((s) => s.id !== stavka.id));
        } else {
         
          setDeletedStavke([...deletedStavke, stavka]);
        }
      };

  return (
    <div className='izmena-container'>
      <div className='pretraga-div'>
       
        <input type='text' placeholder='Unesi jmbg kandidata..'value={kriterijum} onChange={(e)=>setKriterijum(e.target.value)}></input>
        <button type="button" onClick={pretrazi}>Pretrazi</button>
      </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Datum</th>
          <th>Sadrzaj</th>
          <th>Kandidat </th>
          <th>Broj stavki</th>
         
        </tr>
      </thead>
      <tbody>
      {ugovori.map((ugovor) => (
          <tr
            key={ugovor.id}
            onClick={() => handleUgovorClick(ugovor)}
              className={selektovanUgovor?.id === ugovor.id ? 'selected' : ''}
          >
            <td>{ugovor.id}</td>
            <td>{ugovor.datum}</td>
            <td>{ugovor.sadrzaj}</td>
            <td>{ugovor.kandidat.Ime}</td>
            <td>{ugovor.stavke_count}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
    {selektovanUgovor &&(
      <form >
        <h3>Detalji ugovora</h3>
      <div className='form-row'>
         <div className="form-group">
            <label>Datum:</label>
            <input
              type="text"
              value={datum}
              readOnly
            />
            </div>
            <div className="form-group">
            <label>Kandidat:</label>
            <input
  type="text"
  value={`${kandidat.Ime} ${kandidat.Prezime}`}
  readOnly
  
/>
</div>
</div>
             <div className="form-group">
            <label>Sadrzaj:</label>
            <textarea className='textarea'
              // type="text"
              value={sadrzaj}
              onChange={(e) => setSadrzaj(e.target.value)}
            />
          </div>
         
 



          
          <div>
          
        <h3>Dodavanje stavki</h3>
        <div>
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
<div className='form-row'>
        <div>

          <label>Zakonik:</label>
          <select  onChange={(e)=>setZakon(e.target.value)}   >    
  <option value="">Izaberite pravni osnov</option>
  {zakoni.map((zakon) => (
    <option key={zakon.id} value={zakon.id}>
      {zakon.naziv}
    </option>
  ))}


</select>
        </div>
        <div>
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
        </div>
        <div>
          <label>Sadrzaj Stavke:</label>
          <textarea
            type="text"
           value={sadrzajDodavanje}
           onChange={(e)=>setSadrzajDodavanje(e.target.value)}
          />
        </div>
        <button type="button"  onClick={addStavka}   >
          Dodaj stavku 
        </button>
        <table>
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
          {noveStavke.map((stavka, index) => (
      <tr key={index}>
        <td>{stavka.id}</td>
        <td>{stavka.zakonik_id}</td>
        <td>{stavka.clan_id}</td>
        <td>{stavka.sadrzaj}</td>
        <td>
        <button onClick={() => removeStavka(index)}>Remove</button>
        </td>
      </tr>
    ))}
          </tbody>
        </table>
          </div>
          
      
      </form>
    )

    }   {selektovanUgovor && (
      <div>
        
        <table className='stavke-form'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Zakonik ID</th>
              <th>Clan ID</th>
              <th>Sadrzaj</th>
              <th>Brisanje</th>
            </tr>
          </thead>
          <tbody>
            {stavkeUgovora.map((stavka) => (
              <tr key={stavka.id}>
                <td>{stavka.id}</td>
                <td>{stavka.zakonik.naziv}</td>
                <td>{stavka.clan.sadrzaj}</td>
                <td>
                  <input
                    type="text"
                    value={stavka.sadrzaj}
                    onChange={(e) => handleStavkaChange(e, stavka.id)}
                   
                  />
                </td>
                <td>
                    <input
                      type="checkbox"
                      checked={deletedStavke.some((s) => s.id === stavka.id)}
                      onChange={() => handleCheckboxChange(stavka)}
                    />
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
     <button type="button" onClick={handleUpdateUgovor}>
            Sačuvaj izmenu
          </button>
         
    </div>
  )
}


export default FrmIzmenaUgovora