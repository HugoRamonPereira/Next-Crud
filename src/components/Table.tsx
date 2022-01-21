import Client from "../core/Client";
import { EditIcon, TrashIcon } from "./Icons";

interface TableProps{
   clients: Client[]
   clientSelected?: (client: Client) => void
   clientDeleted?: (client: Client) => void 
}

export default function Table(props: TableProps) {

   const displayActions = props.clientSelected || props.clientDeleted

   function renderHeader() {
      return (
         <tr>
            <th className="text-left p-3">Code</th>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Age</th>
            {displayActions && <th className="p-3">Actions</th>}
         </tr>
      )
   }

   function renderData() {
      return props.clients?.map((client, i) => {
         return (
            <tr key={client.id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
               <td className="pl-6">{client.id}</td>
               <td className="text-left p-3">{client.name}</td>
               <td className="pl-4">{client.age}</td>
               {displayActions && renderActions(client)}
            </tr>
         )
      })
   }

   function renderActions(client: Client) {
      return (
         <td className={`flex justify-center`}>
            {props.clientSelected ? (
            <button 
               onClick={() => props.clientSelected?.(client)}
               className={`flex justify-center items-center text-green-500 rounded-full hover:bg-white p-1 m-1.5`}>{EditIcon}</button>
            ) : false }
            {props.clientDeleted ? (
               <button 
                  onClick={() => props.clientDeleted?.(client)}
                  className={`flex justify-center items-center text-red-500 rounded-full hover:bg-white p-1 m-1.5`}>{TrashIcon}</button>
            ) : false } 
         </td>
      )
   }

   return (
      <table className={`w-full rounded-xl overflow-hidden`}>
         <thead className={`bg-gradient-to-r from-purple-500 to-purple-700 text-gray-100`}>
            {renderHeader()}
         </thead>
         <tbody>
            {renderData()}
         </tbody>
      </table>
   )
}