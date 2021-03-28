interface IPrivateMessage {
  id_sender: number;
  id_receiver: number;
  receiver_name: string;
  receiver_surname: string;
  message: string;
  send_date: string;
}

export default IPrivateMessage;
