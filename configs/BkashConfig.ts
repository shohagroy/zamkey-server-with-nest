/* eslint-disable prettier/prettier */
import { BkashGateway } from 'bkash-payment-gateway';

const bkashConfig: any = {
  baseURL: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta',
  key: '4f6o0cjiki2rfm34kfdadl1eqq',
  username: 'sandboxTokenizedUser02',
  password: 'sandboxTokenizedUser02@12345',
  secret: '2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b',
};

const bkash = new BkashGateway(bkashConfig);

export default bkash;
