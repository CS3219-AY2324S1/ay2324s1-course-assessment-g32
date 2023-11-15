import React from 'react';
import Header from '../../components/Header';
import { SubmissionList } from '../../components/SubmissionHistory';

function SubmissionHistory() {
  return (
    <div>
      <Header />
      <div className='background'>
        <div className='main'>
          <SubmissionList />
        </div>
      </div>
    </div>
  );
}

export default SubmissionHistory;
