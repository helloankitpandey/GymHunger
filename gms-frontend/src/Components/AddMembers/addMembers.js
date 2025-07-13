import React, { useState } from "react";

const AddMember = () => {
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    joiningDate: "",
    memberShip: "",
    profilPic: "",
  });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };
  console.log(inputField);

  return (
    <div className="text-black">
      <div className="grid grid-cols-2 gap-5 text-lg">
        <input
          value={inputField.name}
          onChange={(event) => {handleOnChange(event, "name" ) }}
          placeholder="Name of the Joinee"
          type="text"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 "
        />  
        <input
          value={inputField.mobileNo}
          onChange={(event) => {handleOnChange(event, "mobileNo" ) }}
          placeholder="Mobile No"
          type="text"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 "
        />

        <input
          value={inputField.address}
          onChange={(event) => {handleOnChange(event, "address" ) }}
          placeholder="Address"
          type="text"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 "
        />
        <input
          value={inputField.joiningDate}
          onChange={(event) => {handleOnChange(event, "joiningDate" ) }}
          type="date"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12 "
        />

        <select 
          value={inputField.memberShip} 
          onChange={(event) => {handleOnChange(event, "memberShip")}}
          className="border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray"
        >
          <option>1 Month MemberShip</option>
          <option>2 Month MemberShip</option>
          <option>3 Month MemberShip</option>
          <option>4 Month MemberShip</option>
        </select>

        <input type="file" />

        <div className="w-1/4">
          <img
            src="data:image/png;base64,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"
            className="h-full w-full rounded-full"
          />
        </div>

        <div className="border-2 p-3 w-28 tet-lg h-14 text-center  bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Register
        </div>
      </div>
    </div>
  );
};

export default AddMember;
