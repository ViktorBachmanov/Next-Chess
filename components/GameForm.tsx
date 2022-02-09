import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import SelectGamer from './SelectGamer'
import SelectWinner from './SelectWinner'

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../app/store";


function mapStateToProps(state: RootState) {
  return {
    users: state.db.users,
  };
}



const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;



interface IFormInputs {
  WhiteUserId: string
}

function GameForm(props: PropsFromRedux) {
  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: {
        WhiteUserId: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data);

  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="WhiteUserId"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
                <SelectGamer 
                    {...field}
                    label='Белые'
                    users={props.users}
                />
            )
        }
      />
      <input type="submit" />
    </form>
  );
}


export default connector(GameForm);