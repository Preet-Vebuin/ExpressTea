import express from 'express'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express()
app.use(express.json());


const PORT = process.env.PORT || 3000;  // Use PORT from .env file or default to 3000

app.get('/', (req,res) => {
res.send("hello from hitesh")
})

let teas = []
let Id = 1

app.post('/tea',(req,res)=>{
    // console.log(req)
    console.log(req.body)
    const {name , price } = req.body
    const newT = {id : Id++ , name ,price}
    teas.push(newT);
    res.status(201).send("new tea added")

})

app.get('/tea',(req, res)=>{
res.status(200).send(teas)
})

app.put('/tea/:id',(req,res)=>{
    const tea =teas.find(t =>t.id =  parseInt(req.params.id))

    if(!tea){
        return res.status(404).send("tea not available")
    }
    const {name , price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(202).send(tea);
})

app.delete('/tea/:id',(req,res)=>{
    const teaID =teas.findIndex(t =>t.id =  parseInt(req.params.id))

    if(!teaID){
        return res.status(404).send("tea not available")
    }
    teas.splice(teaID,1);
    res.status(202).send(`tea item ${teaID} deleted`);

    
})

app.listen(PORT , ()=>{

    console.log(`app is listening on port number ${PORT}`)
})
