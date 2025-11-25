import type { Atendimento } from './Atendimento';

export interface Pet {
  id:        number  
  nome:      String
  especie:   String
  raça?:      String
  sexo:      String
  idade:     number
  idcliente: number
  atendimentos:   Atendimento[]
}