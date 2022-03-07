import React, { BaseSyntheticEvent } from "react";
import SelectGamer from "./SelectGamer";
import SelectWinner, { Won } from "./SelectWinner";
import LocalizedDatePicker from "./LocalizedDatePicker";

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../app/store";

import toast from "react-hot-toast";

import { Storage } from "../constants";

import { UserData, DeleteGameData } from "../types";

function mapStateToProps(state: RootState) {
  return {
    users: state.db.users,
    games: state.db.games,
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  formId: string;
  handleClose: () => void;
};

function GameDeleteForm(props: Props) {
  const { users, games, handleClose } = props;

  const lastGame = games[0];

  const whiteUser = new UserData(lastGame.white, users, games);
  const blackUser = new UserData(lastGame.black, users, games);

  const whiteRating = whiteUser.rating;
  const blackRating = blackUser.rating;

  let lastGameWinner: Won;
  if (lastGame.winner === lastGame.white) {
    lastGameWinner = Won.WHITE;
    whiteUser.evalOldRating(blackRating, 1);
    blackUser.evalOldRating(whiteRating, 0);
  } else if (lastGame.winner === lastGame.black) {
    lastGameWinner = Won.BLACK;
    whiteUser.evalOldRating(blackRating, 0);
    blackUser.evalOldRating(whiteRating, 1);
  } else {
    lastGameWinner = Won.DRAW;
    whiteUser.evalOldRating(blackRating, 0.5);
    blackUser.evalOldRating(whiteRating, 0.5);
  }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    handleClose();

    const startToastId = toast.loading("Game deleting...");

    const authToken = localStorage.getItem(Storage.TOKEN)!;

    let sendData: DeleteGameData = {
      id: lastGame.id,
      white: whiteUser,
      black: blackUser,
      authToken,
    };

    const rslt = fetch("/api/game/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    });

    rslt
      .then((res) => res.text())
      .then((res) => {
        toast.dismiss(startToastId);
        if (res === "Auth error") {
          toast.error("Error when deleting");
        } else {
          toast.success("Deleteted successfully");
          window.location.reload();
        }
      });
  };

  return (
    <form onSubmit={onSubmit} id={props.formId}>
      <SelectGamer
        label="Белые"
        users={users}
        disabled={true}
        defaultValue={lastGame.white}
        color={"silver"}
        transform={lastGameWinner === Won.BLACK ? "rotate(-100deg)" : null}
      />

      <SelectGamer
        label="Чёрные"
        users={users}
        disabled={true}
        defaultValue={lastGame.black}
        color={"black"}
        transform={lastGameWinner === Won.WHITE ? "rotate(-97deg)" : null}
      />

      <SelectWinner
        label="Кто выиграл"
        users={users}
        disabled={true}
        defaultValue={lastGameWinner}
      />

      <LocalizedDatePicker disabled={true} value={new Date(lastGame.date)} />
    </form>
  );
}

export default connector(GameDeleteForm);
