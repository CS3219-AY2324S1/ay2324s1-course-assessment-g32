import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner';
import { getCookie, getUserId, parseDatetime } from '../../utils/helpers';
import { errorHandler } from '../../utils/errors';
import { getSubmissionHistory } from '../../api/HistoryApi';
import { appendQuestionTitle } from '../../api/QuestionApi';
import '../../css/SubmissionList.css'

const SubmissionList = () => {
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
    <tr key={submission._id} onClick={() => handleRowClick(submission._id)}>
      <th scope='row'>{index + 1}</th>
      <td>{submission.title}</td>
      <td>{parseDatetime(submission.createdAt)}</td>
      <td>{submission.language}</td>
    </tr>
  ));

  return (
    <div className='container'>
      {isLoading ? (
        <Spinner className='spinner-border' />
      ) : (
        <>
          <h1>Submission History</h1>
          <table ref={tableRef} className='table table-hover table-striped'>
            <thead className='table-dark'>
              <tr>
                <th scope='col' width='50'>
                  No.
                </th>
                <th scope='col' width='400'>
                  Question Title
                </th>
                <th scope='col' width='200'>
                  Time of Submission
                </th>
                <th scope='col' width='100'>
                  Language
                </th>
              </tr>
            </thead>
            <tbody className='table-group-divider'>
              {submissionList}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default SubmissionList;
