import SearchIcon from '@mui/icons-material/Search';
import {
  BottomNavigationAction,
  InputBase,
  Menu,
  alpha,
  styled,
} from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { useEffect, useState } from 'react';
import { searchPlace } from '../../../store/reducers/placesReducer';
import { useDispatch } from 'react-redux';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
    // vertical padding + font size from searchIcon
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

  //permet de récupérer la chaine de charactere qu'on veut chercher
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
      console.log('ok');
    } else {
      newValue = search.concat(e.key);
    }
    setSearch(newValue);
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <BottomNavigationAction
            label="Search"
            icon={<SearchIcon />}
            {...bindTrigger(popupState)}
          />
          <Menu
            {...bindMenu(popupState)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={search}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'Searchstyle' }}
                onKeyDown={handleSearch}
              />
            </Search>
          </Menu>
          <BottomNavigationAction />
        </>
      )}
    </PopupState>
  );
}

export default SearchBar;
