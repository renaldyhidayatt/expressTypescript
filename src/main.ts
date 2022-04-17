import App from './app'
import dotenv from 'dotenv';

dotenv.config({ path: '.env'})

const app = new App()

app.listen();
