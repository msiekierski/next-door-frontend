import axios from "axios";
import IEvent from "../components/Event/IEvent";

export async function putEvent(idEvent: number, title: string, desc: string, eventDate: string) {}

export async function getAllEvents(idAssoc?: number): Promise<Array<IEvent>> {
  try {
    const { data } = await axios.get(`http://localhost:8080/nexDoor/get/events/${idAssoc}`, {});
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function createEvent(newEvent: IEvent): Promise<number> {
  try {
    console.log(newEvent);
    const {data} = await axios.post(`http://localhost:8080/nexDoor/create/event`, {...newEvent, idGroup: 1, desc: newEvent.description})
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return -1;
  }
}
