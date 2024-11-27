import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '', role: '', status: true });
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const roles = ['Admin', 'Editor', 'Viewer'];

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleOpen = (user = { id: null, name: '', email: '', role: '', status: true }) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => setCurrentUser((prev) => ({ ...prev, role: e.target.value }));

  const handleStatusChange = () => setCurrentUser((prev) => ({ ...prev, status: !prev.status }));

  const handleSaveUser = () => {
    if (currentUser.id) {
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === currentUser.id ? currentUser : user)));
    } else {
      setUsers((prevUsers) => [...prevUsers, { ...currentUser, id: prevUsers.length + 1 }]);
    }
    setOpen(false);
  };

  const handleDeleteUser = (id) => setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

  const handleSearchChange = (e) => setSearch(e.target.value.toLowerCase());

  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const userA = a.name.toLowerCase();
      const userB = b.name.toLowerCase();
      if (userA < userB) return sortOrder === 'asc' ? -1 : 1;
      if (userA > userB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setUsers(sortedUsers);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.role.toLowerCase().includes(search)
  );

  return (
    <div style={{ padding: '20px' }}>
      <h3>User Management</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add User
        </Button>
        <TextField
          variant="outlined"
          placeholder="Search users..."
          size="small"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="outlined" onClick={handleSort}>
          Sort by Name ({sortOrder === 'asc' ? 'Asc' : 'Desc'})
        </Button>
      </div>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(user)}>Edit</Button>
                  <Button onClick={() => handleDeleteUser(user.id)} color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', backgroundColor: 'white' }}>
          <h3>{currentUser.id ? 'Edit User' : 'Add User'}</h3>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={currentUser.name}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={currentUser.email}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <FormControl fullWidth style={{ marginBottom: '10px' }}>
            <InputLabel>Role</InputLabel>
            <Select label="Role" name="role" value={currentUser.role} onChange={handleRoleChange}>
              {roles.map((role, index) => (
                <MenuItem key={index} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Switch checked={currentUser.status} onChange={handleStatusChange} />}
            label="Active"
            style={{ marginBottom: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleSaveUser} fullWidth>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagementPage;