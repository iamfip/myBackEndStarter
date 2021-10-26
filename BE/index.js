
const { MongoClient } = require('mongodb');
const express = require('express')
const cors=require('cors');
const { query } = require('express');
const ObjectId = require('mongodb').ObjectId;
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://new-user01:SpUw2PKnmCMKd4@cluster0.9de3j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("reactTest");
      const userCollection = database.collection("reactUsers");

        //GET API
        app.get('/users', async(req,res)=>{
            const cursor=userCollection.find({});
            const users=await cursor.toArray();
            res.send(users);
        })

        //Update Api
        app.get('/users/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id: ObjectId(id)};
            const user=await userCollection.findOne(query)
            console.log("load user with",id)
            res.send(user)
        })


      // POST API
      app.post('/users', async (req, res) => {
        const newUser=req.body;
        console.log("hitting the post",req.body)
        // res.send("hit the post");
        const result =await userCollection.insertOne(newUser);
        res.json(result);
      })

      // Delete API
      app.delete('/users/:id',async (req,res)=>{
            const id = req.params.id;
            const query={_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.json(result);

      })


    //   const result = await userCollection.insertOne();
    //   console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Tumi je aso tai ami pothe hete jai')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})









// const { MongoClient } = require('mongodb');
// const express = require('express')  
// const app = express();
//     const port = 5000

//     //username: new-user01 
//     //passwd: SpUw2PKnmCMKd4

// const uri = "mongodb+srv://new-user01:SpUw2PKnmCMKd4@cluster0.9de3j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// // client.connect(err => {
// //   const collection = client.db("test").collection("devices");
// //   // perform actions on the collection object
// //   console.log("Hitting the dataBase");
// //   const user={name: "Taz Ahasan", email:"taz@gmail.com",phone:"01765204406"};
// //   collection.insertOne(user) 
// //   .then(()=>{
// //       console.log("inserted in database")
// //   })
// // //   client.close();
// // })
// async function run() {
//     try {
//       await client.connect();
//       const database = client.db("test");
//       const haiku = database.collection("devices");
//       // create a document to insert
//       const doc = {
//         name:"Bappy Ahasan",
//         email: "bappi@fulo.com",
//         phone: "017821448009"
//       }
//       const result = await haiku.insertOne(doc);
//       console.log(`A document was inserted with the _id: ${result.insertedId}`);
//     } finally {
//       await client.close();
//     }
//   }
//   run().catch(console.dir);
 
// app.get('/', (req, res) => {
//   res.send('Running My CRUD server , We Shall  !')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })