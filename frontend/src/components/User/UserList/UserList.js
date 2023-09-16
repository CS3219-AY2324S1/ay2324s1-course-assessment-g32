import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser, getAllUsers } from '../../../api/UserApi.js';
import { parseDatetime } from '../../../utils/helpers.js';
import { showSuccessToast, showServerErrorToast, showValidationErrorToast } from '../../../utils/toast.js';
import './UserList.css';

const UserList = () => {
  const [tableData, setTableData] = useState([]);
  // Used to trigger a re-fetch of the data when a user is deleted
  const [fetchUsers, setFetchUsers] = useState(true);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllUsers();
        setTableData(users);
        setFetchUsers(false);
      } catch (error) {
        navigate('../');
        if (error.response.status === 400) {
          showValidationErrorToast(error);
        } else {
          showServerErrorToast(error);
        }
      }
    };
    fetchData();
  }, [setTableData, navigate, fetchUsers]);

  useEffect(() => {
    // Initialize DataTables after the data has been set and the table is rendered
    if (tableRef.current && tableData.length > 0) {
      console.log(tableData);
      // Destroy the existing DataTable instance if it exists
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
      }

      // Initialize DataTables
      dataTableRef.current = $(tableRef.current).DataTable();
    }
  }, [tableData]); // Initialize whenever tableData changes

  const handleEditClick = (id, username) => {
    navigate('/user-management/edit', { state: { id: id, username: username } });
  };

  const handleDeleteClick = (id) => {
    try {
      deleteUser(id);
      setFetchUsers(true);
      showSuccessToast('User has been deleted successfully!');
    } catch (error) {
      navigate('../');
      if (error.response.status === 400) {
        showValidationErrorToast(error);
      } else {
        showServerErrorToast(error);
      }
    }
  };

  const userList = tableData.map((user, index) => (
    <tr key={user.id}>
      <th scope='row'>{index + 1}</th>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{parseDatetime(user.created_at)}</td>
      <td>{parseDatetime(user.updated_at)}</td>
      <td>
        <Button variant='contained' onClick={() => handleEditClick(user.id, user.username)}>
          Edit
        </Button>
        <Button variant='contained' color='error' onClick={() => handleDeleteClick(user.id)}>
          Deregister
        </Button>
      </td>
    </tr>
  ));

  return (
    <div className='container'>
      <h1>User Management</h1>
      <table ref={dataTableRef} className='table table-hover table-striped'>
        <thead className='table-dark'>
          <tr>
            <th scope='col' width='50'>
              No.
            </th>
            <th scope='col' width='400'>
              Username
            </th>
            <th scope='col' width='400'>
              Email
            </th>
            <th scope='col' width='400'>
              Created At
            </th>
            <th scope='col' width='400'>
              Updated At
            </th>
            <th scope='col' width='300'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>{userList}</tbody>
      </table>
    </div>
  );
};

export default UserList;
