import React, {useEffect, useState} from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Profile(){

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const [incidents, setIncidents] = useState([]);

    useEffect(()=> {
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(response=>{
            setIncidents(response.data);
        })
    },[ongId]);

    async function handleDeleteIncident(id){
        try{
           await api.delete(`incidents/${id}`,{headers:{Authorization: ongId}});

           setIncidents(incidents.filter(incident=>incident.id!==id));
        }catch(err){
            alert('Erro ao tentar excluir item');
        }

    };

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vindo, {ongName}</span>

                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button type="button">
                    <FiPower onClick={handleLogout} size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident=> (
                    <li key={incident.id}>
                        <strong>CASO</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button">
                            <FiTrash2 onClick={()=>handleDeleteIncident(incident.id)} size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
  
            </ul>
        </div>
    );
}