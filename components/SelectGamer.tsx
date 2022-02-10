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
    onChange: (value: any) => void
    disabled: boolean
  }

const SelectGamer = React.forwardRef(function SelectGamer(props: Props, ref) {
    /*const [gamerId, setGamer] = useState('');

    function handleChange(event: SelectChangeEvent) {
        setGamer(event.target.value);
    }*/

    return (
        <FormControl style={{marginTop: '2rem', width: '12rem'}}>
        <InputLabel>{props.label}</InputLabel>
        <Select
          label={props.label}
          ref={ref}
          onChange={props.onChange}
          disabled={props.disabled}
          defaultValue={props.disabled ? '1' : ''}
        >
         
          {props.users.map(user => (
              <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}

        </Select>
      </FormControl>
    )
});

export default SelectGamer;