import { Estado } from "./estado.model";
export interface CiudadForCreation{
    nombreCiudad: string;
    inicialesCiudad: string;
    estado?: Estado;
}