const Persons = ({ filteredPersons, toggleRemove, toggleUpdate }) => {
  return (
    <div className="persons-list">
      {filteredPersons.map((person) => (
        <div key={person.name} className="person-row">
          <span className="person-info">
            {person.name} <br></br> {person.number}
          </span>
          <div className="btn-container">
            <button
              className="btn btn-toggle"
              onClick={() => toggleUpdate(person.id)}
            >
              Actualizar
            </button>
            <button
              className="btn btn-delete"
              onClick={() => toggleRemove(person.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Persons;
