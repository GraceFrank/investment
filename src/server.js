import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.get('*', (req, res) => res.status(200).send({ message: 'welcome to Abudanza' }));

export default server;
