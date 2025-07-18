import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';

const Modal = ({handleClose,content,header,widthClass = "w-1/2", heightClass = ""}) => {
  return (
    <div className='w-full h-[100vh] fixed bg-black bg-opacity-50 text-black top-0 left-0 flex justify-center'>
        <div className={`w-4/5 ${widthClass} ${heightClass} bg-white rounded-lg mt-32 pt-5 px-5 pb-0 sm:w-auto md:w-3/5 lg:w-1/2 max-h-[80vh] overflow-y-auto scrollbar-hide mb-6`}>
            <div className='flex justify-between '>
                <div className='text-4xl font-semibold' >{header}</div>
                <div onClick={handleClose} className='cursor-pointer' ><CancelIcon sx={{fontSize:"32px"}} /></div>
            </div>
            <div className='mt-10'>
                {content}
            </div>
        </div>
    </div>
  )
}


export default Modal