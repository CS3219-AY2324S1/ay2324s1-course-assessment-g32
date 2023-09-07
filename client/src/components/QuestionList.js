import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import './QuestionList.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import questions from '../json/questions.json'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
  { field: 'id', headerName: 'ID', width:100, headerClassName: 'theme--header'},
  { field: 'title', headerName: 'Title', width:900, headerClassName: 'theme--header'},
  { field: 'difficulty', headerName: 'Difficulty', width:200, headerClassName: 'theme--header'}
]

const QuestionList = () => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
  // Dummy Data, to be replaced by Database when set up


    // Set to true to reset cookies to example ones
    const reset = false;

    // Read data from cookies
    const cookieData = Cookies.get('questions');

    if (reset || !cookieData) {
        console.log('Resetting cookies');
        try {
            const dataToStoreString = JSON.stringify(questions);
            Cookies.set('questions', dataToStoreString);

        } catch (error) {
            console.error('Error loading json data::', error);
        }
    }


    try {
      const parsedData = JSON.parse(cookieData);
      setTableData(parsedData);
    } catch (error) {
      console.error('Error parsing cookie data:', error);
    }
    // End of Dummy Data

  }, []);

    const navigate = useNavigate();
    const handleRowClick = (params) => {
      navigate('/question/' + params.row.id);
    };

  return (

    <Box bgcolor="#2d2d2d"  sx={{ height: '90vh', width: '80%', borderRadius: '25px' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        onRowClick={handleRowClick}
        pageSize={12}
        hideFooterPagination
        hideFooterSelectedRowCount
        hideFooter
        rowHeight={60}
        sx={{
            boxShadow: 2,
            border: 2,
            p:2,
            borderRadius: '25px',
           '.MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
            color: "white",
            fontWeight: 600,
            },
            '& .theme--header': {
              backgroundColor: 'rgba(white, 0.55)',
            },
        }}

      />
    <ToastContainer />
    </Box>

  )
}

export default QuestionList