import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Tag } from '../../../@types/places';

const GenderEnum = ['female', 'male', 'other'];
interface Places {
  id: number;
  name: string;
  slug: string;
  description: string;
  images: string[];
  tag: Tag[];
  route: string[];
}

interface IFormInput {
  name: string;
  slug: string;
  description: string;
  images: string[];
  tag: Tag[];
  route: string[];
}

function CreatePlace() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <Box
      component="form"
      sx={{
        width: 400,
        maxWidth: '100%',
        p: 2,
        bgcolor: 'white',
        color: 'black',
      }}
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Entrer le nom du lieu"
            type="text"
            {...register('name', {
              required: 'Le nom du lieu est obligatoire',
            })}
          />
          <TextField
            fullWidth
            multiline
            label="Entrer la description du lieu"
            type="text"
            {...register('description', {
              required: 'Il faut drécrire le lieu',
            })}
          />
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormLabel component="legend">
                Sélectionner le type de votre lieu
              </FormLabel>
              {GenderEnum.map((gender) => (
                <FormControlLabel
                  value="start"
                  control={<Checkbox />}
                  label={gender}
                  labelPlacement="start"
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}

export default CreatePlace;
