import { Server } from './server';
import { Database } from './core/database';
import { ServerSettings } from './server/server-settings';


new Server(
  new ServerSettings(),
  new Database(),
)
  .start()
  .catch(console.log);
