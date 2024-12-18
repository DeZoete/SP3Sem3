import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileAnimals from '../components/ProfileAnimals';
import ProfileZoos from '../components/ProfileZoos';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  margin-bottom: 10px; /* Move the Profile Page text up a bit */
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem; /* Increased font size */
  color: #333;
`;

const ButtonGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the buttons */
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px; /* Add margin to separate the buttons */
  font-size: 1rem;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonText = styled.p`
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #333;
`;

export default function ProfilePage() {
  const [activeComponent, setActiveComponent] = useState('zoos');

  return (
    <Container>
      <Header>
        <Title>Profile Page</Title>
      </Header>
      <ButtonGroup>
        <ButtonText>Select a category to manage:</ButtonText>
        <Button onClick={() => setActiveComponent('zoos')}>Zoos</Button>
        <Button onClick={() => setActiveComponent('animals')}>Animals</Button>
      </ButtonGroup>
      {activeComponent === 'zoos' && <ProfileZoos />}
      {activeComponent === 'animals' && <ProfileAnimals />}
    </Container>
  );
}
