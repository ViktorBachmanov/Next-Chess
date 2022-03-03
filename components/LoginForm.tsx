import React, { BaseSyntheticEvent } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";

import TextField from "@mui/material/TextField";

import toast from "react-hot-toast";

import bcrypt from "bcrypt";

import { setLoginStatus } from "../features/auth/authSlice";

import { Storage } from "../constants";

//import { authMessages } from "../features/auth/constants";

interface Props {
  formId: string;
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

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log("submit");
    console.log(data);

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
        //console.log(res);
        const prms = res.text();
        return prms;
      })
      .then((res) => {
        console.log(res);
        //console.log(document.cookie);
        toast.dismiss(authToastId);
        if (res === "fail") {
          toast.error("Authenticating failed");
        } else {
          toast.success("Authenticated successfully");
          localStorage.setItem(Storage.TOKEN, res);
          dispatch(setLoginStatus(true));
        }
      });
    //toast.promise(rslt, authMessages);
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
