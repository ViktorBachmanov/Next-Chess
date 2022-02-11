import React, { BaseSyntheticEvent } from "react";
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import SelectGamer from './SelectGamer'
import SelectWinner from './SelectWinner'

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../app/store";



function mapStateToProps(state: RootState) {
  return {
    users: state.db.users,
    games: state.db.games,
  };
}



const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  formId: string
  handleClose: () => void
}

interface IFormInputs {
  WhiteUser: string
  BlackUser: string
  Winner: string
}

function GameForm(props: Props) {
  const { games } = props;
  const isDeleteForm = props.formId === 'deleteForm';

  const { handleSubmit, control, watch } = useForm<IFormInputs>();

  const watchWinner = watch('Winner');

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    console.log('submit');
    console.log(data);
    props.handleClose();
  }

  const onError: SubmitErrorHandler<IFormInputs> = 
    (errors: Object, e?: BaseSyntheticEvent) => console.log(errors, e);

  const lastGame = games[games.length - 1];
  let lastGameWinner: string;
  if(lastGame.winner === lastGame.white) {
    lastGameWinner = 'white';
  } else if(lastGame.winner === lastGame.black) {
    lastGameWinner = 'black';
  } else {
    lastGameWinner = 'draw';
  }


  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} id={props.formId}>
      <Controller
        name="WhiteUser"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (

                  <SelectGamer 
                      {...field}
                      label='Белые'
                      users={props.users}
                      disabled={isDeleteForm}
                      defaultValue={isDeleteForm ? lastGame.white : ''}
                      error={error}
                      color={'silver'}
                      transform={watchWinner === 'black' ? 'rotate(-100deg)' : null}
                  />
            )
        }
      />

      <Controller
        name="BlackUser"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error }  }) => (
                <SelectGamer 
                    {...field}
                    label='Чёрные'
                    users={props.users}
                    disabled={isDeleteForm}
                    defaultValue={isDeleteForm ? lastGame.black : ''}
                    error={error}
                    color={'black'}
                    transform={watchWinner === 'white' ? 'rotate(-97deg)' : null}
                />
            )
        }
      />

      <Controller
        name="Winner"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error }  }) => (
                <SelectWinner 
                    {...field}
                    label='Кто выиграл'
                    users={props.users}
                    disabled={isDeleteForm}
                    defaultValue={isDeleteForm ? lastGameWinner : ''}
                    error={error}
                />
            )
        }
      />
    </form>
  );
}


export default connector(GameForm);