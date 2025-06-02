const PersonForm = ({
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
  addName,
}) => {
  return (
    <form className="person-form" onSubmit={addName}>
      <div className="form-group">
        <label>
          name:{" "}
          <input className="input" value={newName} onChange={handleNewName} />
        </label>
      </div>
      <div className="form-group">
        <label>
          number:{" "}
          <input
            className="input"
            value={newNumber}
            onChange={handleNewNumber}
          />
        </label>
      </div>
      <div>
        <button className="btn" type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
