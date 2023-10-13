import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Queue from './Queue';
import { exitQueue } from '../../api/QueueApi.js';
import '../../css/Modal.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const MatchingModal = ({ isOpen, onClose }) => {
  const [isFindingMatch, setIsFindingMatch] = useState(false);
  const [complexity, setComplexity] = useState('Easy');
  const [programmingLanguage, setProgrammingLanguage] = useState('');
  const [sessionID, setSessionID] = useState('');

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!storedUser) {
      navigate('/login');
    }
  }, [navigate, storedUser]);

  useEffect(() => {
    const handleExitTab = async () => {
      if (isFindingMatch) {
        const queueName = complexity + programmingLanguage;
        await exitQueue(storedUser, queueName);
      }
    };
    // Add event listeners for closing the tab
    window.addEventListener('beforeunload', handleExitTab);
    return () => {
      handleExitTab();
      window.removeEventListener('beforeunload', handleExitTab);
    };
  });

  const handleComplexityChange = (event) => {
    setComplexity(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setProgrammingLanguage(event.target.value);
  };

  const handleMatchingToggle = async () => {
    setSessionID(uuidv4);
    setIsFindingMatch(!isFindingMatch);
  };

  const handleClosingModal = () => {
    if (isFindingMatch) {
      const queueName = complexity + programmingLanguage;
      exitQueue(storedUser, queueName, sessionID);
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
                <Queue
                  user={storedUser}
                  queueName={complexity + programmingLanguage}
                  onCancel={handleMatchingToggle}
                  sessionID={sessionID}
                />
              </div>
            ) : (
              <div>
                <div className="modal-body">
                  <form className='create-question-form needs-validation' >
                    <div className='form-floating mb-3'>
                      <select className='form-select mb-3' id='matchingQuestitonComplexity' defaultValue={complexity} onChange={handleComplexityChange} >
                        <option value='Easy'>Easy</option>
                        <option value='Medium'>Medium</option>
                        <option value='Hard'>Hard</option>
                      </select>
                      <label htmlFor='matchingQuestitonComplexity'>Complexity</label>
                    </div>
                    <div className='form-floating mb-3'>
                      <select className='form-select mb-3' id='matchingQuestitonLanguage' defaultValue={programmingLanguage} onChange={handleLanguageChange} >
                        <option value=''>Select a Programming Language</option>
                        <option value='Python'>Python</option>
                        <option value='Java'>Java</option>
                        <option value='C++'>C++</option>
                      </select>
                      <label htmlFor='matchingQuestitonLanguage'>Programming Language</label>
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
