import { useNavigate } from 'react-router-dom';
import { Grid, Card, Box, Typography, Button } from '@mui/material';
import { deleteUser } from '../../api/UserApi.js';
import { showSuccessToast, showValidationErrorToast, showFailureToast } from '../../utils/toast.js';

export const ViewUserTopPane = ({ user }) => {
  const navigate = useNavigate();

  const handleViewProfileClick = () => {
    navigate('/user-profile/');
  };

  const handleChangePasswordClick = () => {
    navigate('/user-profile/change-password/');
  };

  const handleDeregisterClick = async () => {
    try {
      await deleteUser(user.id);
      showSuccessToast('User has been deleted successfully!');
      // TODO: Implement better session management for assignment 3
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      navigate(-1);
      switch (error.response.status) {
        case 400:
          showValidationErrorToast(error);
          break;
        default:
          showFailureToast(error);
      } 
    }
  };

  return (
    <Card sx={{ marginBottom: '10px' }}>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' padding={2}>
        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
          {user.username}
        </Typography>
        <Typography variant='string'>{user.email}</Typography>
        <Box m={2} justifyContent='center'>
          <Button variant='contained' onClick={handleViewProfileClick}>
            View Profile
          </Button>
          <Button variant='contained' onClick={handleChangePasswordClick}>
            Change Password
          </Button>
          <Button variant='contained' color='error' onClick={handleDeregisterClick}>
            Deregister
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export const ViewUserBottomPane = ({ user }) => {
  const navigate = useNavigate();

  const handleEditUsernameClick = () => {
    navigate('/user-profile/edit/');
  };

  return (
    <Grid item>
      <Card sx={{ marginBottom: '10px' }}>
        <Box padding={2}>
          <Grid container alignItems='center'>
            <Grid item xs={2}>
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                Username
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='string'>{user.username}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Button variant='contained' onClick={handleEditUsernameClick}>
                Edit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Card sx={{ marginBottom: '10px' }}>
        <Box padding={2}>
          <Grid container alignItems='center'>
            <Grid item xs={2}>
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                Email
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant='string'>{user.email}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Grid>
  );
};
