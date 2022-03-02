import React, { BaseSyntheticEvent } from "react";
import SelectGamer from "./SelectGamer";
import SelectWinner, { Won } from "./SelectWinner";
import LocalizedDatePicker from "./LocalizedDatePicker";

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../app/store";

import toast from "react-hot-toast";

import { deleteGame as deleteGameAction } from "../features/db/dbSlice";
import { gameDeletingMessages } from "../features/db/constants";

function mapStateToProps(state: RootState) {
  return {
    users: state.db.users,
    games: state.db.games,
  };
}

const mapDispatchToProps = {
  deleteGame: deleteGameAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  formId: string;
};

function GameDeleteForm(props: Props) {
  const { users, games, deleteGame } = props;
  //const isDeleteForm = props.formId === 'deleteForm';

  const lastGame = games[games.length - 1];
  let lastGameWinner: Won;
  if (lastGame.winner === lastGame.white) {
    lastGameWinner = Won.WHITE;
  } else if (lastGame.winner === lastGame.black) {
    lastGameWinner = Won.BLACK;
  } else {
    lastGameWinner = Won.DRAW;
  }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // const rslt = deleteGame(lastGame.id).unwrap();
    // toast.promise(rslt, gameDeletingMessages);
    // rslt.then(() => window.location.reload());
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

      <LocalizedDatePicker disabled={true} value={lastGame.date} />
    </form>
  );
}

export default connector(GameDeleteForm);
