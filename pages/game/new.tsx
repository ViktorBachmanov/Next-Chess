import type { NextPage } from 'next'
import SelectGamer from '../../components/SelectGamer'

import type { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma';


export const getServerSideProps: GetServerSideProps = async () => {
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


export default function NewGame(props: Props) {
    return (
        <div>
            <SelectGamer users={props.users}/>
        </div>
    )
}