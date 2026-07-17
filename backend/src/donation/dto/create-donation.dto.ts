export class CreateDonationDto {
  name: string;
  email: string;
  phone: string;
  amount: number;

  panNumber?: string;
  transactionId?: string;
  status?: string;
}
