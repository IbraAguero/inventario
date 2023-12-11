import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";
import { logger, logEvents } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import corsOptions from "./config/corsOptions.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import printerRoutes from "./routes/printer.routes.js";
import monitorRoutes from "./routes/monitor.routes.js";
import peripheralRoutes from "./routes/peripheral.routes.js";
import networkRoutes from "./routes/network.routes.js";
import computerRoutes from "./routes/computer.routes.js";
import statisticsRoutes from "./routes/statistics.routes.js";
import makersRoutes from "./routes/maker.routes.js";
import modelsRoutes from "./routes/model.routes.js";
import typesRoutes from "./routes/type.routes.js";
import statesRoutes from "./routes/state.routes.js";
import placesRoutes from "./routes/place.routes.js";
import suppliersRoutes from "./routes/supplier.routes.js";
//import noteRoutes from './routes/noteRoutes.js';
//import rootRoutes from './routes/root.js';
//import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

//app.use('/', express.static(path.join(__dirname, 'public')));
//app.use('/', rootRoutes);

app.use("/auth", authRoutes);
app.use("/usuarios", userRoutes);
app.use("/", makersRoutes);
app.use("/", modelsRoutes);
app.use("/", typesRoutes);
app.use(statesRoutes);
app.use(placesRoutes);
app.use(suppliersRoutes);
app.use("/monitores", monitorRoutes);
app.use("/impresoras", printerRoutes);
app.use("/perifericos", peripheralRoutes);
app.use("/redes", networkRoutes);
app.use("/computadoras", computerRoutes);
app.use("/estadisticas", statisticsRoutes);
//app.use('/notes', noteRoutes);

/* app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
}); */

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
