import { FormControlLabel, TextField } from '@mui/material';

function InputRoute({ register, count }) {
  return (
    <FormControlLabel
      value={count}
      label={count}
      labelPlacement="start"
      control={
        <TextField
          fullWidth
          multiline
          label="Entrer la description du lieu"
          type="text"
          {...register('description', {
            required: 'Il faut drécrire le lieu',
          })}
        />
      }
    ></FormControlLabel>
  );
}

export default InputRoute;
