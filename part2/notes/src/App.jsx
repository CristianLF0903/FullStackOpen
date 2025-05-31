import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Message from "./components/Message";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes);
      })
      .catch((err) => {
        setMessage({
          text: `Error: ${err.response.data.error}`,
          type: "error",
        });
      });
  }, []);

  const handleNoteChange = (event) => {
    // console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
      setMessage({ text: `A new note was created`, type: "success" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch(() => {
        setMessage({
          text: `Note '${note.content}' was already removed from server`,
          type: "error",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const toggleRemove = (note) => {
    if (window.confirm(`Delete note '${note.content}'?`)) {
      noteService.remove(note.id).then(() => {
        setNotes(notes.filter((n) => n.id !== note.id));
        setMessage({
          text: `Note '${note.content}' was already removed from server`,
          type: "alert",
        });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== note.id));
      });
    }
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div className="container">
      <h1 className="main-title">Notes</h1>
      {message ? <Message message={message.text} type={message.type} /> : null}
      <form className="note-form" onSubmit={addNote}>
        <input
          className="input"
          value={newNote}
          placeholder="a new note..."
          onChange={handleNoteChange}
        />
        <button className="btn" type="submit">
          save
        </button>
      </form>
      <div className="filter-bar">
        <button className="btn" onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul className="notes-list">
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            toggleRemove={() => toggleRemove(note)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
