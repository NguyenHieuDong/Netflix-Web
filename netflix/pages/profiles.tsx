import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import 'tailwindcss/tailwind.css'
import useCurrentUser from "@/hooks/useCurrent";

const images = [
  'image/smile.jpeg',
  'image/black.jpeg',
  'image/cat.jpeg'

]

interface UserCardProps {
  name: string;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const UserCard: React.FC<UserCardProps> = ({ name }) => {
  const imgSrc = images[Math.floor(Math.random() * 3)];

  return (
    <div className="group flex-row w-44 mx-auto">
        <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
          <img draggable={false} className="w-max h-max object-contain" src={imgSrc} alt="" />
        </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{name}</div>
   </div>
  );
}

const App = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const selectProfile = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className=" h-full w-full justify-center ">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-black text-center">Ai đang xem?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => selectProfile()}>
            <UserCard name={currentUser?.name} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;