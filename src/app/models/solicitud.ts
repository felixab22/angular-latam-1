export interface Solicitud {
  id?: number;
  officeID: string;
  cuenta: string;
  tarifa?: number;
  espacios?: number;
  fecha: string;
  primerTL?: number;
  porcentaje?: number;
  segundoTL?: number;
  tref: string;
  farebasis: string;
  carrier: string;
  numeroVuelo: string;
  clase: string;
  parPuntos: string;
  estado?:string;
  pnr?:string;
  usuarioCreacion?:string;
  fechaCreacion?:string;
  usuarioAprobacion?:string;
  fechaAprobacion?:string;

  mensajeValidacion?: string;
  
}
