import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

function FrmIzmeniKandidata() {
  const [drzave, setDrzave] = useState([]);
  const [selectedDrzava, setSelectedDrzava] = useState('');

  const [gradovi, setGradovi] = useState([]);
  const [selectedGrad, setSelectedGrad] = useState('');

  const [adrese, setAdrese] = useState([]);
  const [selectedAdresa, setSelectedAdresa] = useState('');

  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [jmbg, setJmbg] = useState('');
  const [zvanje, setZvanje] = useState('');
  const [kucniBroj, setKucniBroj] = useState('');

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [selectedAdresaData, setSelectedAdresaData] = useState(null);
  const [selectedGradData, setSelectedGradData] = useState(null);
  const [selectedDrzavaData, setSelectedDrzavaData] = useState(null);

  useEffect(() => {
   
    fetchDrzave();
  }, []);

  useEffect(() => {
    if (selectedDrzava) {
      fetchGradovi(selectedDrzava);
    }
  }, [selectedDrzava]);

  useEffect(() => {
    if (selectedGrad) {
      fetchAdrese(selectedGrad);
    }
  }, [selectedGrad]);

  const fetchAdrese = async (gradId) => {
    try {
      const response = await axios.get(`/adrese?gradId=${gradId}`);
      setAdrese(response.data);
    } catch (error) {
      console.error('Error fetching Adrese:', error);
    }
  };

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

  const fetchAdresaData = async (adresaId) => {
    try {
      const response = await axios.get(`/adresa/${adresaId}`);
      setSelectedAdresaData(response.data);
    } catch (error) {
      console.error('Error fetching Adresa Data:', error);
    }
  };

  const fetchGradData = async (gradId) => {
    try {
      const response = await axios.get(`/grad/${gradId}`);
      setSelectedGradData(response.data);
    } catch (error) {
      console.error('Error fetching Grad Data:', error);
    }
  };

  const fetchDrzavaData = async (drzavaId) => {
    try {
      const response = await axios.get(`/drzava/${drzavaId}`);
      setSelectedDrzavaData(response.data);
    } catch (error) {
      console.error('Error fetching Drzava Data:', error);
    }
  };
  useEffect(() => {
    //ucitavanje kandidata
    axios.get('/kandidat')
      .then((response) => {
        // prikaz
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error);
      });
  }, []);

  const handleCandidateClick = (candidate) => {
    console.log(candidate);
    setSelectedCandidate(candidate);
    setIme(candidate.Ime);
    setPrezime(candidate.Prezime);
    setJmbg(candidate.JMBG);
    setZvanje(candidate.Zvanje);
    setKucniBroj(candidate.kucniBroj);
    setSelectedDrzava(candidate.drzava_id);
    setSelectedGrad(candidate.grad_id);
    setSelectedAdresa(candidate.adresa_id);

  
    if (candidate.adresa_id) {
      fetchAdresaData(candidate.adresa_id);
    }

    if (candidate.grad_id) {
      fetchGradData(candidate.grad_id);
    }

    if (candidate.drzava_id) {
      fetchDrzavaData(candidate.drzava_id);
    }
  };

  const handleUpdateCandidate = async () => {
    try {
      const updatedCandidate = {
        id: selectedCandidate.id,
        Ime: ime,
        Prezime: prezime,
        JMBG: jmbg,
        Zvanje: zvanje,
        adresa_id: selectedAdresa,
        grad_id: selectedGrad,
        drzava_id: selectedDrzava,
        kucniBroj: kucniBroj,
      };
  
      ///put obavezno
      const response=await axios.put(`/kandidat/${selectedCandidate.id}`, updatedCandidate);
if(response.status===201){
  alert('Kandidat uspešno izmenjen!');
}
  
     
      
    } catch (error) {
      alert('Error updating Kandidat:', error);
    }
  };

  return (
    <div className="container-kandidat">
      <h2>Izmena Kandidata</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>JMBG</th>
            <th>Kontakt</th>
          </tr>
        </thead>
        <tbody>
        {candidates.map((candidate) => (
            <tr
              key={candidate.id}
              onClick={() => handleCandidateClick(candidate)}
              className={selectedCandidate?.id === candidate.id ? 'selected' : ''}
            >
              <td>{candidate.id}</td>
              <td>{candidate.Ime}</td>
              <td>{candidate.Prezime}</td>
              <td>{candidate.JMBG}</td>
              <td>{candidate.Zvanje}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCandidate && (
        
        <form>
          <div className='form-row'>
          <div className="form-group">
            <label>Ime:</label>
            <input
              type="text"
              value={ime}
              onChange={(e) => setIme(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Prezime:</label>
            <input
              type="text"
              value={prezime}
              onChange={(e) => setPrezime(e.target.value)}
            />
          </div>
          </div>
          <div className='form-row'>
          <div className="form-group">
            <label>JMBG:</label>
            <input
              type="text"
              value={jmbg}
              onChange={(e) => setJmbg(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Kontakt:</label>
            <input
              type="text"
              value={zvanje}
              onChange={(e) => setZvanje(e.target.value)}
            />
          </div>
          </div>
          <div className='form-row'>
          <div className="form-group">
            <label>Drzava:</label>
  <select onChange={(e) => setSelectedDrzava(e.target.value)} value={selectedDrzava}>
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
            <input type="text" value={kucniBroj} onChange={(e) => setKucniBroj(e.target.value)} />
          </div>
          </div>
          <button type="button" onClick={handleUpdateCandidate}>
            Sačuvaj izmenu
          </button>
        </form>
      )}
    </div>
  );
}

export default FrmIzmeniKandidata