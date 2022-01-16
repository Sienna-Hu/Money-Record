import React from "react";
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import plusFill from '@iconify/icons-eva/plus-fill';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Icon } from '@iconify/react';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import {TAGS as tags} from "../const4Form";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useForm } from "react-hook-form";
import store from "../../../store";

export default function AddForm() {

  const [date, setDate] = useState(null);
  const [tag, setTag] = useState('');
  const [amount, setAmount] = useState(0);
  const [splitPP, setSplitPP] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    const record = {
      user: store.getState().auth.user.googleId,
      date: date,
      tag: tag,
      amount: amount,
      splitpp: splitPP.split(' '),
      description: description
    }
    const recordBlob = new Blob(
      [JSON.stringify(record, null, 2)], 
      {type : 'application/json'}
    );
    const options = {
      method: 'POST',
      body: recordBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch('http://localhost:3000/record/add', options).then(
      res => resetEverything()
    )
  }

  function resetEverything() {
    setDate(null);
    setTag('');
    setAmount(0);
    setDescription('');
    setSplitPP('');
  }

  return (
    <TableRow>
      <TableCell>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={date}
            required
            onChange={(newDate) => {
              setDate(new Date(newDate.toDateString()));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </TableCell>

      <TableCell>
        <InputLabel id="select-tag">类型</InputLabel>
        <Select
          fullWidth
          labelId="select-tag"
          id="select-tag"
          label="类型"
          required
          value={ tag }
          onChange={(event) => {setTag(event.target.value)}}
        >
          <MenuItem value=''></MenuItem>
          { tags.map ( tag => <MenuItem value={tag} key={tag}> {tag} </MenuItem>)}
        </Select>
      </TableCell>

      <TableCell>
        <TextField
          autoFocus
          margin="dense"
          id="amount"
          label="金额"
          value={ amount }
          required
          onChange={(event) => setAmount(event.target.value)}
          fullWidth
          variant="standard"
        />
      </TableCell>

      <TableCell>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="description"
          value={ description }
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
          variant="standard"
        />
      </TableCell>
      
      <TableCell>
        <TextField
          autoFocus
          margin="dense"
          id="splitPP"
          label="均摊对象"
          value={ splitPP }
          onChange={(event) => setSplitPP(event.target.value)}
          fullWidth
          variant="standard"
        />
      </TableCell>

      <Button align='right'
              variant="contained"
              onClick={handleAdd}
              startIcon={<Icon icon={plusFill} />} />
      
      </TableRow>
  );
}
