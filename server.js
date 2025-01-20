const express = require ('express');
const dotenv = require ('dotenv');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

dotenv.config();

const app = express();
app.use(express.json());

//Route for testing
app.get ('/', (req, res ) => {
    res.send('You entered in the BUNKER');
});

//Starting Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Bunker is Running on PORT ${PORT}`);
});


