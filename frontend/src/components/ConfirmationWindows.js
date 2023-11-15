import Alert from 'react-bootstrap/Alert';
import '../css/ConfirmationWindows.css';

export function DeletionWindow({ onClose, onConfirm }) {
  return (
    <div className='overlay'>
      <Alert variant='danger'>
        <Alert.Heading>
          Are you sure you want to delete this question?
        </Alert.Heading>
        <p>This question will be deleted from the database permanently.</p>
        <hr />
        <div className='d-flex justify-content-end'>
          <button
            type='button'
            className='btn btn-outline-danger me-2'
            onClick={onClose}
          >
            No
          </button>
          <button type='button' className='btn btn-danger' onClick={onConfirm}>
            Yes
          </button>
        </div>
      </Alert>
    </div>
  );
}

export function EditWindow({ onClose, onConfirm }) {
  return (
    <div className='overlay'>
      <Alert variant='warning'>
        <Alert.Heading>Do you wish to exit?</Alert.Heading>
        <p>All unsaved changes will be lost.</p>
        <hr />
        <div className='d-flex justify-content-end'>
          <button
            type='button'
            className='btn btn-outline-danger me-2'
            onClick={onClose}
          >
            No
          </button>
          <button type='button' className='btn btn-danger' onClick={onConfirm}>
            Yes
          </button>
        </div>
      </Alert>
    </div>
  );
}

export function DeregisterWindow({ onClose, onConfirm }) {
  return (
    <div className='overlay'>
      <Alert variant='danger'>
        <Alert.Heading>
          Are you sure you want to deregister the account?
        </Alert.Heading>
        <p>This account will be deleted from the database permanently.</p>
        <hr />
        <div className='d-flex justify-content-end'>
          <button
            type='button'
            className='btn btn-outline-danger me-2'
            onClick={onClose}
          >
            No
          </button>
          <button type='button' className='btn btn-danger' onClick={onConfirm}>
            Yes
          </button>
        </div>
      </Alert>
    </div>
  );
}

export function ToggleUserRoleWindow({ onClose, onConfirm, isMaintainer }) {
  return (
    <div className='overlay'>
      <Alert variant='warning'>
        {isMaintainer ? (
          // User gets demoted to user
          <div>
            <Alert.Heading>
              Are you sure you want to demote this account to a normal user?
            </Alert.Heading>
            <p>This account will only have normal user access rights.</p>
          </div>
        ) : (
          // User gets promoted to maintainer
          <div>
            <Alert.Heading>
              Are you sure you want to promote this account to a maintainer?
            </Alert.Heading>
            <p>This account will get all the maintainer access rights.</p>
          </div>
        )}
        <hr />
        <div className='d-flex justify-content-end'>
          <button
            type='button'
            className='btn btn-outline-danger me-2'
            onClick={onClose}
          >
            No
          </button>
          <button type='button' className='btn btn-danger' onClick={onConfirm}>
            Yes
          </button>
        </div>
      </Alert>
    </div>
  );
}

export function ChangeQuestionWindow({ onClose, onConfirm, questionTitle }) {
  return (
    <div className='overlay'>
      <Alert variant='danger'>
        <Alert.Heading>
          Are you sure you want to change the question?
        </Alert.Heading>
        <p>The question will be changed to <b>{questionTitle}</b>.</p>
        <hr />
        <div className='d-flex justify-content-end'>
          <button
            type='button'
            className='btn btn-outline-danger me-2'
            onClick={onClose}
          >
            No
          </button>
          <button type='button' className='btn btn-danger' onClick={onConfirm}>
            Yes
          </button>
        </div>
      </Alert>
    </div>
  );
}

export function ResetCodeWindow({ onClose, onConfirm }) {
  return (
    <div className='overlay'>
      <Alert variant='danger'>
        <Alert.Heading>
          Are you certain you wish to reset your code?
        </Alert.Heading>
        <p>Resetting will restore the code to its initial boilerplate state.</p>
        <hr />
        <div className='d-flex justify-content-end'>
          <button
            type='button'
            className='btn btn-outline-danger me-2'
            onClick={onClose}
          >
            No
          </button>
          <button type='button' className='btn btn-danger' onClick={onConfirm}>
            Yes
          </button>
        </div>
      </Alert>
    </div>
  );
}

export const LeaveRoomWindow = ({ onClose, onConfirm }) => {
  return (
    <div className='overlay'>
      <Alert variant='danger'>
        <Alert.Heading>
          Are you certain you wish to exit the room?
        </Alert.Heading>
        <p>You will not be allowed to join back once you exit.</p>
        <hr />
        <div className='d-flex justify-content-end'>
          <button
            type='button'
            className='btn btn-outline-danger me-2'
            onClick={onClose}
          >
            No
          </button>
          <button type='button' className='btn btn-danger' onClick={onConfirm}>
            Yes
          </button>
        </div>
      </Alert>
    </div>
  );
}
