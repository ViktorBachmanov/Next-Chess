import React, { BaseSyntheticEvent, useContext } from "react";

import Link from "next/link";

import Typography from "@mui/material/Typography";

import { StoreContext } from "./Layout";

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
  const { handleSubmit, control, setError, getValues } = useForm<IFormInputs>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

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

          rootStore.auth.setToken(res);
        }
      });
  };

  const onError: SubmitErrorHandler<IFormInputs> = (
    errors: Object,
    e?: BaseSyntheticEvent
  ) => console.log("Error", errors);

  const changePasswordHandle = async (e: any) => {
    const [fio] = getValues(["userName"]);
    if (fio === "") {
      setError("userName", {
        type: "manual",
        message: "Заполните это поле",
      });
      //e.preventDefault();
    } else {
      const response = await fetch("/api/auth/changePassword", {
        method: "POST",
        body: fio,
      });

      const result = await response.json();

      props.handleClose();
    }
  };

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
            error={Boolean(error)}
            helperText={error?.message}
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

      {/* <Link href="/passwordReset/sendMail"> */}
      <Typography
        //align="center"
        variant="body2"
        //component="a"
        //sx={{ flexGrow: 1 }}
        style={{ cursor: "pointer", margin: "2em 0 0 1em" }}
        onClick={changePasswordHandle}
      >
        Изменить пароль
      </Typography>
      {/* </Link> */}
    </form>
  );
}
