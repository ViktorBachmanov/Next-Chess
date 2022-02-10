import React, { BaseSyntheticEvent } from "react";
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
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

type Props = PropsFromRedux & {
  formId: string
  handleClose: () => void
}

interface IFormInputs {
  WhiteUserId: string
}

function GameForm(props: Props) {
  const isDeleteForm = props.formId === 'deleteForm';

  const { handleSubmit, control, reset } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    console.log('submit');
    console.log(data);
    props.handleClose();
  }

  const onError: SubmitErrorHandler<IFormInputs> = 
    (errors: Object, e?: BaseSyntheticEvent) => console.log(errors, e);
  

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} id={props.formId}>
      <Controller
        name="WhiteUserId"
        control={control}
        render={({ field }) => (
                <SelectGamer 
                    {...field}
                    label='Белые'
                    users={props.users}
                    disabled={isDeleteForm}
                />
            )
        }
      />
    </form>
  );
}


export default connector(GameForm);