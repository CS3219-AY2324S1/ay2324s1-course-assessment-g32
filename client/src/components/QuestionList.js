import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import './QuestionList.css';



const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'title', headerName: 'Title', width: 450 }
]

const QuestionList = () => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then((data) => setTableData(data))

  }, [])

  return (

    <Box sx={{ height: '90vh', width: '30%', m:10 }}>
      <DataGrid
        columnHeaderHeight={0}
        rows={tableData}
        columns={columns}
        pageSize={12}
        hideFooterPagination
        hideFooterSelectedRowCount
        hideFooter
        rowHeight={60}
        sx={{
           '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
            backgroundColor: "#171717",
            color: "white",
            fontWeight: 600,

         },
       }}
      />

    </Box>

  )
}

export default QuestionList