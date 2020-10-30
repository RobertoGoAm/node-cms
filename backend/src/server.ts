import app from './app';
import { SERVER_HOST, SERVER_PORT } from './config/config';

app.listen(SERVER_PORT);

console.log(`Server listening at http://${SERVER_HOST}:${SERVER_PORT}/`);
