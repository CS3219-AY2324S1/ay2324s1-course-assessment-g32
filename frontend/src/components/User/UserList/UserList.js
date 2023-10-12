import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser, getAllUsers } from '../../../api/UserApi.js';
import { showSuccessToast } from '../../../utils/toast.js';
import { getCookie, getUserId, parseDatetime } from '../../../utils/helpers.js';
import { DeregisterWindow } from '../../ConfirmationWindow/ConfirmationWindows.js';
import { errorHandler } from '../../../utils/errors.js';
import './UserList.css';

const UserList = () => {
  const [userId, setUserId] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [isDeregisterWindowOpen, setDeregisterWindowOpen] = useState(false);
  const [deregisterId, setDeregisterId] = useState(null);

  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getAllUsers(getCookie());
      setTableData(response);
      setIsLoading(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    fetchUserId();
    fetchData();
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

  const handleNewUserClick = () => {
    navigate('/users-management/new');
  };

  const handleEditClick = (id, username) => {
    navigate('/users-management/edit', {
      state: { user: { id: id, username: username } },
    });
  };

  const handleDeregisterClick = (id) => {
    setDeregisterId(id);
    setDeregisterWindowOpen(true);
  };

  const handleDeregisterConfirm = async () => {
    setDeregisterWindowOpen(false);
    try {
      await deleteUser(deregisterId, getCookie());
      fetchData();
      showSuccessToast('User has been deleted successfully!');
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleDeregisterCancel = () => {
    setDeregisterWindowOpen(false);
  };

  const userList = tableData.map((user, index) => (
    <tr key={user.id}>
      <th scope='row'>{index + 1}</th>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{parseDatetime(user.created_at)}</td>
      <td>{parseDatetime(user.updated_at)}</td>
      {user.id === userId ? (
        <td />
      ) : (
        <td>
          <Button
            variant='contained'
            onClick={() => handleEditClick(user.id, user.username)}>
            Edit
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={() => handleDeregisterClick(user.id)}>
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
        <tbody key={userList} className='table-group-divider'>
          {userList}
        </tbody>
      </table>
      <div className='text-md-end'>
        <button
          type='button'
          className='btn btn-success'
          style={{ margin: '5px' }}
          onClick={handleNewUserClick}>
          Register New User
        </button>
      </div>
      {isDeregisterWindowOpen && (
        <DeregisterWindow
          onConfirm={handleDeregisterConfirm}
          onClose={handleDeregisterCancel}
        />
      )}
    </div>
  );
};

export default UserList;
