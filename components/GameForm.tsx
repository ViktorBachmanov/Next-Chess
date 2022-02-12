import React, { BaseSyntheticEvent } from "react";
import { useForm, Controller, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import SelectGamer from './SelectGamer'
import SelectWinner from './SelectWinner'

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../app/store";

import { UserData, SendData } from "../types"



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
  whiteUser: string
  blackUser: string
  winner: string
}

function GameForm(props: Props) {
  const { users, games } = props;
  const isDeleteForm = props.formId === 'deleteForm';

  const { handleSubmit, control, watch } = useForm<IFormInputs>();

  const watchWinner = watch('winner');

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    console.log('submit');
    console.log(data);
    if(isDeleteForm) {

    } else {
      let sendData = new SendData(new UserData(parseInt(data.whiteUser), users),
                                  new UserData(parseInt(data.blackUser), users));
      switch(data.winner) {
        case 'white':
          sendData.white.increaseScore(1);
          sendData.winner = parseInt(data.whiteUser);
          break;
        case 'black':
          sendData.black.increaseScore(1);
          sendData.winner = parseInt(data.blackUser);
          break;
        default:
          sendData.white.increaseScore(0.5);
          sendData.black.increaseScore(0.5);
          sendData.winner = null;
          break;
      }
      fetch('/api/game/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sendData),
      });
    }
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
        name="whiteUser"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (

                  <SelectGamer 
                      {...field}
                      label='Белые'
                      users={users}
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
        name="blackUser"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error }  }) => (
                <SelectGamer 
                    {...field}
                    label='Чёрные'
                    users={users}
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
        name="winner"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error }  }) => (
                <SelectWinner 
                    {...field}
                    label='Кто выиграл'
                    users={users}
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