import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useAppDispatch } from '../../../hooks/redux';
import { logout } from '../../../store/reducers/userReducer';
import { useNavigate } from 'react-router-dom';

function MenuLog() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleCreatePlace = () => {
    navigate('/createplace');
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <Button
            variant="contained"
            sx={{
              justifyContent: 'space-around',
              marginLeft: '38px',
              marginRight: '38px',
            }}
            {...bindTrigger(popupState)}
          >
            <ManageAccountsIcon />
          </Button>
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
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleCreatePlace}>
              Ajouter un nouveau lieu
            </MenuItem>
            <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
}
export default MenuLog;
