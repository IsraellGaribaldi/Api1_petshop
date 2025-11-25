import React, { useEffect, useState } from "react";
import type { Cliente } from "../types/Cliente";
import { updatePaciente } from "../services/clienteService";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

interface EditarClienteModalProps {
  open: boolean;
  onClose: () => void;
  cliente: Cliente;
  onClienteUpdated: (updatedCliente: Cliente) => void;
}

export const EditarClienteModal = ({
  open,
  onClose,
  cliente,
  onClienteUpdated,
}: EditarClienteModalProps) => {
  const INITIAL_FORM_DATA: Cliente = {
    id: cliente.id,
    nome: cliente.nome,
    telefone: cliente.telefone,
    endereco: cliente.endereco,
    email: cliente.email,
    pet: cliente.pet ? { ...cliente.pet } : undefined,
  };

  const [formData, setFormData] = useState<Cliente>(INITIAL_FORM_DATA);
  const [salvando, setSalvando] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    if (cliente && open) {
      setFormData({
        ...cliente,
        pet: cliente.pet ? { ...cliente.pet } : undefined
       
      });
    }
  }, [cliente,open]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: Cliente) => ({ ...prev, [name]: value }));
  };

  const handlesalve = async () => {
    setSalvando(true);
   try {
      await updatePaciente(formData.id, formData);
      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      alert("Erro ao salvar cliente. Tente novamente.");
    } finally {
      setSalvando(false);
    }

  };
 return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
        Editar Paciente
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Digite o nome completo"
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Digite o email"
          />

          <TextField
            fullWidth
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            placeholder="Digite o CPF"
          />

          <TextField
            fullWidth
            label="Telefone"
            name="telefone"
            value={formData.telefone || ""}
            onChange={handleInputChange}
            placeholder="Digite o telefone"
          />

          <TextField
            fullWidth
            label="Data de Nascimento"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleInputChange}
            placeholder="YYYY-MM-DD"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>

        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={salvando}
        >
          {salvando ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarClienteModal;