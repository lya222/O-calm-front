import { Box, Button } from '@mui/material';

interface ButtonFilterProps {
  setFilterPlace: (filterPlace: string) => void;
}

function ButtonFilter({ setFilterPlace }: ButtonFilterProps) {
  const filter: string[] = ['Tous les lieux', 'Mes Favoris', 'Mes Lieux créés'];
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2, top: 0 }}
    >
      {filter.map((item, index) => (
        <Button key={index} onClick={() => setFilterPlace(item)}>
          {item}
        </Button>
      ))}
    </Box>
  );
}

export default ButtonFilter;
