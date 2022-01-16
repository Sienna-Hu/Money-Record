// material
import { 
  Card, Table, Button, TextField, TableRow, TableBody, Toolbar,
  TableCell, Container, Typography, TableContainer, TablePagination, Checkbox,
  Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from "react";
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import MyTableTitleBar from '../tabletitle/MyTableTitleBar';
import TableHeader from './TableHeader';
import { fDate } from '../../utils/formatTime';
import UserMoreMenu from './UserMoreMenu';
import store from '../../../store';
import {PERSONAL_TABLE_HEAD, COLLECTION_TABLE_HEAD, TAGS as tags} from '../../utils/const4Form';
import AddForm from '../../utils/formComponents/Form';
import { handleSetPPFilter } from '../../../reducers/filterReducer';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, tableIndex) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    if (query == '全部') return stabilizedThis.map((el) => el[0]);
    if (tableIndex == 1) return filter(stabilizedThis.map((el) => el[0]), function(el) { return el.split.includes(query); }) 
    return filter(stabilizedThis.map((el) => el[0]), ['tag', query]);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function MyTable(){
  const tableIndex = store.getState().page.tableIndex

  const tableName = tableIndex == 0 ? '个人账本' : '待收款from';
  const TABLE_HEAD = tableIndex == 0 ? PERSONAL_TABLE_HEAD : COLLECTION_TABLE_HEAD;
  const fetchUrl = tableIndex == 0 ? 'http://localhost:3000/record/personal' : 'http://localhost:3000/record/collection'

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [filterName, setFilterName] = useState('全部');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    const userIdBlob = new Blob(
      [JSON.stringify({user: store.getState().auth.user.googleId}, null, 2)], 
      {type : 'application/json'}
    );
    const options = {
      method: 'POST',
      body: userIdBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch(fetchUrl, options).then(
      res => (
        res.json()
        .then(recordArray => setRows(recordArray))
        .then(() => {
          const ppArrays = rows.map(row => row.splitpp);
            const pp = ppArrays.reduce(function(prev, curr){ prev.concat(curr) });
            store.dispatch(handleSetPPFilter(pp))
          }
        )
      )
    )
  }, [tableIndex]);

  const handleRequestSort = (event) => {
    const isAsc = order === 'desc';
    setOrder(isAsc ? 'asc' : 'desc');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const filteredRecords = applySortFilter(rows, getComparator(order, 'date'), filterName, tableIndex);
  
  const sum = filteredRecords.reduce(function(prev, curr) {
    return prev + Number(curr.amount);
  }, 0)


  return (
    <Container>
      <Card>
        <MyTableTitleBar 
          tableName={tableName}
          tableIndex={tableIndex}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        {/* <Scrollbar> */}
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHeader 
                order={order}
                orderBy='date'
                headLabel={TABLE_HEAD}
                rowCount={rows.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                { filteredRecords
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, date, tag, amount, split, description } = row;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                        >
                          <TableCell component="th" scope="row" padding="none">
                              <Typography variant="subtitle2" noWrap>
                                {fDate(date)}
                              </Typography>
                          </TableCell>
                          <TableCell align="left">{tag}</TableCell>
                          <TableCell align="left">{amount}</TableCell>
                          { tableIndex == 1 && (<TableCell align="left">{split}</TableCell>)}
                          <TableCell align="left">{description}</TableCell>
                          { tableIndex == 0 && (<TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>)}
                          { tableIndex == 1 && (<TableCell align="left"><Checkbox /></TableCell>)}
                        </TableRow>
                      );
                    })}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>总额: {sum}</TableCell>
                    { tableIndex == 1 && (<TableCell></TableCell>) }
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>

                      {/* <Button align='right'
                      variant="contained"
                      onClick={handleOpenAdd}
                      startIcon={<Icon icon={plusFill} />}
                      >
                      添加
                      </Button>  */}
                  <AddForm />
              </TableBody>
            </Table>
          </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Card>
    </Container>
  )
}