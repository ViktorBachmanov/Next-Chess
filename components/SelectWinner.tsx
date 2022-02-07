import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const label = 'Кто выиграл';


export default function SelectWinner() {
    //const [gamerId, setGamer] = useState('');
/*
    function handleChange(event: SelectChangeEvent) {
        setGamer(event.target.value);
    }*/

    return (
        <FormControl style={{marginTop: '2rem', width: '12rem'}}>
        <InputLabel>{label}</InputLabel>
        <Select
          id="winner"
          label={label}
          defaultValue=''
        >
         
          <MenuItem value='white'>Белые</MenuItem>
          <MenuItem value='black'>Чёрные</MenuItem>
          <MenuItem value='draw'>Ничья</MenuItem>

        </Select>
      </FormControl>
    )
}