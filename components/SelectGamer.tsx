import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { User } from '../features/db/types'


  
  type Props = {
    label: string
    users: User[]
    onChange: (value: any) => void
    disabled: boolean
    defaultValue: string | number
    error: any
  }

const SelectGamer = React.forwardRef(function SelectGamer(props: Props, ref) {
    /*const [gamerId, setGamer] = useState('');

    function handleChange(event: SelectChangeEvent) {
        setGamer(event.target.value);
    }*/

    return (
        <FormControl 
          style={{marginTop: '2rem', width: '12rem'}}
          error={Boolean(props.error)}
        >
        <InputLabel>{props.label}</InputLabel>
        <Select
          label={props.label}
          ref={ref}
          onChange={props.onChange}
          disabled={props.disabled}
          defaultValue={props.defaultValue}
        >
         
          {props.users.map(user => (
              <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
          ))}

        </Select>
        
        {props.error &&
          <FormHelperText>Выберите игрока</FormHelperText>
        }
      </FormControl>
    )
});

export default SelectGamer;