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
  password: string;
}

function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;

  const { handleSubmit, control, setError, getValues } = useForm<IFormInputs>({
    defaultValues: {
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
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <h2>{token}</h2>
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <TextField label="Новый пароль" type="password" {...field} />
        )}
      />

      <Button type="submit" variant="contained" color="secondary">
        Ок
      </Button>
    </form>
  );
}

export default ResetPassword;
