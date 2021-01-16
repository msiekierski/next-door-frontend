import axios from "axios";
import IEvent from "../components/Event/IEvent";

export async function putEvent(idEvent: number, title: string, desc: string, eventDate: string) {
  try {
    await axios.put(`http://localhost:8080/nexDoor/put/event/${idEvent}`, {title, desc, eventDate});
  } catch (e) {}
}

export async function getAllEvents(idAssoc?: number): Promise<Array<IEvent>> {
  try {
    const { data } = await axios.get(`http://localhost:8080/nexDoor/get/events/${idAssoc}`, {});
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function createEvent(newEvent: IEvent): Promise<number> {
  try {
    const { data } = await axios.post(`http://localhost:8080/nexDoor/create/event`, {
      ...newEvent,
      idGroup: 1,
      desc: newEvent.description,
    });
    return data;
  } catch (e) {
    return -1;
  }
}

export async function deleteEvent(idEvent: number) {
  try {
    await axios.delete(`http://localhost:8080/nexDoor/delete/event/${idEvent}`, {});
  } catch (e) {}
}
