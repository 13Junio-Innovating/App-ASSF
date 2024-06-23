import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import registerRoute from './routes/register';
import scheduleRoute from './routes/schedule';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/register', registerRoute);
app.use('/schedule', scheduleRoute);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
