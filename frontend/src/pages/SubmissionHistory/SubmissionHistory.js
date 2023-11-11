import React from 'react';
import Header from '../../components/Header';
import { SubmissionList } from '../../components/SubmissionHistory';

function SubmissionHistory() {
  return (
    <div className='background'>
      <div className='main'>
        <Header />
        <SubmissionList />
      </div>
    </div>
  );
}

export default SubmissionHistory;
