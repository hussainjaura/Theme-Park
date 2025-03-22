import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static('structure'));

app.get('/', (req,res)=> {
    res.sendFile(__dirname + '/structure/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


