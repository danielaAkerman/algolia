import * as express from "express";
import { sequelize } from "./db";
import { index } from "./lib/algolia";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

index
  .saveObject({
    objectID: "12",
    nombre: "Cuaderno",
    precio: 440,
  })
  .then((res) => {
    console.log(res);
  });


// app.get("/test", async (req, res) => {
//   res.json({});
// });

// app.listen(port, () => {
//   console.log("Corriendo en puerto http://localhost:" + port);
// });
