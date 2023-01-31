import * as express from "express";
import { sequelize } from "./db";
import { index } from "./lib/algolia";
import { Comercio } from "./db/comercio";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // MUY IMPORTANTE PARA QUE EXISTA REQ.BODY

// sequelize.sync({ force: true });

app.post("/comercios", async (req, res) => {
  const newComercio = await Comercio.create(req.body);
  res.json({ newComercio });
});

app.get("/comercios", async (req, res) => {
  const allComercios = await Comercio.findAll();
  res.json({ allComercios });
});

app.get("/comercios/:id", async (req, res) => {
  const { id } = req.params;
  const foundComercio = await Comercio.findByPk(id);
  res.json({ foundComercio });
});

app.put("/comercios/:id", async (req, res) => {
  const { id } = req.params;
  const updatedComercio = await Comercio.update(req.body, { where: { id } });
  res.json({ updatedComercio });
});

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

app.listen(port, () => {
  console.log("Corriendo en puerto http://localhost:" + port);
});
