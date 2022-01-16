import * as React from 'react';
import MyTable from '../components/main/table/MyTable';
import { Box } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

export default function Dashboard() {

  return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <MyTable />
        </Box>
      </Box>
  )

}