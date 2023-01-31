import { Model, DataTypes } from "sequelize";
import { sequelize } from ".";

export class Comercio extends Model {}
Comercio.init(
  {
    nombre: { type: DataTypes.STRING },
    rubro: { type: DataTypes.STRING },
    lat: { type: DataTypes.FLOAT },
    lng: { type: DataTypes.FLOAT },
  },
  { sequelize, modelName: "Comercio" }
);
