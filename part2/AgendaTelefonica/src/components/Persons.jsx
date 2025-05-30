const Persons = ({ filteredPersons, toggleRemove }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <div
          key={person.name}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span style={{ marginRight: "10px" }}>
            {person.name} - {person.number}
          </span>
          <button onClick={() => toggleRemove(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
