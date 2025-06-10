const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person.js")
const colors = require("colors");
const app = express();

app.use(express.json());

app.use(cors());

// Token personalizado para mostrar el body en POST
morgan.token("body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (req, res, next) => {
  Person.find({}).then((persons) => {
    console.log("Fetching all persons".green);
    res.json(persons);
  }).catch((error) => {
    next(error);
  });
});

app.get("/info", (req, res) => {
  Person.countDocuments({}).then((count) => {
    const date = new Date();
    const info = `<p>Phonebook has info for ${count} people</p>
                  <p>${date}</p>`;
    res.send(info);
  })
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id).then((person) => {
    if (!person) {
      return res.status(404).json({ error: "Person not found" }).end();
    }
    res.json(person)
  }).catch((error) => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {next(error)});
});

// const assignmentId = () => {
//   const maxId =
//     personas.length > 0 ? Math.max(...personas.map((p) => p.id)) : 0;
//   return maxId + 1;
// };

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  const newPerson = new Person({
    name: body.name,
    Number: body.number,
  })
  
  Person.find({ name: newPerson.name }).then(result => {
    if (result.length > 0) {
      console.log(`${newPerson.name}`.yellow + ' is already in the phonebook'.red)
      res.status(400).json({
        error: `${newPerson.name} is already in the phonebook`,
      });
    }

    newPerson.save().then(result => {
      console.log(
      'added '.green +
      `${newPerson.name}`.cyan +
      ' number '.green +
      `${newPerson.Number}`.magenta +
      ' to phonebook'.green
      )
      res.json(result);
    }).catch((error) => {
      next(error);
    })
  }).catch((error) => { next(error); })
});

app.put("/api/persons/:id", (req, res, next) => {
  person = req.body;
  const updatedPerson = {
    name: person.name,
    Number: person.number,
  };
  Person.findByIdAndUpdate(req.params.id, updatedPerson, {new:true, runValidators: true})
    .then((result) => {
      console.log(
        'updated '.green +
        `${result.name}`.cyan +
        ' number '.green +
        `${result.Number}`.magenta +
        ' in phonebook'.green
      );
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

// Middleware para manejar errores
const errorHandler = (error, req, res, next) => {
  console.error("Error:".red, error.message.red);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted Id" });

  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on", `http://localhost:${PORT}`.cyan);
});
