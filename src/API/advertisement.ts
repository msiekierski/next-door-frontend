import axios from "axios";
import IAdvertisement from "../components/Advertisements/Advertisement/IAdvertisement";
import { IHousingAssoc } from "../components/Advertisements/AdvertisementAddForm/HousingAssocList/IHousingAssoc";

export async function getAllAdvertisements(idAccount?: number) {
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

export async function createAdvertisement(newAdvert: IAdvertisement) {
  try {
    const response = await axios.post(`http://localhost:8080/nexDoor/create/announcement`, {
      ...newAdvert,
    });
    return 5;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getAllHousingAssoc() {
  try {
    const { data } = await axios.get<Array<IHousingAssoc>>(`http://localhost:8080/nexDoor/get/housingassoc`, {});
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}
