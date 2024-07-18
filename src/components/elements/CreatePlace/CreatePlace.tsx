import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Modal,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICreatePlace } from '../../../@types/places';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import InputRoute from './InputRoute/InputRoute';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAppSelector } from '../../../hooks/redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import {
  createPlace,
  uploadPicture,
} from '../../../store/reducers/placesReducer';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckIcon from '@mui/icons-material/Check';
import { createSlug } from '../../../store/selectors/places';
import { IPictureDownload } from '../../../@types/Files';
import PlaceOnMaps from '../PlaceOnMaps/PlaceOnMaps';
import { Iposition } from '../../../@types/Map';
import '../../../assets/fonts/fonts.css';
import DoneIcon from '@mui/icons-material/Done';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
};

function CreatePlace() {
  const { register, handleSubmit } = useForm<ICreatePlace>({
    mode: 'onTouched',
  });

  const [listRoute, setListRoute] = useState([{ id: 0 }]);
  const [pictures, setPictures] = useState<IPictureDownload[]>([]);
  const statePicture = useAppSelector((state) => state.places.picture);
  const [count, setCount] = useState(1);
  const idUser = useAppSelector((state) => state.user.id);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(false);
  };

  const [position, setPosition] = useState<Iposition>();

  const addRoute = () => {
    setListRoute((prev) => [...prev, { id: count }]);
    setCount((prev) => prev + 1);
  };

  const deleteRoute = (index: number) => {
    setListRoute((prev) => prev.filter((route) => route.id !== index));
  };

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault;
    if (e.target.files) {
      console.log('mon image', e.target.files[0]);
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      formData.append('upload_preset', import.meta.env.VITE_API_UPLOAD_PRESET);
      const response = await dispatch(uploadPicture(formData));
      console.log("ma réponse a l'envoie de l'image", response);
      if (uploadPicture.fulfilled.match(response)) {
        const newPicture = response.payload;
        setPictures((prev) => [
          ...prev,
          {
            url: newPicture.secure_url,
            name: newPicture.original_filename,
            extension: newPicture.original_extension,
            isDownload: true,
            isloading: false,
          },
        ]);
        console.log('mon state de photo', statePicture);
      } else {
        console.error("Erreur lors du téléchargement de l'image", response);
      }
    }
  };

  const onSubmit: SubmitHandler<ICreatePlace> = async (data) => {
    data.user_id = idUser;
    data.picture = pictures.map((pict) => pict.url);
    data.slug = createSlug(data.name);
    if (position) {
      console.log("ma position pour l'envoi", position);
      data.gps_location_latitude = position?.lat;
      data.gps_location_longitude = position?.lng;
    }

    console.log('Le resultat de ma création', data);
    try {
      const response = await dispatch(createPlace(data as ICreatePlace));
      console.log("création d'un lieu réussi", response);
      navigate('/');
    } catch (err) {
      console.log("erreur sur la création d'un lieu", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: 3,
        mb: 5,
        width: 400,
        maxWidth: '100%',
        p: 2,
        bgcolor: 'white',
        color: 'black',
        paddingTop: '30px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        gap: 2,
      }}
    >
      <Typography variant="h5" component="h5" gutterBottom fontFamily="bion">
        Ajouter un nouveau lieu
      </Typography>
      <TextField
        fullWidth
        label="Entrer le nom du lieu"
        type="text"
        {...register('name', {
          required: 'Le nom du lieu est obligatoire',
        })}
        InputProps={{
          sx: {
            fontFamily: 'bion',
          },
        }}
        InputLabelProps={{
          sx: {
            fontFamily: 'bion',
          },
        }}
      />
      <TextField
        fullWidth
        multiline
        label="Entrer la description du lieu"
        type="text"
        {...register('description', {
          required: 'Il faut drécrire le lieu',
        })}
        InputProps={{
          sx: {
            fontFamily: 'bion',
          },
        }}
        InputLabelProps={{
          sx: {
            fontFamily: 'bion',
          },
        }}
      />
      <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
        <FormLabel
          component="legend"
          sx={{ fontFamily: 'bion', fontWeight: 'bold' }}
        >
          Entrez les étapes à suivre pour accéder au lieu :
        </FormLabel>
        {listRoute.map((journey, index) => (
          <InputRoute
            key={journey.id}
            register={register}
            index={index}
            handleRemove={() => deleteRoute(journey.id)}
          />
        ))}

        <Button onClick={addRoute}>
          <AddCircleOutlineIcon />
        </Button>
      </FormControl>

      {/* Modal for open map */}
      <Button onClick={handleOpen}>
        Sélectionner le lieu sur la carte
        {position && <DoneIcon color="success" />}
      </Button>
      <Modal
        open={open}
        onClose={(
          event: SyntheticEvent,
          reason: 'backdropClick' | 'escapeKeyDown'
        ) => {
          if (reason !== 'backdropClick') {
            handleClose(event);
          }
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={styleModal}
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <PlaceOnMaps setPosition={setPosition} handleClose={handleClose} />
        </Box>
      </Modal>

      {/* Button for upload a pictures */}
      <Button
        component="label"
        role={undefined}
        variant="contained"
        {...register('picture')}
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Télécharger une image
        <VisuallyHiddenInput type="file" onChange={uploadImage} />
      </Button>
      {pictures.map((itemPicture, index) => (
        <Typography key={index}>
          {itemPicture.name}.{itemPicture.extension}
          {itemPicture.isloading ? <CircularProgress /> : ''}
          {itemPicture.isDownload ? <CheckIcon /> : ''}
        </Typography>
      ))}
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
