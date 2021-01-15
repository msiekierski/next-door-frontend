import axios from "axios";
import IEvent from "../components/Event/IEvent";


export async function putEvent(idEvent: number, title: string, desc: string, eventDate: string) {
    
}

export async function getAllEvents(idAccount: number):Promise<Array<IEvent>> {
    try {
        const {data} = await axios.get(`http://localhost:8080/nexDoor/get/events/${idAccount}`, {});
        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
}