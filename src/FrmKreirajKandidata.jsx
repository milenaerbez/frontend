import React,{useState,useEffect} from 'react';
import "./KreirajKandidata.css";
import axios from 'axios'; 


function FrmKreirajKandidata() {
  
 const [drzave, setDrzave] = useState([]);
 const [selectedDrzava, setSelectedDrzava] = useState("");

 const [gradovi, setGradovi] = useState([]);
 const [selectedGrad, setSelectedGrad]=useState("");

 const[adrese, setAdrese]=useState([]);
 const [selectedAdresa, setSelectedAdresa]=useState("");

 const [ime, setIme] = useState("");
const [prezime, setPrezime] = useState("");
const [jmbg, setJmbg] = useState("");
const [zvanje, setZvanje] = useState("");
const [kucniBroj, setKucniBroj] = useState("");

  useEffect(() => {
   
   
    fetchDrzave();
  }, []);

  useEffect(() => {
    if (selectedDrzava) {
      fetchGradovi(selectedDrzava);
    }
  }, [selectedDrzava]);

useEffect(()=>{
  if(selectedGrad){
fetchAdrese(selectedGrad);
  }
},[selectedGrad]);


const fetchAdrese = async(gradId)=>{
  try {
    const response = await axios.get(`/adrese?gradId=${gradId}`);
    setAdrese(response.data);
  } catch (error) {
    console.error('Error fetching Adrese:', error);
  } 
}
  const fetchDrzave = async () => {
    try {
      const response = await axios.get('/drzave');
      setDrzave(response.data);
    } catch (error) {
      console.error('Error fetching Drzave:', error);
    }
  }

  const fetchGradovi = async (drzavaId) => {
    try {
      const response = await axios.get(`/gradovi?drzavaId=${drzavaId}`);
      setGradovi(response.data);
    } catch (error) {
      console.error('Error fetching Gradovi:', error);
    }
  };

//cuvanje kandidata

const kandidatData = {
  Ime: ime,
  Prezime: prezime,
  JMBG: jmbg,
  Zvanje: zvanje,
  adresa_id: selectedAdresa,
  grad_id: selectedGrad,
  drzava_id: selectedDrzava,
  kucniBroj: kucniBroj,
  
 
};
const handleSacuvajClick = async () => {
  try {

    const response= await axios.post('/kandidat', kandidatData);
if(response.status===201){
  alert('Uspesno '+response.data.message);
}
  
  
    setIme("");
    setPrezime("");
    setJmbg("");
    setZvanje("");
    setKucniBroj("");
    
  } catch (error) {
    alert('Error kod cuvanja Kandidata',kandidatData, error);
  }
};



  return (
    <div className="container-kandidat">
      <h2>Kreiranje Kandidata</h2>
      <form>
        <div className='form-row'>
        <div className="form-group">
          <label>Ime:</label>
          <input
            type="text"   value={ime}
            onChange={(e) => setIme(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Prezime:</label>
          <input type="text"   value={prezime}
  onChange={(e) => setPrezime(e.target.value)}
  required  />
</div>
        </div>
        <div className='form-row'>
        <div className="form-group">
          <label>JMBG:</label>
          <input type="text"  value={jmbg}
  onChange={(e) => setJmbg(e.target.value)} 
  required />
        </div>
       
        <div className="form-group">
          <label>Kontakt:</label>
          <input type="text"   value={zvanje}
  onChange={(e) => setZvanje(e.target.value)}
  required
  />
        </div>
        </div>
        <div className='form-row'>
        <div className="form-group">
          <label>Drzava:</label>
          
          <select onChange={(e) => setSelectedDrzava(e.target.value)}>
          <option value="">Izaberite drzavu</option>
            {drzave.map((drzava) => (
              <option key={drzava.id} value={drzava.id}>
                {drzava.naziv}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
  <label>Grad:</label>
  <select onChange={(e) => setSelectedGrad(e.target.value)}>
    <option value="">Izaberite grad</option>
    {gradovi.map((grad) => (
      <option key={grad.id} value={grad.id}>
        {grad.naziv}
      </option>
    ))}
  </select>
</div>
</div>
<div className='form-row'>
<div className="form-group">
  <label>Ulica:</label>
  <select onChange={(e) => setSelectedAdresa(e.target.value)}>
    <option value="">Izaberite ulicu</option>
    {adrese.map((adresa) => (
      <option key={adresa.id} value={adresa.id}>
        {adresa.ulica}
      </option>
    ))}
  </select>
</div>
<div className="form-group">
          <label>Kucni broj:</label>
          <input type="text"   value={kucniBroj}
  onChange={(e) => setKucniBroj(e.target.value)} />
        </div>
        </div>
        <button type="button" onClick={handleSacuvajClick}>
          Sačuvaj
        </button>
      </form>
    </div>
  );
}

export default FrmKreirajKandidata