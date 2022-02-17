import React, { BaseSyntheticEvent } from "react";
import SelectGamer from "./SelectGamer";
import SelectWinner from "./SelectWinner";

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../app/store";

import { deleteGame as deleteGameAction } from "../features/db/dbSlice";

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
  handleClose: () => void;
};

interface IFormInputs {
  whiteUser: string;
  blackUser: string;
  winner: string;
}

function GameDeleteForm(props: Props) {
  const { users, games, deleteGame } = props;
  //const isDeleteForm = props.formId === 'deleteForm';

  const onSubmit = () => {
    //deleteGame();

    props.handleClose();
  };

  const lastGame = games[games.length - 1];
  let lastGameWinner: string;
  if (lastGame.winner === lastGame.white) {
    lastGameWinner = "white";
  } else if (lastGame.winner === lastGame.black) {
    lastGameWinner = "black";
  } else {
    lastGameWinner = "draw";
  }

  return (
    <form onSubmit={onSubmit} id={props.formId}>
      <SelectGamer
        label="Белые"
        users={users}
        disabled={true}
        defaultValue={lastGame.white}
        color={"silver"}
        transform={lastGameWinner === "black" ? "rotate(-100deg)" : null}
      />

      <SelectGamer
        label="Чёрные"
        users={users}
        disabled={true}
        defaultValue={lastGame.black}
        color={"black"}
        transform={lastGameWinner === "white" ? "rotate(-97deg)" : null}
      />

      <SelectWinner
        label="Кто выиграл"
        users={users}
        disabled={true}
        defaultValue={lastGameWinner}
      />
    </form>
  );
}

export default connector(GameDeleteForm);
