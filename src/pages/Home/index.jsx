import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Card } from '../../components/Card'

import './styles.css';

export function Home() {

  const [participantName, setParticipantName] = useState();
  const [participants, setNewParticipants] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' });

  function handleAddParticipant() {
    const newParticipant = {
      name: participantName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
    setNewParticipants(prevState => [...prevState, newParticipant]);
  }

  useEffect(() => {

    async function handleUserData() {
      const response = await fetch('https://api.github.com/users/dharuanluigi')
      const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url
      });
    }

    handleUserData();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Presence list</h1>
        <div className="">
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="profile image" />
        </div>
      </header>
      <input
        type="text"
        placeholder='Type the name'
        onChange={(e) => setParticipantName(e.target.value)}
      />
      <button type='button' onClick={handleAddParticipant}>
        Add
      </button>

      {
        participants.map((participant) => (
          <Card
            key={uuidv4(10)}
            name={participant.name}
            time={participant.time}
          />
        ))
      }
    </div>
  );
}
