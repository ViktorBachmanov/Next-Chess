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

import toast from "react-hot-toast";

//import { createGame as createGameAction } from "../features/db/dbSlice";

import { UserData, CreateGameData } from "../types";
//import { gameCreatingMessages } from "../features/db/constants";

import { Storage } from "../constants";

//import { User, Game } from '../features/db/types'

function mapStateToProps(state: RootState) {
  return {
    users: state.db.users,
    games: state.db.games,
  };
}

// const mapDispatchToProps = {
//   createGame: createGameAction,
// };

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  formId: string;
  handleClose: () => void;
};

interface IFormInputs {
  whiteUser: number;
  blackUser: number;
  winner: Won;
  day: Date;
}

function GameCreateForm(props: Props) {
  const { users, games, handleClose } = props;

  const { handleSubmit, control, watch, getValues, setError } =
    useForm<IFormInputs>({
      defaultValues: {
        day: new Date(),
      },
    });

  const watchWinner = watch("winner");

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    // console.log("submit");
    // console.log(data);

    const [whiteId, blackId] = getValues(["whiteUser", "blackUser"]);
    if (whiteId === blackId) {
      setError("whiteUser", {
        type: "manual",
        message: "Сам с собой",
      });
      setError("blackUser", {
        type: "manual",
        message: "Сам с собой",
      });
      return;
    }

    handleClose();

    const startToastId = toast.loading("Game creating...");

    const whiteUser = new UserData(data.whiteUser, users, games);
    const blackUser = new UserData(data.blackUser, users, games);
    let winnerId: number | null;

    const whiteRating = whiteUser.rating;
    const blackRating = blackUser.rating;

    switch (data.winner) {
      case Won.WHITE:
        whiteUser.evalRating(blackRating, 1);
        blackUser.evalRating(whiteRating, 0);
        winnerId = data.whiteUser;
        break;
      case Won.BLACK:
        whiteUser.evalRating(blackRating, 0);
        blackUser.evalRating(whiteRating, 1);
        winnerId = data.blackUser;
        break;
      case Won.DRAW:
      default:
        whiteUser.evalRating(blackRating, 0.5);
        blackUser.evalRating(whiteRating, 0.5);
        winnerId = null;
        break;
    }

    const authToken = localStorage.getItem(Storage.TOKEN)!;

    let sendData: CreateGameData = {
      white: whiteUser,
      black: blackUser,
      winner: winnerId,
      authToken,
      day: data.day.toISOString().substring(0, 10),
    };

    // if (data.day) {
    //   sendData.day = data.day.toISOString().substring(0, 10);
    // }

    //props.handleClose();

    //const rslt = createGame(sendData).unwrap();

    const rslt = fetch("/api/game/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    });

    rslt
      .then((res) => res.text())
      .then((res) => {
        toast.dismiss(startToastId);
        if (res === "Auth error") {
          toast.error("Error when creating");
          //console.log(res);
        } else {
          toast.success("Created successfully");
          window.location.reload();
        }
      });

    //toast.promise(rslt, gameCreatingMessages);
    //rslt.then(() => window.location.reload());
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
