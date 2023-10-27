import React, { useState, useEffect } from 'react';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import { getCookie, getUserId } from '../../utils/helpers.js';
import { getHeatMapData } from '../../api/HistoryApi.js';
import { errorHandler } from '../../utils/errors.js';

const SubmissionHeatMap = () => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([])
  var startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);

  useEffect(() => {
    const fetchDataAndInitializeHeatMap = async () => {
      try {
        const historyResponse = await getHeatMapData(await getCookie(), await getUserId());
        setData(historyResponse.data.heatMapData);
      } catch (error) {
        errorHandler(error);
      }
    };

    fetchDataAndInitializeHeatMap();
  }, []);

  return (
    <div className='d-flex align-items-center justify-content-center m-3'>
      <HeatMap
        value={data}
        width={800}
        rectSize={15}
        startDate={startDate}
        legendCellSize='0'
        rectRender={(props, data) => {
          return (
            <Tooltip placement="top" content={`${data.count || 0} submissions on ${data.date}`}>
              <rect {...props} />
            </Tooltip>
          );
        }}
      />
    </div>
  )
};

export default SubmissionHeatMap;