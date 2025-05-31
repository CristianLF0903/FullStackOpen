const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());

// Token personalizado para mostrar el body en POST
morgan.token("body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let personas = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(personas);
});

app.get("/info", (req, res) => {
  const date = new Date();
  const info = `<p>Phonebook has info for ${personas.length} people</p>
                <p>${date}</p>`;
  res.send(info);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const persona = personas.find((p) => p.id === id);
  if (persona) {
    res.json(persona);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  personas = personas.filter((p) => p.id !== id);

  res.status(204).end();
});

const assignmentId = () => {
  const maxId =
    personas.length > 0 ? Math.max(...personas.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  if (personas.find((p) => p.name === body.name)) {
    return res.status(400).json({
      error: "This person already exists",
    });
  }

  const newPersona = {
    id: assignmentId(),
    name: body.name,
    number: body.number,
  };

  personas.push(newPersona);
  res.json(newPersona);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
