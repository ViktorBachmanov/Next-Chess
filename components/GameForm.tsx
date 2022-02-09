import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import SelectGamer from './SelectGamer'
import SelectWinner from './SelectWinner'




interface IFormInputs {
  WhiteUserId: string
}

export default function GameForm(props: any) {
  const { handleSubmit, control, reset } = useForm<IFormInputs>({
    defaultValues: {
        WhiteUserId: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data);

  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="WhiteUserId"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
                <SelectGamer 
                    {...field}
                    label='Белые'
                    users={props.users}
                />
            )
        }
      />
      <input type="submit" />
    </form>
  );
}
