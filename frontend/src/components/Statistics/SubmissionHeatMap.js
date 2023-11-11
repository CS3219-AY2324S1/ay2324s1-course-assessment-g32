import React, { useState, useEffect } from 'react';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import Spinner from '../../components/Spinner';
import { getHeatMapData } from '../../api/HistoryApi';
import { getCookie, getUserId } from '../../utils/helpers';
import { errorHandler } from '../../utils/errors';
import '../../css/SubmissionHeatMap.css';

const SubmissionHeatMap = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  var startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);

  useEffect(() => {
    const fetchDataAndInitializeHeatMap = async () => {
      try {
        const jwt = getCookie();
        const userId = await getUserId();
        const historyResponse = await getHeatMapData(jwt, userId);
        setData(historyResponse.data.heatMapData);
        setIsLoading(false);
      } catch (error) {
        errorHandler(error);
      }
    };

    fetchDataAndInitializeHeatMap();
  }, []);

  return (
    <div className='heatmap d-flex m-3'>
      <div className='heatmap-content'>
        {isLoading ? (
          <Spinner />
        ) : (
          <HeatMap
            value={data}
            width={940}
            rectSize={15}
            startDate={startDate}
            legendCellSize='0'
            rectRender={(props, data) => {
              return (
                <Tooltip
                  placement='top'
                  content={`${data.count || 0} submissions on ${data.date}`}>
                  <rect {...props} />
                </Tooltip>
              );
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SubmissionHeatMap;
