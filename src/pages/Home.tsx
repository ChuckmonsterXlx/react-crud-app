import React from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux/index'

const Home = () => {
  const { note } = useAppSelector((state) => state);
  console.log(note);

  return (
    <div>
      <h1>Bienvenido, usuario</h1>
    </div>
  )
}

export default Home