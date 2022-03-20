import React, { BaseSyntheticEvent, useContext } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import SelectGamer from "./SelectGamer";
import SelectWinner, { Won } from "./SelectWinner";
import LocalizedDatePicker from "./LocalizedDatePicker";

import toast from "react-hot-toast";

import { UserData, CreateGameData } from "../types";

import { StoreContext } from "../pages/index";

interface Props {
  formId: string;
  handleClose: () => void;
}

interface IFormInputs {
  whiteUser: number;
  blackUser: number;
  winner: Won;
  day: Date;
}

function GameCreateForm(props: Props) {
  const { handleClose } = props;

  const rootStore = useContext(StoreContext);
  const users = rootStore.tables.allUsers;
  const games = rootStore.tables.allGames;
  const authStore = rootStore.auth;

  const { handleSubmit, control, watch, getValues, setError } =
    useForm<IFormInputs>({
      defaultValues: {
        day: new Date(),
      },
    });

  const watchWinner = watch("winner");

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
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

    const authToken = authStore.token;

    let sendData: CreateGameData = {
      white: whiteUser,
      black: blackUser,
      winner: winnerId,
      authToken,
      day: data.day.toISOString().substring(0, 10),
    };

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
        } else {
          toast.success("Created successfully");
          window.location.reload();
        }
      });
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

export default GameCreateForm;
