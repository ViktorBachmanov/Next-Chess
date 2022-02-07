import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface User {
    id: number;
    name: string;
    //rating: number;
  }
  
  type Props = {
    label: string
    users: User[]
  }

export default function SelectGamer(props: Props) {
    const [gamerId, setGamer] = useState('');

    function handleChange(event: SelectChangeEvent) {
        setGamer(event.target.value);
    }

    return (
        <FormControl style={{marginTop: '2rem', width: '12rem'}}>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={props.label}
          value={gamerId}
          onChange={handleChange}
        >
         
          {props.users.map(user => (
              <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}

        </Select>
      </FormControl>
    )
}