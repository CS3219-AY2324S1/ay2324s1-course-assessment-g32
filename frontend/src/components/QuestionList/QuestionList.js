import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import questions from '../../json/questions.json'
import '../QuestionList.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 100, headerClassName: 'theme--header' },
  { field: 'title', headerName: 'Title', width: 900, headerClassName: 'theme--header' },
  { field: 'difficulty', headerName: 'Difficulty', width: 200, headerClassName: 'theme--header' }
]

const QuestionList = () => {
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    // Dummy Data, to be replaced by Database when set up

    const dataToStore = questions;
    const dataToStoreString = JSON.stringify(dataToStore);

    Cookies.set('questions', dataToStoreString, { expires: 7 });

    // End of Dummy Data

    // Read data from cookies
    const cookieData = Cookies.get('questions');

    if (cookieData) {
      try {
        const parsedData = JSON.parse(cookieData);
        setTableData(parsedData);
      } catch (error) {
        console.error('Error parsing cookie data:', error);
      }
    }
  }, []);

  const navigate = useNavigate();
  const handleRowClick = (params) => {
    navigate('/question/' + params.row.id);
  };

  return (

    <Box bgcolor="#2d2d2d" sx={{ height: '90vh', width: '80%', borderRadius: '25px' }}>
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
          p: 2,
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

    </Box>

  )
}

export default QuestionList
