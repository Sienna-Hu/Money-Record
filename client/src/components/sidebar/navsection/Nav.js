import { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Box, List, ListItemText, ListItemIcon, ListItemButton, Typography } from '@mui/material';
import store from '../../../store';
import { handleSelectTable } from '../../../reducers/pageReducer';
// ----------------------------------------------------------------------

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

// ----------------------------------------------------------------------

// NavItem.propTypes = {
//   item: PropTypes.object,
//   tableIndex: PropTypes.number
// };

// function NavItem({ item, tableIndex }) {
//   const { title, value, icon } = item;
//   const isActiveRoot = (value == tableIndex);

//   const changeActiveTable = (value) => {
//     console.log(store.getState())
//     store.dispatch(handleSelectTable(value));
//     console.log(store.getState())
//   }

//   return (
//     <ListItemButton selected={isActiveRoot} onClick={ changeActiveTable(value) }>
//       <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
//       <ListItemText disableTypography primary={title}/>
//     </ListItemButton>
//   );
// }

Nav.propTypes = {
  tableIndex: PropTypes.number
};

export default function Nav() {

  const handlePageChange = (index) => {
    store.dispatch(handleSelectTable(index));
  }

  return (
    <Box>
      <List disablePadding>
        <ListItemButton selected={store.getState().page.tableIndex === 0} onClick={() => handlePageChange(0)} >
          <ListItemText disableTypography primary='个人账本'/>
        </ListItemButton>

        <ListItemButton selected={store.getState().page.tableIndex === 1} onClick={() => handlePageChange(1)} >
          <ListItemText disableTypography primary='待收款'/>
        </ListItemButton>
      </List>
    </Box>
  );
}
