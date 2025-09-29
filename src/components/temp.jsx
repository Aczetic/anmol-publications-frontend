import React, { useEffect, useRef, useState } from "react";


//options: the list of options which will show in selectable list
//filter : to filter from the list
// inputProps : props for the input 
const OptionsInput = React.forwardRef((props,ref )=>{  
    const {options,filter,inputProps , onChange , onBlur,name } = props;
    // const [value , setValue] = useState('');
    // const [onFocus , setOnFocus] = useState(false);


    useEffect(()=>{
      
      inputProps.id === 'city' && console.log(filter);
    })
    return (
      <>
        <input
          ref = {ref}
          onChange = {onChange}
          onBlur={onBlur}
          name = {name}
          {...inputProps}
          // onFocus={() => setOnFocus(true)}
          // onBlur={() => setOnFocus(false)}
        />
        {/* {onFocus && (
          <div className="no-scrollbar w-full h-fit max-h-30 flex flex-col gap-[1px] overflow-y-scroll absolute top-[108%] z-100 left-0 bg-[#ddbbbb] rounded-sm">
            {
              options.map((opt,index)=>{
              return <div key = {index} onClick = {()=>{console.log('opt');setValue('hello')}} className="w-full bg-[#faeeee] p-1 font-normal text-xs text-red-800">
               {opt}
            </div>})
            }
          </div>
        )} */}
      </>
    );
  });


  export default OptionsInput;