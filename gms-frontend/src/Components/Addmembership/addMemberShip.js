import React from 'react'

const AddMemberShip = () => {
  return (
    <div>
        {/* for upper part */}
        <div className='flex flex-wrap gap-5 items-center justify-center'>

            {/* block for membership details */}
            <div className='text-lg bg-slate-900 text-white border-2 pl-2 pr-2 pt-1 pb-1 rounded-xl font-semibold flex-col gap-3 justify-center hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>
                <div>1 Months MemberShip</div>
                <div className='items-center justify-center pl-14' >Rs 1000</div>
            </div>

            <div className='text-lg bg-slate-900 text-white border-2 pl-2 pr-2 pt-1 pb-1 rounded-xl font-semibold flex-col gap-3 justify-center hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>
                <div>1 Months MemberShip</div>
                <div className='items-center justify-center pl-14' >Rs 1000</div>
            </div>


        </div>

        <hr className='mt-10 mb-10' />
        {/* for lower part */}
        <div className='flex gap-10 mb-8'>
            <input className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2' type='number' placeholder='Add No. of Months' />
            <input className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2' type='number' placeholder='Add Price' />
            <div className='text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>
                Add+ 
            </div>
        </div>
    </div>
  )
}

export default AddMemberShip;