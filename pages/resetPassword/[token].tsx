import React, { BaseSyntheticEvent } from "react";
import { useRouter } from "next/router";

import {
  useForm,
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";

import TextField from "@mui/material/TextField";

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

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    // const authToastId = toast.loading("Authenticating...");
    // const rslt = fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     userName: data.userName,
    //     password: data.password,
    //   }),
    // });
    // rslt
    //   .then((res) => {
    //     const prms = res.text();
    //     return prms;
    //   })
    //   .then((res) => {
    //     toast.dismiss(authToastId);
    //     if (res === "fail") {
    //       toast.error("Authenticating failed");
    //     } else {
    //       toast.success("Authenticated successfully");
    //       rootStore.auth.setToken(res);
    //     }
    //   });
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
    </form>
  );
}

export default ResetPassword;
