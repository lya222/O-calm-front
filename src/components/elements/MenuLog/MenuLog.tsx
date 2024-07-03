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
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <Button variant="contained" {...bindTrigger(popupState)}>
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
            <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
}
export default MenuLog;
