interface IAdvertisement {
  idAd: number;
  idAccount: number;
  title: string;
  description: string;
  price: number;
  status?: number;
  updateAdvertisement?: Function;
  removeAdvertisement?: Function;
  housingAssocList?: number[];
}

export default IAdvertisement;
