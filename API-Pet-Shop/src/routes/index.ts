// Importa o Router do express, que permite a criação de rotas.
import { Router } from "express";
// Importa as rotas de pets.
import petRoutes from "./petRoutes";
// Importa as rotas de funcionários.
import funcionarioRoutes from "./funcionarioRoutes";
// Importa as rotas de clientes.
import clienteRoutes from "./clienteRoutes";
// importa a rota de login que vai ser usada para autenticação
import loginRoutes from "./loginRoutes";
// Cria uma nova instância do Router.
const router = Router();

// Define que as rotas de pets serão acessadas a partir do caminho /pets.
router.use("/pets", petRoutes);
// Define que as rotas de funcionários serão acessadas a partir do caminho /funcionarios.
router.use("/funcionarios", funcionarioRoutes);
// Define que as rotas de clientes serão acessadas a partir do caminho /clientes.
router.use("/clientes", clienteRoutes);
// Define que as rotas de login serão acessadas a partir do caminho /login.
router.use("/login", loginRoutes);

// Exporta o router para que ele possa ser usado em outras partes do aplicativo.
export default router;