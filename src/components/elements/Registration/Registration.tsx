import { Box, FormControl, TextField } from "@mui/material";

function Registration() {
  return (
    <Box
      sx={{
        width: 400,
        maxWidth: "100%",
        p: 2,
        bgcolor: "white",
      }}
    >
      <FormControl fullWidth>
        <TextField fullWidth label="Nom" id="firstname" />
        <TextField fullWidth label="Prénom" id="lastname" />
        <TextField fullWidth label="Email" id="email" />
        <TextField fullWidth label="Mot de passe" id="password" />
      </FormControl>
    </Box>
  );
}

export default Registration;
