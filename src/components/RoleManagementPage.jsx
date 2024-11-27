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
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';

const permissionsList = ['Read', 'Write', 'Delete', 'Update', 'Manage'];

const RoleManagementPage = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({ id: null, name: '', permissions: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPermission, setFilterPermission] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
    setRoles(storedRoles);
  }, []);

  useEffect(() => {
    localStorage.setItem('roles', JSON.stringify(roles));
  }, [roles]);

  const handleOpen = (role = { id: null, name: '', permissions: [] }) => {
    setCurrentRole(role);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handlePermissionChange = (permission) => {
    setCurrentRole((prevRole) => {
      const newPermissions = prevRole.permissions.includes(permission)
        ? prevRole.permissions.filter((perm) => perm !== permission)
        : [...prevRole.permissions, permission];
      return { ...prevRole, permissions: newPermissions };
    });
  };

  const handleSaveRole = () => {
    if (currentRole.id) {
      const updatedRoles = roles.map((role) =>
        role.id === currentRole.id ? currentRole : role
      );
      setRoles(updatedRoles);
    } else {
      const newRole = { ...currentRole, id: roles.length + 1 };
      setRoles([...roles, newRole]);
    }
    setOpen(false);
  };

  const handleDeleteRole = (id) => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    setRoles(updatedRoles);
  };

  const filteredRoles = roles
    .filter((role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((role) =>
      filterPermission ? role.permissions.includes(filterPermission) : true
    )
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <TextField
          label="Search Roles"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '30%' }}
        />
        <Select
          value={filterPermission}
          onChange={(e) => setFilterPermission(e.target.value)}
          displayEmpty
          style={{ width: '30%' }}
        >
          <MenuItem value="">All Permissions</MenuItem>
          {permissionsList.map((perm) => (
            <MenuItem key={perm} value={perm}>
              {perm}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort by Name ({sortOrder === 'asc' ? 'Asc' : 'Desc'})
        </Button>
      </div>

      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Role
      </Button>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.join(', ') || 'None'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(role)} style={{ marginRight: '10px' }}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            padding: '20px',
            maxWidth: '400px',
            margin: '50px auto',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="h5" gutterBottom>
            {currentRole.id ? 'Edit Role' : 'Add Role'}
          </Typography>
          <TextField
            label="Role Name"
            variant="outlined"
            fullWidth
            value={currentRole.name}
            onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <Typography variant="h6" gutterBottom>
            Assign Permissions
          </Typography>
          <FormGroup>
            {permissionsList.map((permission) => (
              <FormControlLabel
                key={permission}
                control={
                  <Checkbox
                    checked={currentRole.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  />
                }
                label={permission}
              />
            ))}
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSaveRole}
            style={{ marginTop: '10px' }}
          >
            Save Role
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default RoleManagementPage;