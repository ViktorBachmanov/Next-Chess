import type { NextPage } from 'next'
import SelectGamer from '../../components/SelectGamer'

import type { GetStaticProps } from 'next'
import prisma from '../../lib/prisma';
import createMainTheme, { LightStatus } from '../../lib/muiTheme';

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany();
  
  return { props: { users } };
};

interface User {
  id: number;
  name: string;
  rating: number;
}

type Props = {
  users: User[]
}

const mainTheme = createMainTheme(LightStatus.DARK);

export default function NewGame(props: Props) {
    return (
        <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <div>
            <SelectGamer
                label='Белые'
                users={props.users}
            />

            <SelectGamer
                label='Чёрные'
                users={props.users}
            />
        </div>
        </ThemeProvider>
    )
}