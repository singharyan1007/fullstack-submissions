import React, { useState, useEffect } from 'react'
import personService from './services/Persons.js'
const Notification = ({ notify }) => {
  if (notify === null) {
    console.log("No Notification")
    return null;

  }
  const { message, className } = notify
  return (
    <div className={className}>{message}</div>
  )
}


const Persons = ({ filterPersons, handleDelete }) => {
  return filterPersons.map((person) => <p key={person.id}>{person.name}{person.number}<button onClick={() => handleDelete(person.id, person.name)}>Delete</button></p>)
}

const PersonForm = ({ setPeople, people, setMessages }) => {
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (e) => setFirstName(e.target.value);
  const handleNumberChange = (e) => setPhone(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: firstName,
      phone: phone,
    }

    const existingPerson = people.find((person) => person.name === firstName);
    if (existing === !undefined) {
      if (window.confirm(`${firstName} is already added to the Phonebook,rreplace the old number with a new contact number`)) {
        personService.putPerson(newPerson, existingPerson.id)
          .then((returnedPerson) => {
            setPeople(people.map((person) => person.id === existingPerson.id ? returnedPerson : person))
            setMessages({ message: `Updated ${returnedPerson.name}`, className: 'success' })
            setTimeOut(() => {
              setMessages(null);
            }, 5000)
          })
          .catch(error => {
            setMessages({ message: error.response.data, className: 'error' })
            console.log(error);
            setTimeout(() => {
              setMessages(null);
            }, 5000)
          })
      }
    } else {
      personService.postPerson(newPerson)
        .then((returnedPerson) => {
          setPeople([...people, newPerson])
          setMessages({ message: `Added ${returnedPerson} successfully`, className: success })
          setTimeout(() => {
            setMessages(null);
          }, 5000)
        })
        .catch(error => {
          setMessages({ message: error.response.data, className: 'error' })
          setTimeout(() => {
            setMessages(null);
          }, 5000)
        })
    }
    setFirstName('');
    setPhone('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='firstName'>Name</label>
        <input
          type='text'
          name='firstName'
          id='firstName'
          onChange={handleNameChange}
          value={firstName}
        />
      </div>
      <div>
        <label htmlFor='phone'>Number</label>
        <input
          type='text'
          name='phone'
          id='phone'
          onChange={handleNumberChange}
          value={phone}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}






function App() {
  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState('');
  const [filterPersons, setFilterPersons] = useState(people);
  const [messages, setMessages] = useState(null);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setFilterPersons(people.filter((person) => person.firstName.toLowerCase().includes(filter.toLowerCase())))
  }

  const handleDelete = (id, firstName) => {
    if (window.confirm(`Delete ${firstName}`)) {
      personService.deletePerson(id)
        .then(() => {
          personService.getPersons()
            .then(people => { setPeople(people) })
        })
        .catch(error => {
          setMessages({ message: `Information of ${firstName} has already been deleted from the server` })
          setTimeout(() => {
            setMessages(null)
          }, 5000)
        })
    }
  }
  useEffect(() => {
    personService
      .getPersons()
      .then(people => {
        setPeople(people)
      })

  }, [])

  return (
    <>
      <h1>PhoneBook Application</h1>
      <div>
        <label htmlFor='search'>Search</label>
        <input name='search' id='search' onChange={handleFilterChange} value={filter}></input>

      </div>
      <Notification notify={messages} />
      <h2>Add a new</h2>
      <PersonForm setPeople={setPeople} setMessages={setMessages} people={people} />
      <h2>Numbers</h2>
      {filter === '' ? <Persons handleDelete={handleDelete} filterPersons={people} /> : <Persons handleDelete={handleDelete} filterPersons={filterPersons} />}

    </>
  )
}

export default App
