import React from 'react'
import Header from '../../commponts/header/Header'
import TrCat from '../../commponts/trcat/TrCat'
import Cat from '../../commponts/category/Cat'
import Secion1 from '../../commponts/sec1/Secion1'
import Secion2 from '../../commponts/sec2/Secion2'

function Home() {
  return (
    <div>
      <Header/>
      <TrCat/>
      <Cat/>
      <Secion1/>
      <Secion2/>
    </div>
  )
}

export default Home