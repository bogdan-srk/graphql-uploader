import { Server } from './server';
import { Database } from './core/database';


new Server({
  database: new Database()
})
  .start()
  .catch(console.log);
