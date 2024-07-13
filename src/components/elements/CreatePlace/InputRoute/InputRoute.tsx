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
    <Box sx={{ display: 'flex' }}>
      <FormControlLabel
        control={<TextField />}
        {...register(`journey.${index}`)}
        label={textInput}
        labelPlacement="start"
      />
      {index != 0 ? (
        <IconButton onClick={handleRemove} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      ) : (
        ''
      )}
    </Box>
  );
}

export default InputRoute;
