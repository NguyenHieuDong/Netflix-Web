
import 'tailwindcss/tailwind.css'
import { getSession } from 'next-auth/react'
import { NextPageContext } from 'next'
import Navbar from '@/components/Navbar'
import BillBoard from '@/components/BillBoard'
import useCurrentUser from '@/hooks/useCurrent'

import useMovieList from '@/hooks/useMovieList'
import useFavorites from '@/hooks/useFavorites'
import MovieList from '@/components/MovieList'
import useInfoModalStore from '@/hooks/useInfoModal'
import InfoModal from '@/components/InfoModal'



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
const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModalStore();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar/>
      <BillBoard/>
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        
        <MovieList title="My List" data={favorites} />
      </div>
      
    </>
  )
}
export default Home;
