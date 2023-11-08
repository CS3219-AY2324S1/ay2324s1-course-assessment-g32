import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Queue from './Queue';
import { exitQueue } from '../../api/MatchApi';
import { getCookie } from '../../utils/helpers';
import { errorHandler } from '../../utils/errors';
import { Complexity, Language } from '../../constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../css/Modal.css';

const MatchingModal = ({ user, isOpen, onClose }) => {
  const [isFindingMatch, setIsFindingMatch] = useState(false);
  const [complexity, setComplexity] = useState('');
  const [language, setLanguage] = useState('');
  const [sessionID, setSessionID] = useState('');
  const [jwt, setJwt] = useState('');
  const queueName = `${complexity}-${language}`;

  useEffect(() => {
    try {
      setJwt(getCookie());
      const handleExitTab = async () => {
        if (isFindingMatch) {
          try {
            await exitQueue(jwt, queueName);
          } catch (error) {
            errorHandler(error);
          }
        }
      };

      // Add event listeners for closing the tab
      window.addEventListener('beforeunload', handleExitTab);
      return () => {
        handleExitTab();
        window.removeEventListener('beforeunload', handleExitTab);
      };
    } catch (error) {
      errorHandler(error);
    }
  }, [isFindingMatch, jwt, queueName]);

  const handleComplexityChange = (event) => {
    setComplexity(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleMatchingToggle = async () => {
    setSessionID(uuidv4);
    setIsFindingMatch(!isFindingMatch);
  };

  const handleClosingModal = () => {
    try {
      if (isFindingMatch) {
        exitQueue(jwt, queueName, sessionID);
      }
      onClose();
      setIsFindingMatch(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  const queueProps = {
    jwt,
    sessionID,
    onCancel: handleMatchingToggle,
    queueName,
    complexity,
    language,
  };

  return (
    <div>
      <div className='modal-backdrop fade show'></div>
      <div
        className={`modal fade ${isOpen ? 'show' : ''}`}
        tabIndex='-1'
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>
                Match with other users to collaborate!
              </h5>
              <button
                type='button'
                className='btn-close'
                onClick={handleClosingModal}
              ></button>
            </div>
            {isFindingMatch ? (
              <div className='modal-body'>
                <Queue {...queueProps} />
              </div>
            ) : (
              <div>
                <div className='modal-body'>
                  <form className='create-question-form needs-validation'>
                    <div className='form-floating mb-3'>
                      <select
                        className='form-select mb-3'
                        id='matchingQuestitonComplexity'
                        defaultValue={complexity || user.complexity || Complexity.EASY}
                        onChange={handleComplexityChange}
                      >
                        <option value={Complexity.EASY}>{Complexity.EASY}</option>
                        <option value={Complexity.MEDIUM}>{Complexity.MEDIUM}</option>
                        <option value={Complexity.HARD}>{Complexity.HARD}</option>
                      </select>
                      <label htmlFor='matchingQuestitonComplexity'>
                        Complexity
                      </label>
                    </div>
                    <div className='form-floating mb-3'>
                      <select
                        className='form-select mb-3'
                        id='matchingQuestitonLanguage'
                        defaultValue={language || user.language || Language.PYTHON}
                        onChange={handleLanguageChange}
                      >
                        <option value={Language.PYTHON}>{Language.PYTHON}</option>
                        <option value={Language.JAVA}>{Language.JAVA}</option>
                        <option value={Language.CPP}>{Language.CPP}</option>
                      </select>
                      <label htmlFor='matchingQuestitonLanguage'>
                        Programming Language
                      </label>
                    </div>
                  </form>
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-success'
                    onClick={handleMatchingToggle}
                  >
                    Start
                  </button>
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
