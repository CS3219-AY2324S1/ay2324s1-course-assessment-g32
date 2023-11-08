import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAttemptsByQuestionAndUser } from '../../api/HistoryApi';
import { getCookie, getUserId, parseDatetime } from '../../utils/helpers';
import { errorHandler } from '../../utils/errors';
import '../../css/SubmissionDropdown.css';

const SubmissionDropdown = ({ question }) => {
  const [attempts, setAttempts] = useState([]);
  const [selectedAttempt, setSelectedAttempt] = useState('');
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const handleViewAttemptClick = () => {
    navigate('../../submission-history/' + selectedAttempt);
  };

  const handleDropdownChange = (event) => {
    setSelectedAttempt(event.target.value);
  };

  const renderAttempts = () => {
    if (attempts.length === 0) {
      return <option value=''>No Attempts Found</option>;
    }

    return attempts.map((attempt, index) => (
      <option key={index} value={attempt._id}>
        {parseDatetime(attempt.createdAt)} | {attempt.language}
      </option>
    ));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = getCookie();
        const userId = await getUserId();
        const response = await getAttemptsByQuestionAndUser(jwt, question, userId);
        if (response.data.attempts && response.data.attempts.length > 0) {
          setAttempts(response.data.attempts);
          setSelectedAttempt(response.data.attempts[0]._id);
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      } catch (error) {
        errorHandler(error);
      }
    };
    fetchData();
  }, [question]);

  return (
    <div className='d-flex justify-content-between mt-3'>
      <div className='form-floating dropdown'>
        <select
          className='form-select'
          name='complexity'
          onChange={handleDropdownChange}
        >
          {renderAttempts()}
        </select>
        <label>Submission Attempt</label>
      </div>
      <button
        className='btn btn-success'
        onClick={handleViewAttemptClick}
        disabled={disabled}
      >
        View
      </button>
    </div>
  );
};

export default SubmissionDropdown;
