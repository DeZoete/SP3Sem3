import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileAnimals from '../components/ProfileAnimals';
import ProfileZoos from '../components/ProfileZoos';
import facade from '../util/apiFacade';

export default function ProfilePage() {
  const [activeComponent, setActiveComponent] = useState('zoos');

  return (
    <div>
      <button onClick={() => setActiveComponent('zoos')}>Zoos</button>
      <button onClick={() => setActiveComponent('animals')}>Animals</button>

      {activeComponent === 'zoos' && <ProfileZoos />}
      {activeComponent === 'animals' && <ProfileAnimals />}
    </div>
  );
}
