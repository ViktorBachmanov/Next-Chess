import React, { BaseSyntheticEvent, useContext, useEffect } from "react";

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
  const { handleSubmit, control, setError, clearErrors, getValues, watch } =
    useForm<IFormInputs>({
      defaultValues: {
        userName: "",
        password: "",
      },
    });

  const watchUserName = watch("userName");
  useEffect(() => {
    if (watchUserName) {
      clearErrors("userName");
    }
  }, [watchUserName, clearErrors]);

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
        message: "?????????????????? ?????? ????????",
      });
    } else {
      const response = await fetch("/api/auth/sendPasswordChangeLink", {
        method: "POST",
        body: fio,
      });

      if (response.ok) {
        props.handleClose();
        toast.success("?????? ???? ?????????? ???????????????????? ????????????");
      } else {
        const message = await response.text();
        toast.error(message);
      }
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
            //required
            label="??????"
            {...field}
            style={{ margin: "2rem 0" }}
            error={Boolean(error)}
            //helperText={error?.message}
            helperText={Boolean(error) ? "?????????????????? ?????? ????????" : ""}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            label="????????????"
            type="password"
            {...field}
            error={Boolean(error)}
            helperText={Boolean(error) ? "?????????????????? ?????? ????????" : ""}
          />
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
        ???????????????? ????????????
      </Typography>
      {/* </Link> */}
    </form>
  );
}
