import { Box, FormControlLabel, IconButton, TextField } from '@mui/material';
import { ICreatePlace } from '../../../../@types/places';
import { UseFormRegister } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';

type IInputRoute = {
  register: UseFormRegister<ICreatePlace>;
  index: number;
  handleRemove: () => void;
};

function InputRoute({ register, index, handleRemove }: IInputRoute) {
  const textInput = `Etape ${index + 1}`;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <TextField
        {...register(`journey.${index}`)}
        label={textInput}
        variant="outlined"
        sx={{
          flex: 1,
          height: '40px',
          mt: 5,
          '& .MuiInputLabel-root': {
            textAlign: 'center',
          },
          '& .MuiInputBase-input': {
            textAlign: 'center',
            height: '18px',
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          style: {
            textAlign: 'center',
          },
        }}
      />
      {index !== 0 && (
        <IconButton onClick={handleRemove} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  );
}

export default InputRoute;
