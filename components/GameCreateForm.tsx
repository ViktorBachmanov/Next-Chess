import React, { BaseSyntheticEvent } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import SelectGamer from "./SelectGamer";
import SelectWinner, { Won } from "./SelectWinner";
import LocalizedDatePicker from "./LocalizedDatePicker";

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../app/store";

import { createGame as createGameAction } from "../features/db/dbSlice";

import { UserData, SendData } from "../types";

function mapStateToProps(state: RootState) {
  return {
    users: state.db.users,
    games: state.db.games,
  };
}

const mapDispatchToProps = {
  createGame: createGameAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  formId: string;
  //handleClose: () => void;
};

interface IFormInputs {
  whiteUser: number;
  blackUser: number;
  winner: number;
  day: Date;
}

function GameCreateForm(props: Props) {
  const { users, games, createGame } = props;

  const { handleSubmit, control, watch } = useForm<IFormInputs>({
    defaultValues: {
      day: new Date(),
    },
  });

  const watchWinner = watch("winner");

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log("submit");
    console.log(data);

    let sendData = new SendData(
      new UserData(data.whiteUser, users),
      new UserData(data.blackUser, users)
    );
    switch (data.winner) {
      case Won.WHITE:
        sendData.white.increaseScore(1);
        sendData.winner = data.whiteUser;
        break;
      case Won.BLACK:
        sendData.black.increaseScore(1);
        sendData.winner = data.blackUser;
        break;
      case Won.DRAW:
      default:
        sendData.white.increaseScore(0.5);
        sendData.black.increaseScore(0.5);
        sendData.winner = null;
        break;
    }

    if (data.day) {
      sendData.day = data.day;
    }

    //props.handleClose();

    createGame(sendData);
  };

  const onError: SubmitErrorHandler<IFormInputs> = (
    errors: Object,
    e?: BaseSyntheticEvent
  ) => console.log("Error", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} id={props.formId}>
      <Controller
        name="whiteUser"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <SelectGamer
            {...field}
            label="Белые"
            users={users}
            disabled={false}
            defaultValue=""
            error={error}
            color={"silver"}
            transform={watchWinner === Won.BLACK ? "rotate(-100deg)" : null}
          />
        )}
      />

      <Controller
        name="blackUser"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <SelectGamer
            {...field}
            label="Чёрные"
            users={users}
            disabled={false}
            defaultValue=""
            error={error}
            color={"black"}
            transform={watchWinner === Won.WHITE ? "rotate(-97deg)" : null}
          />
        )}
      />

      <Controller
        name="winner"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <SelectWinner
            {...field}
            label="Кто выиграл"
            users={users}
            disabled={false}
            defaultValue=""
            error={error}
          />
        )}
      />

      <Controller
        name="day"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <LocalizedDatePicker {...field} disabled={false} error={error} />
        )}
      />
    </form>
  );
}

export default connector(GameCreateForm);
