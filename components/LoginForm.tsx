import React, { BaseSyntheticEvent, useContext } from "react";

import { StoreContext } from "../pages/index";

import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";

import TextField from "@mui/material/TextField";

import toast from "react-hot-toast";

interface Props {
  formId: string;
  handleClose: () => void;
}

interface IFormInputs {
  userName: string;
  password: string;
}

export default function LoginForm(props: Props) {
  const { handleSubmit, control } = useForm<IFormInputs>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  //const dispatch = useAppDispatch();
  const rootStore = useContext(StoreContext);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    props.handleClose();

    const authToastId = toast.loading("Authenticating...");

    const rslt = fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: data.userName,
        password: data.password,
      }),
    });
    rslt
      .then((res) => {
        const prms = res.text();
        return prms;
      })
      .then((res) => {
        toast.dismiss(authToastId);
        if (res === "fail") {
          toast.error("Authenticating failed");
        } else {
          toast.success("Authenticated successfully");
          //localStorage.setItem(Storage.TOKEN, res);
          //dispatch(setLoginStatus(true));
          rootStore.auth.setToken(res);
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
        name="userName"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            required
            label="ФИО"
            {...field}
            style={{ margin: "2rem 0" }}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <TextField label="Пароль" type="password" {...field} />
        )}
      />
    </form>
  );
}
