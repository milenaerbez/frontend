import { useState,useEffect } from "react";
import React from "react";
import axios from "axios";
import  "./ObrisiKandidata.css";



function FrmObrisiKandidata() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  


  // const handleDeleteClick = async () => {
  //   try {
     
  //     await Promise.all(selectedCandidates.map((candidate) => axios.delete(`/kandidat/${candidate.id}`)));

     
  //     alert('Kandidat uspesno obrisan');
  //     setCandidates((prevCandidates) =>
  //     prevCandidates.filter((candidate) => !selectedCandidates.includes(candidate))
  //   );
  //     setSelectedCandidates([]); 
  //   } catch (error) {
  //     console.error('Error deleting candidates:', error);
  //   }
  // };

  // const handleCheckboxChange = (candidate) => {
    
  //   setSelectedCandidates((prevSelected) => {
  //     if (prevSelected.includes(candidate)) {
  //       return prevSelected.filter((c) => c !== candidate);
  //     } else {
  //       return [...prevSelected, candidate];
  //     }
  //   });
  // };


  useEffect(() => {
    const token = window.localStorage.getItem('auth_token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
    };
    axios.get('/kandidat', config)
      .then((response) => {
      
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error);
      });
  }, []);

  const handleRemoveCandidate = async (candidateId) => {
    try {
      const token = window.localStorage.getItem('auth_token'); // Dobijanje JWT tokena iz localStorage-a
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Postavljanje JWT tokena u Authorization zaglavlje
        },
      };
    const response=  await axios.delete(`/kandidat/${candidateId}`, config);
    
      if(response.status===201){
        alert('Uspesno '+ response.data.message);
      }else if(response.status===500){
        alert('Ne mozete obrisati kandidata koji ima ugovor');
      }
      
  
      setCandidates((prevCandidates) =>
        prevCandidates.filter((candidate) => candidate.id !== candidateId)
      );
    } catch (error) {
      alert('Ne mozete obrisati kandidata koji ima ugovor',error);
    }
  };
  
  
  
  
  
  

  return (
    <div className="delete-container">
      {/* <h2>Kandidati</h2> */}
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>JMBG</th>
            <th>Kontakt</th>
            <th>Mesto</th>
            <th>Obriši</th> 
            
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.id}</td>
              <td>{candidate.Ime}</td>
              <td>{candidate.Prezime}</td>
              <td>{candidate.JMBG}</td>
             
              <td>{candidate.Kontakt}</td>
              <td>{candidate.grad.naziv}</td>
              
              <td>
        <button className="custom-button" onClick={() => handleRemoveCandidate(candidate.id)}>Obrisi</button>
      </td>
             
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  );
}

export default FrmObrisiKandidata