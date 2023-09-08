import { useState,useEffect } from "react";
import React from "react";
import axios from "axios";
//import "./ObrisiKandidata.css"



function FrmObrisiKandidata() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  


  const handleDeleteClick = async () => {
    try {
     
      await Promise.all(selectedCandidates.map((candidate) => axios.delete(`/kandidat/${candidate.id}`)));

     
      alert('Kandidat uspesno obrisan');
      setCandidates((prevCandidates) =>
      prevCandidates.filter((candidate) => !selectedCandidates.includes(candidate))
    );
      setSelectedCandidates([]); 
    } catch (error) {
      console.error('Error deleting candidates:', error);
    }
  };

  const handleCheckboxChange = (candidate) => {
    
    setSelectedCandidates((prevSelected) => {
      if (prevSelected.includes(candidate)) {
        return prevSelected.filter((c) => c !== candidate);
      } else {
        return [...prevSelected, candidate];
      }
    });
  };


  useEffect(() => {
    
    axios.get('/kandidat')
      .then((response) => {
      
        setCandidates(response.data.candidates);
      })
      .catch((error) => {
        console.error('Error fetching candidates:', error);
      });
  }, []);

  return (
    <div className="delete-container">
      <h2>Kandidati</h2>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>JMBG</th>
            <th>Zvanje</th>
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
              <td>{candidate.Zvanje}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCandidates.includes(candidate)}
                  onChange={() => handleCheckboxChange(candidate)}
                />
              </td>
             
            </tr>
          ))}
        </tbody>
        <button onClick={handleDeleteClick}>Obriši označene</button>
      </table>
    </div>
  );
}

export default FrmObrisiKandidata