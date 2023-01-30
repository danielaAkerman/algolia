import * as express from "express";
import { sequelize } from "./db";
import { index } from "./lib/algolia";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// index
//   .saveObject({
//     objectID: "12",
//     nombre: "Cuaderno",
//     precio: 440,
//     _geoloc: {
//       lat: -31.43306,
//       lng: -64.224994,
//     },
//   })
//   .then((res) => {
//     console.log(res);
//   });

// index.search("cuaderno").then((res) => {
//   console.log(res.hits[0]);
// });

// index
//   .search("", {
//     aroundLatLng: "-31, -64",
//     aroundRadius: 1000000 // metros
//   })
//   .then(({ hits }) => {
//     console.log(hits);
//   });

// app.get("/test", async (req, res) => {
//   res.json({});
// });

// app.listen(port, () => {
//   console.log("Corriendo en puerto http://localhost:" + port);
// });
