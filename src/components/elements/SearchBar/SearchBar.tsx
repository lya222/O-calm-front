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
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  //Variable d'état pour la searchBar
  const [isSearchOpen, setIsSearchOpen] = useState(true);

  //permet de récupérer la chaine de caractères qu'on veut chercher
  useEffect(() => {
    if (search !== '') {
      dispatch(searchPlace(search));
    }
  }, [search, dispatch]);

  // Fonction pour activer la SearchBar lors du click
  const handleToggleSearch = () => {
    setIsSearchOpen(true);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //

    const eventKey = {
      Tab: e.key === 'Tab',
      Shift: e.key === 'Shift',
      Control: e.key === 'Control',
      Alt: e.key === 'Alt',
      Meta: e.key === 'Meta',
      Maj: e.key === 'CapsLock',
    };

    let newValue = search;
    if (e.key === 'Backspace') {
      newValue = search.substring(0, search.length - 1);
    } else if (e.key === 'Enter') {
      console.log('ok');
      //Desactivation de la searchbar
      setIsSearchOpen(false);
      navigate('/');
      //SUppression des bugs
    } else if (Object.values(eventKey).some(Boolean)) {
      console.log('voici la touche maj', eventKey);
      setSearch(newValue);
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
            icon={<SearchIcon onClick={handleToggleSearch} />}
            {...bindTrigger(popupState)}
          />
          {/* Desactivation de la searchbar  */}

          {isSearchOpen ? (
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
          ) : null}
        </>
      )}
      {/*  */}
    </PopupState>
  );
}

export default SearchBar;
