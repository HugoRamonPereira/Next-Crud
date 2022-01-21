interface InputProps {
   type?: 'text' | 'number'
   text: string
   value: any
   readOnly?: boolean
   className?: string
   valueChanged?: (value: any ) => void
}

export default  function Input(props: InputProps) {
  return (
   // Added props.className that respects the interface above and now I can use a classname that will affect this div  
   // because I am using the <Input /> component there and now whaterver I pass there via className will affect here
   <div className={`flex flex-col ${props.className}`}>
      <label className={`mb-2`}>
         {props.text}
      </label>
      <input 
         type={props.type ?? 'text'} 
         value={props.value}
         readOnly={props.readOnly}
         onChange={e => props.valueChanged?.(e.target.value) }
         className={`
            border border-purple-500 rounded-lg
            focus:outline-none bg-gray-100 px-4 py-2 
            ${props.readOnly ? '' : 'focus:bg-white'}
         `}
      />
   </div>
  )
};


