interface IAdvertisement {
  idAd: number;
  idAccount: number;
  title: string;
  description: string;
  price: number;
  updateAdvertisement: Function;
  removeAdvertisement: Function;
}

export default IAdvertisement;
