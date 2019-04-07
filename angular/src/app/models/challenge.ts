
export const CHALLENGE_NAME_MAX_LENGTH = 50;
export interface Challenge{
    id:number,
    fechaInicio:Date,
    fechaFin:Date,
    nombre:string,
    numParticipantes:number;
  }