import { Box, FormControl, TextField } from "@mui/material";

function Logout() {
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
        <TextField fullWidth label="Email" id="email" />
        <TextField fullWidth label="Mot de passe" id="password" />
      </FormControl>
    </Box>
  );
}

export default Logout;
