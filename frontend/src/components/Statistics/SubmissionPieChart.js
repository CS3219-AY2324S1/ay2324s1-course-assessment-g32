import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from '../../components/Spinner';
import { getPieChartData } from '../../api/HistoryApi';
import { getCookie, getUserId } from '../../utils/helpers';
import { errorHandler } from '../../utils/errors';
import '../../css/SubmissionPieChart.css';

const SubmissionPieChart = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [attemptedQuestionsData, setAttemptedQuestionsData] = useState({});
  const [allQuestionsData, setAllQuestionsData] = useState({});
  const [pieChartData, setPieChartData] = useState([]);

  const updateData = (newData) => {
    const {
      allQuestionsStats,
      attemptedQuestionsStats,
      unattemptedQuestionsStats,
    } = newData;
    setAllQuestionsData(allQuestionsStats);
    setAttemptedQuestionsData(attemptedQuestionsStats);
    setPieChartData([
      { label: 'Easy', value: attemptedQuestionsStats.Easy, color: 'green' },
      {
        label: 'Medium',
        value: attemptedQuestionsStats.Medium,
        color: 'orange',
      },
      { label: 'Hard', value: attemptedQuestionsStats.Hard, color: 'red' },
      {
        label: 'Unattempted',
        value: unattemptedQuestionsStats.count,
        color: 'grey',
      },
    ]);
  };

  useEffect(() => {
    const fetchDataAndInitializePieChart = async () => {
      try {
        const jwt = getCookie();
        const userId = await getUserId();
        const historyResponse = await getPieChartData(jwt, userId);
        updateData(historyResponse.data.pieChartData);
        setIsLoading(false);
      } catch (error) {
        errorHandler(error);
      }
    };

    fetchDataAndInitializePieChart();
  }, [setAttemptedQuestionsData, setAllQuestionsData, setPieChartData]);

  return (
    <div className='parent d-flex m-3'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className='bartext'>
            <div className='level d-flex'>
              <ProgressBar
                className='bar green opacity-10'
                variant='success'
                now={
                  (attemptedQuestionsData.Easy / allQuestionsData.Easy) * 100
                }
              />
              <span className='fixed-width'>
                <span className='bold-text'> Easy </span>
                {attemptedQuestionsData.Easy} / {allQuestionsData.Easy}
              </span>
            </div>
            <div className='level d-flex'>
              <ProgressBar
                className='bar orange opacity-10'
                variant='warning'
                now={
                  (attemptedQuestionsData.Medium / allQuestionsData.Medium) *
                  100
                }
              />
              <span className='fixed-width'>
                <span className='bold-text'> Medium </span>
                {attemptedQuestionsData.Medium} / {allQuestionsData.Medium}
              </span>
            </div>
            <div className='level d-flex'>
              <ProgressBar
                className='bar red opacity-10'
                variant='danger'
                now={
                  (attemptedQuestionsData.Hard / allQuestionsData.Hard) * 100
                }
              />
              <span className='fixed-width'>
                <span className='bold-text'> Hard </span>
                {attemptedQuestionsData.Hard} / {allQuestionsData.Hard}
              </span>
            </div>
          </div>
          <div className='piechart'>
            <PieChart
              series={[
                {
                  data: pieChartData,
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
        </>
      )}
    </div>
  );
};

export default SubmissionPieChart;
