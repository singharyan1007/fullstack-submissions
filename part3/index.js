const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(express.json());
app.use(cors());

function generateRandomId() {
  // Generate a random number between 1 and 1000000 (you can adjust the range as needed)
  return Math.floor(Math.random() * 1000000) + 1;
}
let people = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]
//morgan.format('postFormat', ':method :url :status :res[content-length] - :response-time ms :post')

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the BUGSCODER server</h1>')
})
app.get('/api/people', (req, res) => {

  res.json(people);

})


app.post('/api/people', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name and number are required fields."
    });
  }

  if (people.find(person => person.name === body.name)) {
    return res.status(400).json({
      error: "Name must be unique. This name already exists in the phonebook."
    });
  }

  const newPerson = {
    id: generateRandomId(),
    name: body.name,
    number: body.number
  };

  people = [...people, newPerson];
  res.json(newPerson);
});

app.get('/api/people/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = people.find(person => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }

})

app.get('/info', (req, res) => {
  let date = new Date();
  //cont len=people.length();
  res.send(`Phonebook has info for ${people.length} people <br><br> ${date}`)
})













const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
