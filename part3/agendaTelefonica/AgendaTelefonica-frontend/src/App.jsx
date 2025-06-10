import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Message from "./components/Message";
import "./App.css"; // Importa el archivo de estilos

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
        setFilteredPersons(initialPersons);
      })
      .catch((err) => {
        setMessage({ text: err, type: "error" });
      });
  }, []);

  const handleNewName = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
    setFilter(event.target.value);
  };

  const handleNewNumber = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === newName)) {
      setMessage({
        text: `${newName} is already added to phonebook`,
        type: "alert",
      });
      setNewName("");
      setNewNumber("");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return;
    }

    personService.create(nameObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setFilteredPersons(filteredPersons.concat(returnedPerson));
      setMessage({
        text: `Added ${newName}`,
        type: "success",
      });
      setNewName("");
      setNewNumber("");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const toggleRemove = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        setMessage({
          text: `Information of ${person.name} has already been removed from server`,
          type: "alert",
        });
        setPersons(persons.filter((p) => p.id !== id));
        setFilteredPersons(filteredPersons.filter((p) => p.id !== id));
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  const toggleUpdate = (id) => {
    const person = persons.find((p) => p.id === id);
    const newNumber = prompt(
      `Please enter new number to ${person.name}`,
      person.number
    );
    const updatedPerson = { ...person, number: newNumber };

    personService
      .update(id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)));
        setFilteredPersons(
          filteredPersons.map((p) => (p.id !== id ? p : returnedPerson))
        );
        setMessage({ text: `Updated ${person.name}`, type: "success" });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch(() => {
        setPersons(persons.pop(person));
        setMessage({
          text: `Information of ${person.name} has already been removed from server`,
          type: "error",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  };

  return (
    <div className="container">
      <h2 className="main-title">Phonebook</h2>
      {message ? <Message message={message.text} type={message.type} /> : null}
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2 className="section-title">add a new</h2>
      <PersonForm
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addName={addName}
      />
      <h2 className="section-title">Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        toggleRemove={toggleRemove}
        toggleUpdate={toggleUpdate}
      />
    </div>
  );
};

export default App;
