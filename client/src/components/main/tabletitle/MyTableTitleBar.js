// material
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  Button,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { TAGS as tags } from '../../utils/const4Form'
import store from '../../../store';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

MyTableTitleBar.propTypes = {
  tableName: PropTypes.string,
  tableIndex: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function MyTableTitleBar({ tableName, tableIndex, filterName, onFilterName}) {
  const dropDownItems = tableIndex == 0 ? tags : store.getState().filter.ppFilters

  return (
    <RootStyle>
      <Typography variant="h4" gutterBottom>
        {tableName}
      </Typography>
      <DropdownButton id="dropdown-basic-button" title = { filterName } align="end">
        {dropDownItems.map(item => (
          <Dropdown.Item as='button' value={ item } onClick={ onFilterName }>{ item }</Dropdown.Item>
        ))}
      </DropdownButton>
    </RootStyle>
  );
}