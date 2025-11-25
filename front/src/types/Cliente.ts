import type { Pet } from './Pet'; // Adjust the path if needed

export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
  email: string;
  pets: Pet[];
}