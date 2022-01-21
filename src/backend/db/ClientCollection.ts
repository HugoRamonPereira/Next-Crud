import firebase from '../config'
import Client from "../../core/Client";
import ClientRepo from "../../core/ClientRepo";

export default class ClientCollection implements ClientRepo {

   #converter = {
      toFirestore(client: Client) {
         return {
            name: client.name,
            age: client.age
         }
      },
      fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) : Client {
         const data = snapshot.data(options)
         return new Client(data.name, data.age, snapshot.id) 
      } 
   }

   async save(client: Client): Promise<Client> {
      if(client?.id) {
         await this.collection().doc(client.id).set(client)
         return client
      } else {
         const documentRef = await this.collection().add(client)
         const document = await documentRef.get()
         return document.data()
      }
   }
   async exclude(client: Client): Promise<void> {
      return this.collection().doc(client.id).delete()
   }
   async obtainAll(): Promise<Client[]> {
      const query = await this.collection().get()
      return query.docs.map(doc => doc.data()) ?? []   
   }

   private collection(){
      return firebase
         .firestore().collection('clients')
         .withConverter(this.#converter)
   }
}