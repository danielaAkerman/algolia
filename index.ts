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
  const algoliaResp = await index.saveObject({
    objectID: newComercio.dataValues.id,
    nombre: newComercio.dataValues.nombre,
    _geoloc: {
      lat: newComercio.dataValues.lat,
      lng: newComercio.dataValues.lng,
    },
  });
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

function bodyToIndex(body, id?) {
  const respuesta: any = {};
  if (body.nombre) {
    respuesta.nombre = body.nombre;
  }
  if (body.rubro) {
    respuesta.rubro = body.rubro;
  }
  if (body.nombre) {
    respuesta.nombre = body.nombre;
  }
  if (body.lat && body.lng) {
    respuesta._geoloc = {
      lat: body.lat,
      lng: body.lng,
    };
  }
  if (id) {
    respuesta.objectID = id;
  }
  return respuesta;
}

app.put("/comercios/:id", async (req, res) => {
  const { id } = req.params;
  const updatedComercio = await Comercio.update(req.body, { where: { id } });

  //   const updatedData = await Comercio.findByPk(id);
  const indexItems = bodyToIndex(req.body, id);
  const algoliaResp = await index.partialUpdateObject(indexItems);
  res.json({ updatedComercio });
});

app.get("/comercios-cerca-de", async (req, res) => {
  const { lat, lng } = req.query;
  const { hits } = await index.search("", {
    aroundLatLng: [lat, lng].join(","),
    aroundRadius: 10000
  });
  res.json(hits);
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
