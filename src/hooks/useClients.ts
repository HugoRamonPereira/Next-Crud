import { useEffect, useState } from "react"
import ClientCollection from "../backend/db/ClientCollection"
import Client from "../core/Client"
import ClientRepo from "../core/ClientRepo"
import useTableOrForm from "./useTableOrForm"

export default function useClients() {

   const repo: ClientRepo = new ClientCollection()

   const { tableVisible, formVisible, showTable, showForm } = useTableOrForm()

   // this means that useState will have 2 possible states and by default table is set
   const [client, setClient] = useState<Client>(Client.empty())
   const [clients, setClients] = useState<Client[]>([])

   useEffect(obtainALl, []) 
   
   function obtainALl() {
      repo.obtainAll().then(clients => {
         setClients(clients)
         showTable()
      }) 
   }

   async function saveClient(client: Client) {
      await repo.save(client)
      obtainALl()
   }

   function selectClient(client: Client) {
      setClient(client)
      showForm()
   }

   async function deleteClient(client: Client) {
      await repo.exclude(client)
      obtainALl()
   }

   function newClient() {
      setClient(Client.empty())
      showForm()
   }

   return {
      client,
      clients,
      newClient,
      saveClient,
      selectClient,
      deleteClient,
      tableVisible,
      showTable
   }
}