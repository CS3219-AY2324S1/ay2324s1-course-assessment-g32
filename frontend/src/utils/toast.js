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
    position: toast.POSITION.BOTTOM_RIGHT,
    toastId: 'serverError'
  });
};

export const showDuplicateQuestionErrorToast = (error) => {
  toast.error('Duplicate Question Error: ' + error.response.data.error, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

export const showDuplicateUserErrorToast = (error) => {
  toast.error('Duplicate User Error: ' + error.response.data.error, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

export const showQuestionNotFoundErrorToast = (error) => {
  toast.error('Question Not Found Error: ' + error.response.data.error, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

export const showUserNotFoundErrorToast = (error) => {
  toast.error('User Not Found Error: ' + error.response.data.error, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

export const showUserNotAuthorizedErrorToast = (error) => {
  toast.error('Authorization Error: ' + error.response.data.error, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};
