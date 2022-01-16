import PropTypes from 'prop-types';
// material
import { visuallyHidden } from '@mui/utils';
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

UserListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  onRequestSort: PropTypes.func,
};

export default function UserListHead({
  order,
  rowCount,
  headLabel,
  onRequestSort,
}) {

  return (
    <TableHead>
      <TableRow>
        { headLabel.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={headCell.id === 'date' ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={headCell.id === "date"}
              direction={headCell.id === "date" ? order : 'desc'}
              onClick={onRequestSort}
            >
              {headCell.label}
              {headCell.id === "date" ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'desc' : 'asc'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ) )}
      </TableRow>
    </TableHead>
  )
};