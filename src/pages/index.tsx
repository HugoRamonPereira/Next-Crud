import Button from "../components/Button";
import Form from "../components/Form";
import { NewUserIcon } from "../components/Icons";
import Layout from "../components/Layout"
import Table from "../components/Table"
import useClients from "../hooks/useClients";

export default function Home() {

  const { client, clients, newClient, selectClient, deleteClient, saveClient, tableVisible, showTable } = useClients()

  return (
    <div className={`
    flex h-screen justify-center items-center
    bg-gradient-to-r from-blue-600 to-purple-600
    text-white
    `}>
      <Layout title="Client Registration">
        {tableVisible ? (
          <>
            <div>
              <Button className={`mb-4 flex gap-1`} onClick={newClient}>{NewUserIcon}New Client</Button>
            </div>
            <Table clients={clients} clientSelected={selectClient} clientDeleted={deleteClient}></Table>
          </>
          ) : <Form client={client} cancelled={showTable} clientChanged={saveClient} />
        }
      </Layout>
    </div>
  )
}
