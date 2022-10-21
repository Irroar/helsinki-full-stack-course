import { useState, useEffect } from 'react';
import axios from 'axios';

import Persons from './components/Persons';
import Header from './components/Header';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const hook = () => {
    axios.get('http://localhost:3001/persons')
        .then(res => {
          setPersons(res.data);
        });
  }
  
  useEffect(hook, []);

  const addHandler = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(personObject));
    }
    setNewName('');
    setNewNumber('');
  }

  const nameChangeHandler = (event) => {
    setNewName(event.target.value);
  }

  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value);
  }

  const filterChangeHandler = (event) => {
    setNewFilter(event.target.value);
  }

  return (
    <div>
      <Header heading='Phonebook'/>
      <Filter value={newFilter} onChange={filterChangeHandler}/>
      <Header heading='add a new'/>

      <PersonForm onSubmit={addHandler} newName={newName} nameChangeHandler={nameChangeHandler} newNumber={newNumber} numberChangeHandler={numberChangeHandler}/>

      <Header heading='Numbers'/>
      <Persons persons={persons.filter(person => person.name.includes(newFilter))} />
    </div>
  );
}


export default App;