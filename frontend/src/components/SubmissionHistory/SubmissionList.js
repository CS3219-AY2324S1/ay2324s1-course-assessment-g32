import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner';
import { getSubmissionHistory } from '../../api/HistoryApi';
import { getCookie, getUserId, parseDatetime } from '../../utils/helpers';
import { errorHandler } from '../../utils/errors';
import { Tables } from '../../constants';
import '../../css/SubmissionList.css';

const SubmissionList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwt = getCookie();
        const userId = await getUserId();
        const historyResponse = await getSubmissionHistory(jwt, userId);
        setTableData(historyResponse.data.attemptsWithTitles);
        setIsLoading(false);
      } catch (error) {
        errorHandler(error);
      }
    };

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
      const pageLengthPref =
        parseInt(sessionStorage.getItem('submission-table-page-length')) ||
        Tables.Submissions.DEFAULT_PAGE_LENGTH;
      dataTableRef.current = $(tableRef.current).DataTable({
        pageLength: pageLengthPref,
      });

      // Attach listener: on table pageLength change
      $(tableRef.current).on('length.dt', function (e, settings, len) {
        sessionStorage.setItem('submission-table-page-length', len);
      });
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
      <td>
        <span>{submission.duration ? submission.duration : '-'} ms</span>
      </td>
    </tr>
  ));

  return (
    <div className='container'>
      {isLoading ? (
        <Spinner className='spinner-border' />
      ) : (
        <>
          <h1 className='submission-history'>Submission History</h1>
          <div style={{ overflowX: 'auto' }}>
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
                  <th scope='col' width='30'>
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>{submissionList}</tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default SubmissionList;
