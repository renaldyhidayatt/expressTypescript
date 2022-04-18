import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import HelloRoutes from './routes/routes.index'
import AuthRoutes from './routes/routes.auth';
import CategoryRoutes from './routes/routes.category';
import UserRoutes from './routes/routes.user';
import ProductRoutes from './routes/routes.product';
import OrderRoutes from './routes/routes.order';

import ErrorHandler from './middleware/errorhandler';
import morgan from 'morgan'


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
        this.app.use(morgan('dev'));
        this.app.use("/public/uploads", express.static(__dirname + '/public/uploads'))
        this.app.use(ErrorHandler)
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
        this.app.use("/category", CategoryRoutes)
        this.app.use('/user', UserRoutes)
        this.app.use('/product', ProductRoutes)
        this.app.use('/order', OrderRoutes);
    }
}

export default App;