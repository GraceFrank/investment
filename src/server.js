import dotenv from "dotenv"
dotenv.config()
import express from 'express';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('*', (req, res) => res.status(200).send({ message: 'welcome to Abudanza' }));



export default server
