import React from 'react'
import "./singlepostpage.css"
import Sidebar from '../../components/Sidebar/sidebar'
import Singlepost from '../../components/singlepost/singlepost'
const Singlepostpage = () => {
  return (
    <div className="singlepostpage">
        <Singlepost/>
        <Sidebar/>
    </div>
  )
}

export default Singlepostpage