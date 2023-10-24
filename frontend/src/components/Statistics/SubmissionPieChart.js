import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getCookie, getUserId } from '../../utils/helpers.js';
import { getPieChartData } from '../../api/HistoryApi.js';
import { errorHandler } from '../../utils/errors.js';
import './SubmissionPieChart.css';

const SubmissionPieChart = () => {
  const [userId, setUserId] = useState('');
  var startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);

  const [attemptedEasyQuestions, setAttemptedEasyQuestions] = useState(0);
  const [attemptedMediumQuestions, setAttemptedMediumQuestions] = useState(0);
  const [attemptedHardQuestions, setAttemptedHardQuestions] = useState(0);
  const [allEasyQuestions, setAllEasyQuestions] = useState(0);
  const [allMediumQuestions, setAllMediumQuestions] = useState(0);
  const [allHardQuestions, setAllHardQuestions] = useState(0);

  const [data, setData] = useState([]);

  const updateData = (newData) => {
    const { allQuestionsStats, attemptedQuestionsStats } = newData;

    setAttemptedEasyQuestions(attemptedQuestionsStats.Easy);
    setAttemptedMediumQuestions(attemptedQuestionsStats.Medium);
    setAttemptedHardQuestions(attemptedQuestionsStats.Hard);
    setAllEasyQuestions(allQuestionsStats.Easy);
    setAllMediumQuestions(allQuestionsStats.Medium);
    setAllHardQuestions(allQuestionsStats.Hard);

    setData([
      { label: 'Easy', value: attemptedEasyQuestions, color: 'green' },
      { label: 'Medium', value: attemptedMediumQuestions, color: 'orange' },
      { label: 'Hard', value: attemptedHardQuestions, color: 'red' },
      { label: 'Unattempted', value: allEasyQuestions + allMediumQuestions + allHardQuestions - attemptedEasyQuestions - attemptedMediumQuestions - attemptedHardQuestions, color: 'grey' },
    ]);
  };

  useEffect(() => {
    const fetchDataAndInitializePieChart = async () => {
      try {
        const historyResponse = await getPieChartData(await getCookie(), await getUserId());
        updateData(historyResponse.data.pieChartData);
      } catch (error) {
        errorHandler(error);
      }
    };

    fetchDataAndInitializePieChart();
  }, [data]);

  return (
    <div className='d-flex align-items-center justify-content-center m-5'>
    <div>
      <div className='d-flex align-items-center'>
        <ProgressBar className='bar green-background' variant="success" now={attemptedEasyQuestions / allEasyQuestions * 100}/>
        <text>
          <span class='bold-text'> Easy </span>
          {attemptedEasyQuestions} / {allEasyQuestions}
        </text>
      </div>
      <div className='d-flex align-items-center'>
        <ProgressBar className='bar orange-background' variant="warning" now={attemptedMediumQuestions / allMediumQuestions * 100}/>
        <text>
          <span class='bold-text'> Medium </span>
          {attemptedMediumQuestions} / {allMediumQuestions}
        </text>
      </div>
      <div className='d-flex align-items-center'>
        <ProgressBar className='bar red-background' variant="danger" now={attemptedHardQuestions / allHardQuestions * 100}/>
        <text>
          <span class='bold-text'> Hard </span>
          {attemptedHardQuestions} / {allHardQuestions}
        </text>
      </div>
    </div>
    <div>
    <PieChart
      series={[
        {
          data: data,
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 1,
          cornerRadius: 5,
        },
      ]}
      width={400}
      height={200}
    />
    </div>
    </div>
  )
};

export default SubmissionPieChart;