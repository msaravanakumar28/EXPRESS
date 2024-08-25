const fs = require('fs')
const express = require('express');
const mongoose = require('mongoose');
const { log } = require('console');
const app = express()


app.use(express.json());


const DB = "mongodb+srv://msaravanakumar28:Pypl_2050@cluster0.jmyvvf1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB, {
    // useNewUrlParser: true,

  })
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.error('Error connecting to DB:', err));

// Define the schema and model outside the route handler
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, 'A tour must have a rating'],
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);


const tourobj = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/ex.json`))

app.get('/api/tours', async (req, res) => {
  try {
      
 req.query.page = '1'
req.query.limit ='2'

    // const updateTour = await Tour.findByIdAndUpdate(req.params.id, req.body,{
    //     new: true,
    //     runvalidators: true
    // });

    // const update = await Tour.create (tourobj);

    // console.log(tourobj);

    // const del = await Tour.deleteMany();

    // console.log(del);

    // const fin = await Tour.find({
    //   name :"tour 1",

     
     // });

 const queryObj = {...req.query};
 const excluded = ['page','sort','limit','fields']
    excluded.forEach(el => delete queryObj[el])
    
        console.log(req.query, queryObj);

  let queryStr = JSON.stringify(queryObj);
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}` );
console. log(JSON. parse(queryStr));

let query = Tour. find(JSON.parse(queryStr));
    
//     const fin = await Tour.find(query);
// let query = Tour. find(JSON.parse(queryStr));

// if (req.query.sort){

//   console.log(req.query.sort);
//   query = query.sort(req.query.sort)
  
// }
    
 

    
    // console.log(query);  
      
    // console.log(req.query);  
  // sorting
//     if (req.query.sort) {
// const sortBy = req.query.sort.split(',').join(' ');
// query = query.sort(sortBy);
// } else {
// query = query.sort('-createdAt');
// }

// if(req.query.fields){
//   const fields = req.query.fields.split(',').join(' ');
//   query = query.select(fields);
 
// }
// else {
//   query =query.select('-__v');
// }
   

// const page = req.query.page * 1 || 1;
// const limit = req.query.limit *1 || 100;
// const skip = (page-1)*limit

//  const skip ='1'
//  console.log(skip);

// query = query.skip(skip).limit(req.query.limit);

// if (req.query.page){
//   let count = await Tour.countDocuments();
//   if (skip > count) throw new Error('ERROR')
// }

   const fin = await Tour.find(query);

    res.status(201).json({
      status: 'success',
      data: fin
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
