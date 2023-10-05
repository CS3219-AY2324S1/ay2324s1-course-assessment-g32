import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser, getAllUsers } from 'api/UserApi.js';
import { showSuccessToast, showServerErrorToast, showValidationErrorToast } from 'utils/toast.js';
import { parseDatetime } from 'utils/helpers.js';
import 'css/UserList.css';

const UserList = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  const storedUser = JSON.parse(localStorage.getItem('user'));

  const fetchData = async () => {
    getAllUsers()
      .then((res) => {
        setTableData(res);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          showValidationErrorToast(error);
        } else {
          showServerErrorToast(error);
        }
      });
  };

  useEffect(() => {
    if (storedUser) {
      fetchData();
    } else {
      navigate('/login');
    }
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

  const handleNewUserClick = () => {
    navigate('/new');
  }

  const handleEditClick = (id, username) => {
    navigate('/edit', { state: { id: id, username: username } });
  };

  const handleDeleteClick = (id) => {
    deleteUser(id)
      .then(() => {
        fetchData();
        showSuccessToast('User has been deleted successfully!');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          showValidationErrorToast(error);
        } else {
          showServerErrorToast(error);
        }
      });
  };

  const userList = tableData.map((user, index) => (
    <tr key={user.id}>
      <th scope='row'>{index + 1}</th>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{parseDatetime(user.created_at)}</td>
      <td>{parseDatetime(user.updated_at)}</td>
      {user.id === storedUser.id ? (
        <td />
      ) : (
        <td>
          <Button variant='contained' onClick={() => handleEditClick(user.id, user.username)}>
            Edit
          </Button>
          <Button variant='contained' color='error' onClick={() => handleDeleteClick(user.id)}>
            Deregister
          </Button>
        </td>
      )}
    </tr>
  ));

  return isLoading ? (
    <div className='spinner-border text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  ) : (
    <div className='container'>
      <h1>Manage User Profiles</h1>
      <table ref={tableRef} className='table table-hover table-striped'>
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
        <tbody key={userList} className='table-group-divider'>{userList}</tbody>
      </table>
      <div className='text-md-end'>
        <button type='button' className='btn btn-success' onClick={handleNewUserClick}>
          Add
        </button>
      </div>
    </div>
  );
};

export default UserList;
