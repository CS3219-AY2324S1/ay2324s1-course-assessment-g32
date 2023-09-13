import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { getQuestions } from '../../api/QuestionApi.js';
import { showServerErrorToast } from '../../utils/toast.js';
import './QuestionList.css';

const columns = [
  { field: 'no', headerName: 'No.', width: 100, headerClassName: 'theme--header' },
  { field: 'title', headerName: 'Title', width: 800, headerClassName: 'theme--header' },
  { field: 'complexity', headerName: 'Complexity', width: 200, headerClassName: 'theme--header' }
]

const QuestionList = () => {

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questions = await getQuestions();
        setTableData(questions);
      } catch (error) {
        showServerErrorToast(error);
      };
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleRowClick = (params) => {
    navigate('/question/' + params.row._id);
  };

  const handleNewQuestionClick = () => {
    navigate('/new');
  };

  return (
    <Box bgcolor="#2d2d2d" sx={{ height: '80vh', width: '80%', borderRadius: '25px' }}>
      <DataGrid
        rows={
          tableData?.map((row, index) => {
            return {
              no: index + 1,
              ...row
            }
          })
        }
        columns={columns}
        getRowId={(row) => row._id}
        onRowClick={handleRowClick}
        pageSize={12}
        hideFooterPagination
        hideFooterSelectedRowCount
        hideFooter
        rowHeight={60}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              <h2>
                No Questions Found!
              </h2>
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              <h2>
                Search Found No Questions!
              </h2>
            </Stack>
          )
        }}
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

      <Button style={{ maxWidth: '110px', minWidth: '110px', float: 'right' }} variant="contained"
        sx={{ m: 2 }} onClick={handleNewQuestionClick} color="success" startIcon={<AddIcon />}>
        Add
      </Button>
    </Box>

  )
};

export default QuestionList;
