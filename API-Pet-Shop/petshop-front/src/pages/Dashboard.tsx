import React from "react";
import { Box, Typography } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Typography variant="h4" component="h1" fontWeight={600}>
        Bem-vindo ao Dashboard!
      </Typography>
    </Box>
  );
};

export default Dashboard;