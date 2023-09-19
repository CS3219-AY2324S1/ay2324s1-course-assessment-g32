import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import { getQuestions } from '../api/QuestionApi.js';
import { showServerErrorToast } from '../utils/toast.js';

const QuestionList = () => {
  const [tableData, setTableData] = useState([]);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  useEffect(() => {
    const fetchDataAndInitializeTable = async () => {
      try {
        const questions = await getQuestions();
        setTableData(questions);
      } catch (error) {
        showServerErrorToast(error);
      }
    };

    fetchDataAndInitializeTable();
  }, []);

  useEffect(() => {
    // Initialize DataTables after the data has been set and the table is rendered
    if (tableRef.current && tableData.length > 0) {
      // Destroy the existing DataTable instance if it exists
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
      }

      // Initialize DataTables
      dataTableRef.current = $(tableRef.current).DataTable();
    }
  }, [tableData]); // Initialize whenever tableData changes

  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate('/landing/question/' + id);
  };

  const handleNewQuestionClick = () => {
    navigate('/landing/new');
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Easy':
        return 'bg-success';
      case 'Medium':
        return 'bg-warning';
      case 'Hard':
        return 'bg-danger';
      default:
        return 'bg-primary';
    }
  };

  const questionList = tableData.map((question, index) => (
    <tr key={question._id} onClick={() => handleRowClick(question._id)}>
      <th scope='row'>{index + 1}</th>
      <td>{question.title}</td>
      <td>
        <span className={`badge ${getComplexityColor(question?.complexity)}`}>{question.complexity} </span>
      </td>
    </tr>
  ));

  return (
    <div className='container'>
      <h1>Question List</h1>
      <table ref={tableRef} className='table table-hover table-striped'>
        <thead className='table-dark'>
          <tr>
            <th scope='col' width='100'>
              No.
            </th>
            <th scope='col' width='800'>
              Title
            </th>
            <th scope='col' width='200'>
              Complexity
            </th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>{questionList}</tbody>
      </table>
      <div className='text-md-end'>
        <button type='button' className='btn btn-success' onClick={handleNewQuestionClick}>
          Add
        </button>
      </div>
    </div>
  );
};

export default QuestionList;
