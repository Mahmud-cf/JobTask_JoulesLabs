import React from 'react'
import BgAnimation from '../Components/BgAnimation'
import FileUploader from '../Components/PdfTest'
import TextAdd from '../Components/TextAdd'
import FileUpload from '../Components/FileUpload'
import TestAddText from '../Components/TestAddText'

function Home() {
  return (
    <div className='home' >
        <div className="background-shape-wrapper">
            <div className="square-shape shape"></div>
            <div className="circle-shape shape"></div>
            <div className="circle-shape-2 shape"></div>
        </div>
        {/* <BgAnimation/> */}
        <div className="container m-auto pt-8 content-wrapper">
            <h2 className='text-center text-inherit text-4xl' >Upload you File/ Image/ Text</h2>
            <div className="uploader-container">
                {/* <FileUploader/> */}
                <FileUpload/>
                {/* <TextAdd/> */}
                <TestAddText/>
            </div>
        </div>
    </div>
  )
}

export default Home