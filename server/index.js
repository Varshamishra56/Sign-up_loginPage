const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const EmployeeModel = require('./models/Employee'); 

const app = express();
app.use(express.json());
app.use(cors()); 

mongoose.connect('mongodb://localhost:27017/employee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Failed to connect to MongoDB', err));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              res.json("Success");
            } else {
              res.json("Incorrect password");
            }
          });
      } else {
        res.json("No record exists");
      }
    })
    .catch(err => res.status(500).json(err));
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hashedPassword => {
      EmployeeModel.create({ name, email, password: hashedPassword })
        .then(employee => res.json("Success"))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
