import { useState } from "react";
import Client from "../core/Client";
import Button from "./Button";
import Input from "./Input";

interface FormProps {
   client: Client
   clientChanged?: (client: Client) => void
   cancelled?: () => void
}

export default  function Form(props: FormProps) {
   const id = props.client?.id 
   // Inside the useState we get the client name n if theres no name we return nothing as default which is inside the empty sigle quote
   const [name, setName] = useState(props.client?.name ?? '')
   // Inside the useState we get the client age n if theres no age we return 0 as default which is set there
   const [age, setAge] = useState(props.client?.age ?? 0)
  return (
   <div>
      {id && <Input text="Code" value={id} readOnly /> }
      <Input 
         text="Name" 
         value={name}
         valueChanged={setName}
         className="mb-2"
      />
      <Input 
         text="Age" 
         type="number" 
         value={age}
         valueChanged={setAge}
         className="mb-4"
      />
      <div className={`flex justify-end`}>
         <Button 
            onClick={() => props.clientChanged?.(new Client(name, +age, id))} 
            className="mr-1">{id ? 'Change' : 'Save'}
         </Button> 
         <Button onClick={props.cancelled}>Cancel</Button>
      </div>
   </div>
  )
};


