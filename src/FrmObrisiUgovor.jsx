import React, { useState,useEffect } from 'react'
import axios from "axios";
import './FrmObrisiUgovor.css';

function FrmObrisiUgovor() {
const[ugovori,setUgovori]=useState([]);

useEffect(()=>{
  fetchUgovori();
},[])

async function fetchUgovori() {
  try {
    const response = await axios.get('/ugovor'); 
    setUgovori(response.data);
  } catch (error) {
    console.error('Error fetching Ugovors:', error);
  }
}

const handleDeleteUgovor = async(ugovorid)=>{

try{
 const response= await axios.delete(`/ugovor?ugovorid=${ugovorid}`);

if(response.status===201){
  alert('Uspesno: '+response.data.message);
}
 setUgovori((prevUgovori) =>
 prevUgovori.filter((ugovor) => ugovor.id !== ugovorid)
);
}catch(error){
  alert('Neuspesno brisanje');
}

}

  return (
    <div className='delete-container'>
     
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Datum</th>
            <th>Sadrzaj</th>
            <th>Kandidat</th>
            <th>Broj stavki</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ugovori.map((ugovor) => (
            <tr key={ugovor.id}>
              <td>{ugovor.id}</td>
              <td>{ugovor.datum}</td>
              <td>{ugovor.sadrzaj}</td>
              <td>{ugovor.kandidat.Ime}</td>
              <td>{ugovor.stavke_count}</td>
              <td>
              
                <button  className="custom-button" onClick={() => handleDeleteUgovor(ugovor.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default FrmObrisiUgovor