const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = require('./routes/router')


mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB....');
    const port = process.env.PORT || 3000;

    app.listen(port,()=>{
        console.log(`listnening port ${port}....`);
}) 
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.use('/api/genres',router);
app.use(express.json());










