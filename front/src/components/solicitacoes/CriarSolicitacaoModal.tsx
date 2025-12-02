import { useState, useCallback } from "react";
// Importa a interface Solicitacao
import type { Solicitacao } from "../../types/solicitacao"; 
// Importa o serviço de criação de Solicitação
import { createSolicitacao } from "../../services/SolicitacaoServices"; 
import type { SolicitacaoCreateData } from "../../services/SolicitacaoServices"; // Tipagem de input de criação
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

// --- Tipos de Propriedades ---
interface CriarSolicitacaoModalProps {
  open: boolean;
  onClose: () => void;
  // O ID do cliente que está criando esta solicitação
  clienteId: number; 
  onSuccess: (novaSolicitacao: Solicitacao) => void;
}

// O estado do formulário só precisa da descrição
const INITIAL_FORM_DATA = {
  descricao: "",
};

// --- Componente CriarSolicitacaoModal ---
export const CriarSolicitacaoModal = ({
  open,
  onClose,
  clienteId,
  onSuccess,
}: CriarSolicitacaoModalProps) => {
  // Estado para os dados do formulário
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [salvando, setSalvando] = useState(false);

  // --- Handler de Mudança de Input ---
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      setFormData((prev) => ({
        ...prev,
        [name]: value, 
      }));

      // Limpa erro ao digitar (somente o erro de 'descricao')
      if (errors.descricao) {
        setErrors((prev) => ({ ...prev, descricao: "" }));
      }
    },
    [errors]
  );

  // --- Handler de Salvar ---
  const handleSave = useCallback(async () => {
    // 1. Validação Básica
    const descricao = formData.descricao.trim();

    if (descricao.length < 10) {
      setErrors({ descricao: "A descrição da solicitação deve ter pelo menos 10 caracteres." });
      return;
    }
    
    // 2. Prepara os dados para a API
    const dataToSend: SolicitacaoCreateData = {
        descricao: descricao,
        clienteId: Number(clienteId), // Garantir que é number
    };

    setSalvando(true);
    setErrors({}); // Limpa erros antes de enviar
    
    try {
      // 3. Chamada à API
      // O servidor irá atribuir o 'status' como 'Pendente' e gerar 'id' e datas.
      const novaSolicitacao = await createSolicitacao(dataToSend);
      
      // 4. Sucesso
      onSuccess(novaSolicitacao);
      setFormData(INITIAL_FORM_DATA); // Reseta o formulário
      onClose();
    } catch (error) {
      console.error("Erro ao criar solicitação:", error);
      setErrors({ submit: "Erro ao criar solicitação. Verifique sua conexão e tente novamente." });
    } finally {
      setSalvando(false);
    }
  }, [formData.descricao, clienteId, onSuccess, onClose]);

  // --- Handler de Fechar (Resetar Formulário) ---
  const handleClose = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    onClose();
  }, [onClose]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
        Criar Nova Solicitação
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          
          <Typography variant="body2" color="text.secondary">
            Preencha a descrição detalhada abaixo. Sua solicitação será marcada como "Pendente" e o status de acompanhamento aparecerá na sua tela.
          </Typography>

          {/* Descrição da Solicitação */}
          <TextField
            fullWidth
            label="Descreva sua Solicitação"
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            placeholder="Ex: Preciso de suporte para a conta XXX. O problema é..."
            required
            multiline // Permite múltiplas linhas
            rows={5} // Define a altura inicial
            error={!!errors.descricao}
            helperText={errors.descricao}
          />

          {/* Campo de ID do Cliente (Apenas Leitura) */}
          <TextField
            fullWidth
            label="ID do Cliente"
            name="clienteId"
            value={clienteId}
            InputProps={{ readOnly: true }}
            helperText="Sua solicitação será vinculada automaticamente ao seu ID."
            size="small"
          />
          
          {/* Erro de Submissão Geral */}
          {errors.submit && (
            <Box sx={{ color: 'red', textAlign: 'center', mt: 1 }}>
                <Typography variant="body2">{errors.submit}</Typography>
            </Box>
          )}

        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancelar
        </Button>

        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={salvando}
        >
          {salvando ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Enviando...
            </>
          ) : (
            "Enviar Solicitação"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CriarSolicitacaoModal;

