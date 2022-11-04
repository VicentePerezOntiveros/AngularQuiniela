import { Estado } from "./estado.model";

export interface Ciudad{
  idCiudad?: number;
  nombreCiudad: string;
  inicialesCiudad: string;
  estado?: Estado;
  valorDefaultCiudad?: boolean;
  }