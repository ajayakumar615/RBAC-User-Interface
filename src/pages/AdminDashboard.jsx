import React from 'react';
import { Card, CardContent, Typography, Grid, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: 120 },
    { title: 'Active Users', value: 85 },
    { title: 'Total Roles', value: 5 },
    { title: 'Total Permissions', value: 10 },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                '&:hover': {
                  boxShadow: 6, // Hover effect
                  transform: 'scale(1.05)',
                },
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <CardContent>
                <Typography variant="h6">{stat.title}</Typography>
                <Typography variant="h4" color="primary">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Manage Users and Roles
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              component={Link}
              to="/users"
              sx={{
                '&:hover': { backgroundColor: '#1976d2' },
              }}
            >
              User Management
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              component={Link}
              to="/roles"
              sx={{
                '&:hover': { backgroundColor: '#d32f2f' }, 
              }}
            >
              Role Management
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdminDashboard;
