import {
  showServerErrorToast,
  showValidationErrorToast,
  showFailureToast,
  showUserNotAuthorizedErrorToast,
  showDuplicateRecordErrorToast,
  showRecordNotFoundErrorToast,
} from './toast';
import { Status } from '../constants';

export const errorHandler = (error) => {
  switch (error.response.status) {
    case Status.BAD_REQUEST:
      showValidationErrorToast(error);
      break;
    case Status.UNAUTHORIZED:
      showUserNotAuthorizedErrorToast(error);
      break;
    case Status.REQUEST_TIMEOUT:
      showServerErrorToast(error);
      break;
    case Status.CONFLICT:
      showDuplicateRecordErrorToast(error);
      break;
    case Status.GONE:
      showRecordNotFoundErrorToast(error);
      break;
    case Status.INTERNAL_SERVER_ERROR:
      showServerErrorToast(error);
      break;
    default:
      showFailureToast(error);
  }
};
