import 'datatables.net';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import $ from 'jquery';

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import { getQuestions } from '../../api/QuestionApi';
import { errorHandler } from '../../utils/errors';
import { getIsMaintainer, getCookie } from '../../utils/helpers';
import { Tables } from '../../constants';

const QuestionList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [isMaintainer, setIsMaintainer] = useState(false);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataAndInitializeTable = async () => {
      try {
        const questions = await getQuestions(getCookie());
        const isMaintainerResponse = await getIsMaintainer();
        setIsMaintainer(isMaintainerResponse);
        setTableData(questions);
        setIsLoading(false);
      } catch (error) {
        errorHandler(error);
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
      const pageLengthPref =
        sessionStorage.getItem('question-table-page-length') ||
        Tables.Questions.DEFAULT_PAGE_LENGTH;
      dataTableRef.current = $(tableRef.current).DataTable({
        pageLength: pageLengthPref
      });

      // Attach listener: on table pageLength change
      $(tableRef.current).on('length.dt', function ( e, settings, len ) {
        sessionStorage.setItem('question-table-page-length', len);
      });
    }
  }, [tableData]); // Initialize whenever tableData changes

  const handleRowClick = (id) => {
    navigate('/question/' + id);
  };

  const handleNewQuestionClick = () => {
    navigate('/question/new');
  };

  const RenderTags = (tags) => {
    return tags?.map((tag, index) => {
      return (
        <span key={index} className='badge bg-secondary'>
          {tag}
        </span>
      );
    });
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
      <td style={{ maxWidth: '300px', wordWrap: 'break-word' }}>
        {question.title}
      </td>
      <td>{RenderTags(question.tags)}</td>
      <td>
        <span className={`badge ${getComplexityColor(question?.complexity)}`}>
          {question.complexity}
        </span>
      </td>
    </tr>
  ));

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='container'>
      <div className='header'>
        <h1>Question List</h1>
        <div className='text-md-end'>
          {isMaintainer ? (
            <button
              type='button'
              className='btn btn-success'
              onClick={handleNewQuestionClick}
              style={{ margin: '5px 0px' }}>
              Create New Question
            </button>
          ) : null}
        </div>
      </div>
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
              Tag
            </th>
            <th scope='col' width='200'>
              Complexity
            </th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>{questionList}</tbody>
      </table>
    </div>
  );
};

export default QuestionList;
