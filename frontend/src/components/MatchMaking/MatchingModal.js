import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exitQueue } from '../../api/QueueApi.js';
import Queue from './Queue';
import '../../css/Modal.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const MatchingModal = ({ isOpen, onClose }) => {

  const [isFindingMatch, setIsFindingMatch] = useState(false);
  const [complexityValue, setComplexityValue] = useState('Easy');

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!storedUser) {
      navigate('/login');
    }
  }, [navigate, storedUser]);

  const handleComplexityValueChange = (event) => {
    setComplexityValue(event.target.value);
  };

  const handleMatchingToggle = async () => {
    setIsFindingMatch(!isFindingMatch);
  };

  const handleClosingModal = () => {
    if (isFindingMatch) {
      exitQueue(storedUser, complexityValue);
    }
    onClose();
    setIsFindingMatch(false);
  };

  return (
    <div>
      <div className="modal-backdrop fade show"></div>
      <div className={`modal fade ${isOpen ? 'show' : ''}`} tabIndex="-1" style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Match with other users to collaborate!</h5>
              <button type="button" className="btn-close" onClick={handleClosingModal}></button>
            </div>
            {isFindingMatch ? (
              <div className="modal-body">
                <Queue user={storedUser} complexity={complexityValue} onCancel={handleMatchingToggle} />
              </div>
            ) : (
              <div>
                <div className="modal-body">
                  <form className='create-question-form needs-validation' >
                    <div className='form-floating mb-3'>
                      <select className='form-select mb-3' id='matchingQuestitonComplexity' defaultValue='Easy' onChange={handleComplexityValueChange} >
                        <option value='Easy'>Easy</option>
                        <option value='Medium'>Medium</option>
                        <option value='Hard'>Hard</option>
                      </select>
                      <label htmlFor='matchingQuestitonComplexity'>Complexity</label>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-success" onClick={handleMatchingToggle}>Start</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingModal;
