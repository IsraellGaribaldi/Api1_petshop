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
}

function onSave(formData) {
  throw new Error("Function not implemented.");
}
