import React, { useState } from "react";
import type { Paciente } from "../types/Cliente";
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