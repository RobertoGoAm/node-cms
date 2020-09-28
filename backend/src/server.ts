import * as http from 'http';
import app from './app';

const server: http.Server = new http.Server(app);

server.listen(3001, () => {
  console.log(`Server listening at http://localhost:3001/api/v1`);
});

export default server;
