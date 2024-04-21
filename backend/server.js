const express=require('express');

const articleApi=require('./routes/article');

const authorApi=require('./routes/author');
const cors=require('cors');

require('./config/connect');

const app=express();
const port = 3000

// used for login 
app.use(express.json());
// cross origin
app.use(cors());

app.use('/article', articleApi);

app.use('/author', authorApi);


app.use('/getimage', express.static('./uploads'));

 app.listen(port, ()=>{
    console.log(`Server is running on port http://127.0.0.1:${port}`);
 })