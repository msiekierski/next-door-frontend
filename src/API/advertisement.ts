import axios from "axios";
import IAdvertisement from "../components/Advertisements/Advertisement/IAdvertisement";

export async function getAllAdvertisements(idAccount?: number): Promise<Array<IAdvertisement>> {
  try {
    const { data } = await axios.get<Array<IAdvertisement>>(
      `http://localhost:8080/nexDoor/get/ads/advert/${idAccount}`,
      {}
    );
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function putAdvertisement(adId: number, title: string, description: string) {
  try {
    const response = await axios.put(`http://localhost:8080/nexDoor/put/ad/${adId}`, {
      title,
      description,
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

export async function deleteAdvertisement(adId: number) {
  try {
    const response = await axios.delete(`http://localhost:8080/nexDoor/delete/ad/${adId}`, {});
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
