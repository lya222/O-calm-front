import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, alpha, styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { searchPlace } from '../../../store/reducers/placesReducer';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.55),
  border: `1px solid ${alpha(theme.palette.common.black, 0.25)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.85),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function SearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (search !== '') {
      dispatch(searchPlace(search));
    }
  }, [search, dispatch]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let newValue = search;
    if (e.key === 'Backspace') {
      newValue = search.substring(0, search.length - 1);
    } else if (e.key === 'Enter') {
      setSearch('');
    } else if (
      !['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)
    ) {
      newValue = search.concat(e.key);
    }
    setSearch(newValue);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={search}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onKeyDown={handleSearch}
      />
    </Search>
  );
}

export default function SearchBardesktop() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar
        variant="dense"
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <SearchBar />
      </Toolbar>
    </Box>
  );
}
