import Cliente from "../models/Cliente";
import Funcionario from "../models/Funcionario";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginInput {
  email: string;
  senha: string;
}

interface LoginResult {
  token: string;
  user: {
    id: number;
    nome: string;
    email: string;
    tipo: "cliente" | "funcionario";
  };
}

class LoginService {
  async login({ email, senha }: LoginInput): Promise<LoginResult> {
    // TENTAR CLIENTE
    let user: any = await Cliente.findOne({ where: { email } });
    let tipo: "cliente" | "funcionario" = "cliente";

    // Se não achou cliente → tenta funcionário
    if (!user) {
      user = await Funcionario.findOne({ where: { email } });
      tipo = "funcionario";
    }

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // Validar senha
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      throw new Error("Senha inválida");
    }

    const userId: number = tipo === "cliente" ? user.id : user.idfuncionario;

    // Criar token com o tipo do usuário
    const token = jwt.sign(
      { id: userId, tipo },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        id: userId,
        nome: user.nome,
        email: user.email,
        tipo
      }
    };
  }
}

export default new LoginService();
