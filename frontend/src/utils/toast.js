import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

export const showFailureToast = (message) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
}

export const showValidationErrorToast = (error) => {
  toast.error('Validation Error: ' + error.response.data.error, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

export const showServerErrorToast = (error) => {
  toast.error('Server Error: ' + error.message, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};
