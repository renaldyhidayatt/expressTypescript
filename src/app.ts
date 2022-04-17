import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import HelloRoutes from './routes/routes.index'
import AuthRoutes from './routes/routes.auth';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.connectDatabase();
        this.myroutes();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        })
    }

    private async initializeMiddlewares(): Promise<void> {
        this.app.use(express.json())
        this.app.use(cors())
    }

    private connectDatabase() {
        const {
            MONGO_URL
        } = process.env;

        mongoose.connect(`${MONGO_URL}`)
            .then(() => console.log('Database connected'))
            .catch((err) => console.error(`could not connect to Mongodb ${err}`))
    }

    private myroutes() {
        this.app.use('/', HelloRoutes)
        this.app.use("/auth", AuthRoutes)
    }
}

export default App;