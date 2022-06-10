import React, { BaseSyntheticEvent } from "react";
import { useRouter } from "next/router";

import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import toast from "react-hot-toast";

interface IFormInputs {
  userName: string;
  password: string;
}

function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;

  const {
    handleSubmit,
    control,
    //formState: { errors },
    setError,
    getValues,
  } = useForm<IFormInputs>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const passwordToastId = toast.loading("Изменение пароля...");
    const rslt = await fetch("/api/auth/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: data.password,
      }),
    });

    toast.dismiss(passwordToastId);

    if (rslt.ok) {
      toast.success("Пароль изменён");
    } else {
      toast.error("Ошибка");
    }
  };

  const onError: SubmitErrorHandler<IFormInputs> = (
    errors: Object,
    e?: BaseSyntheticEvent
  ) => console.log("Error", errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Controller
        name="userName"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            //required
            label="ФИО"
            {...field}
            style={{ margin: "2rem 0" }}
            error={Boolean(error)}
            helperText={Boolean(error) ? "заполните это поле" : ""}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: true, minLength: 6 }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            label="Новый пароль"
            type="password"
            {...field}
            helperText={Boolean(error) ? "минимум 6 символов" : ""}
            error={Boolean(error)}
          />
        )}
      />

      <Button
        type="submit"
        variant="outlined"
        color="secondary"
        style={{ width: "3em", margin: "2em" }}
      >
        Ок
      </Button>
    </form>
  );
}

export default ResetPassword;
