const Note = ({ note, toggleImportance, toggleRemove }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className={`note-item${note.important ? " important" : ""}`}>
      <span className="note-content">{note.content}</span>
      <button className="btn btn-toggle" onClick={toggleImportance}>
        {label}
      </button>
      <button className="btn btn-toggle-rm" onClick={toggleRemove}>
        Remove
      </button>
    </li>
  );
};

export default Note;
