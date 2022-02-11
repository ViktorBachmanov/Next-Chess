import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { User } from '../features/db/types'
import IconKing from './IconKing';


  
  type Props = {
    label: string
    users: User[]
    onChange: (value: any) => void
    disabled: boolean
    defaultValue: string | number
    error: any
    color: string
    transform: string | null
  }

const SelectGamer = React.forwardRef(function SelectGamer(props: Props, ref) {
    /*const [gamerId, setGamer] = useState('');

    function handleChange(event: SelectChangeEvent) {
        setGamer(event.target.value);
    }*/

    return (
      <div style={{display: 'flex'}}>
        <IconKing 
          color={props.color}
          transform={props.transform}
        />
      
        <FormControl 
          style={{
            width: '12rem',
            margin: '1rem 0',
          }}
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
      </div>
    )
});

export default SelectGamer;