import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormInputPlace } from '../../../@types/places';
import { useState } from 'react';
import InputRoute from './InputRoute/InputRoute';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAppSelector } from '../../../hooks/redux';
import { sortTag } from '../../../store/selectors/places';

function CreatePlace() {
  const { register, handleSubmit } = useForm<IFormInputPlace>();
  const [listRoute, setListRoute] = useState([{ id: 0 }]);
  const [count, setCount] = useState(1);

  const places = useAppSelector((state) => state.places.list);

  const tags: string[] = sortTag(places);

  console.log('recherche des tags : ', tags);
  const addRoute = () => {
    setListRoute((prev) => [...prev, { id: count }]);
    setCount((prev) => prev + 1);
  };

  const deleteRoute = (index: number) => {
    setListRoute((prev) => prev.filter((route) => route.id !== index));
  };

  const onSubmit: SubmitHandler<IFormInputPlace> = (data) => {
    console.log('Le resultat de ma création', data);
  };

  console.log('le register', listRoute);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: 3,
        width: 400,
        maxWidth: '100%',
        p: 2,
        bgcolor: 'white',
        color: 'black',
      }}
    >
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
          {tags.map((tag: string, index) => (
            <FormControlLabel
              key={index}
              value={tag}
              control={<Checkbox />}
              {...register('tag')}
              label={tag}
              labelPlacement="start"
            />
          ))}
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">
          Entrer les étapes a suivre pour acceder au lieu
        </FormLabel>
        {listRoute.map((route, index) => (
          <InputRoute
            key={route.id}
            register={register}
            index={index}
            handleRemove={() => deleteRoute(route.id)}
          />
        ))}
        <Button onClick={addRoute}>
          <AddCircleOutlineIcon />
        </Button>
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        Enregistrer
      </Button>
    </Box>
  );
}

export default CreatePlace;

{
  /* <FormControlLabel
value={countPlace}
label={countPlace}
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
    > */
}
{
  /* </FormControlLabel> */
}
