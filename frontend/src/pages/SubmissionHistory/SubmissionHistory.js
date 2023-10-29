import React from 'react';
import Header from '../../components/Header';
import { SubmissionList } from '../../components/SubmissionHistory';
import '../../css/SubmissionHistory.css';

function SubmissionHistory() {
  return (
    <div className='submission-history'>
      <Header />
      <SubmissionList />
    </div>
  );
}

export default SubmissionHistory;
