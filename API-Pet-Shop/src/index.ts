import express from 'express';
import 'dotenv/config';
import routes from "./routes/index.js";
import { setupSwagger } from './swagger';

const app = express();

setupSwagger(app);

app.use(express.json());

app.use('', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`A API subiu na porta ${PORT}`)
});