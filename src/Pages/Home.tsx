import React from 'react'
import FileUpload from '../Components/FileUpload'
import TextAdd from '../Components/TextAdd'
import BgAnimation from '../Components/BgAnimation'

function Home() {
  return (
    <div className='home' >
        <div className="background-shape-wrapper">
            <div className="square-shape shape"></div>
            <div className="circle-shape shape"></div>
            <div className="circle-shape-2 shape"></div>
        </div>
        <BgAnimation/>
        <div className="container m-auto pt-8 content-wrapper">
            <h2 className='text-center text-inherit text-4xl' >Upload you File/ Image/ Text</h2>
            <div className="uploader-container">
                <FileUpload/>
                <TextAdd/>
            </div>
        </div>
    </div>
  )
}

export default Home