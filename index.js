const express = require('express')
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
require('dotenv').config()



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bxmbf.mongodb.net/voluntaryNetwork?retryWrites=true&w=majority`;

const port = 5000

const app = express()

app.use(cors());
app.use(bodyParser.json());




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const events = client.db("voluntaryNetwork").collection("event");
  
  app.post('/addEvent', (req, res) => {
    const newEvent = req.body;
    events.insertOne(newEvent)
    .then(result =>{
      res.send(result.insertedCount > 0)
    })
    console.log(newEvent);
  })

});

app.get('/events', (req, res) => {
  events.find({})
  .toArray(documents => {
    res.send(documents);
  }) 

})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port);