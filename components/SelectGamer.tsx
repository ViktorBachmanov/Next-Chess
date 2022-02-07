import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


interface User {
    id: number;
    name: string;
    rating: number;
  }
  
  type Props = {
    users: User[]
  }

export default function SelectGamer(props: Props) {
    return (
        <FormControl style={{marginTop: '2rem', width: '15rem'}}>
        <InputLabel id="demo-simple-select-label">Белые</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Белые"
          value=''
        >
         
          {props.users.map(user => (
              <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}

        </Select>
      </FormControl>
    )
}