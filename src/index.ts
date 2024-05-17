import express from "express";
import cors from "cors";
import router from "./routes";
import connect from "./db/index";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
connect();

app.listen(3000, ()=>{
    console.log("Servidor Rodando.");
})

