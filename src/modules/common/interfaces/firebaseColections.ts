/**
 * Enumeraciones de las colecciones de firebase
 */
export enum FirebaseCollections {
  USUARIOS,
}


/**
 * Interfaces de las colecciones de firebase
 */
export interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  estado: boolean;
}