import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner.js';
import { getCookie, getUserId, parseDatetime } from '../../utils/helpers.js';
import { errorHandler } from '../../utils/errors.js';
import { getSubmissionHistory } from '../../api/HistoryApi.js';
import { appendQuestionTitle } from '../../api/QuestionApi.js';

const SubmissionList = () => {
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const historyResponse = await getSubmissionHistory(await getCookie(), await getUserId());
      setTableData(historyResponse.data.attemptsWithTitles);
      setIsLoading(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Initialize DataTables after the data has been set and the table is rendered
    if (tableRef.current && tableData.length >= 0) {
      // Destroy the existing DataTable instance if it exists
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
      }

      // Initialize DataTables
      dataTableRef.current = $(tableRef.current).DataTable();
    }
  }, [tableData]); // Initialize whenever tableData changes

  const handleRowClick = (id) => {
    navigate('/submission-history/' + id);
  };

  const submissionList = tableData.map((submission, index) => (
    <tr key={submission.id} onClick={() => handleRowClick(submission.id)}>
      <th scope='row'>{index + 1}</th>
      <td>{submission.title}</td>
      <td>{parseDatetime(submission.createdAt)}</td>
    </tr>
  ));

  return isLoading ? (
    <Spinner className='spinner' />
  ) : (
    <div className='container'>
      <table ref={tableRef} className='table table-hover table-striped'>
        <thead className='table-dark'>
          <tr>
            <th scope='col' width='50'>
              No.
            </th>
            <th scope='col' width='400'>
              Question Title
            </th>
            <th scope='col' width='400'>
              Time of Submission
            </th>
          </tr>
        </thead>
        <tbody key={submissionList} className='table-group-divider'>
          {submissionList}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionList;