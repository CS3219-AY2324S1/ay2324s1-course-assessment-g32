import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from '../../components/Spinner';
import { getCookie, getUserId } from '../../utils/helpers';
import { getPieChartData } from '../../api/HistoryApi';
import { errorHandler } from '../../utils/errors';
import '../../css/SubmissionPieChart.css';

const SubmissionPieChart = () => {
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [attemptedQuestionsData, setAttemptedQuestionsData] = useState({});
  const [unattemptedQuestionsData, setUnattemptedQuestionsData] = useState({});
  const [allQuestionsData, setAllQuestionsData] = useState({});
  const [pieChartData, setPieChartData] = useState([]);

  const updateData = (newData) => {

    const { allQuestionsStats, attemptedQuestionsStats, unattemptedQuestionsStats } = newData;
    setAllQuestionsData(allQuestionsStats);
    setAttemptedQuestionsData(attemptedQuestionsStats);
    setUnattemptedQuestionsData(unattemptedQuestionsStats);

    setPieChartData([
      { label: 'Easy', value: attemptedQuestionsStats.Easy, color: 'green' },
      { label: 'Medium', value: attemptedQuestionsStats.Medium, color: 'orange' },
      { label: 'Hard', value: attemptedQuestionsStats.Hard, color: 'red' },
      { label: 'Unattempted', value: unattemptedQuestionsStats.count, color: 'grey' },
    ]);
  };

  useEffect(() => {
    const fetchDataAndInitializePieChart = async () => {
      try {
        const historyResponse = await getPieChartData(await getCookie(), await getUserId());
        updateData(historyResponse.data.pieChartData);
        setIsLoading(false);
      } catch (error) {
        errorHandler(error);
      }
    };

    fetchDataAndInitializePieChart();
  }, [setAttemptedQuestionsData, setAllQuestionsData, setPieChartData, setUnattemptedQuestionsData]);

  return (
    <div className='d-flex align-items-center justify-content-center m-3'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <div className='d-flex align-items-center'>
              <ProgressBar className='bar green opacity-10' variant="success" now={attemptedQuestionsData.Easy / allQuestionsData.Easy * 100}/>
              <span className='fixed-width'>
                <span className='bold-text'> Easy </span>
                {attemptedQuestionsData.Easy} / {allQuestionsData.Easy}
              </span>
            </div>
            <div className='d-flex align-items-center'>
              <ProgressBar className='bar orange opacity-10' variant="warning" now={attemptedQuestionsData.Medium / allQuestionsData.Medium * 100}/>
              <span className='fixed-width'>
                <span className='bold-text'> Medium </span>
                {attemptedQuestionsData.Medium} / {allQuestionsData.Medium}
              </span>
            </div>
            <div className='d-flex align-items-center'>
              <ProgressBar className='bar red opacity-10' variant="danger" now={attemptedQuestionsData.Hard / allQuestionsData.Hard * 100}/>
              <span className='fixed-width'>
                <span className='bold-text'> Hard </span>
                {attemptedQuestionsData.Hard} / {allQuestionsData.Hard}
              </span>
            </div>
          </div>
          <div>
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
  )
};

export default SubmissionPieChart;