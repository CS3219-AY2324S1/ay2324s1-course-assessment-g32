import { showServerErrorToast, showValidationErrorToast, showFailureToast, showUserNotAuthorizedErrorToast, showDuplicateQuestionErrorToast, showQuestionNotFoundErrorToast } from './toast.js';

export const errorHandler = (error) => {
  switch (error.response.status) {
    case 400:
      showValidationErrorToast(error);
      break;
    case 401:
      showUserNotAuthorizedErrorToast(error);
      break;
    case 408:
      showServerErrorToast(error);
      break;
    case 409:
      showDuplicateQuestionErrorToast(error);
      break;
    case 410:
      showQuestionNotFoundErrorToast(error);
      break;
    case 500:
      showServerErrorToast(error);
      break;
    default:
      showFailureToast(error);
  }
};
