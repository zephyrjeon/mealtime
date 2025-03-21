import {
  createMenuItemInput,
  CreateMenuItemInput,
} from '~/schemas/merchant/inputs/createMenuItemInput';
import {
  CreateMerchantInput,
  createMerchantInput,
} from '~/schemas/merchant/inputs/createMerchantInput';

export class Validator {
  createMerchantInput(data: unknown): CreateMerchantInput {
    return createMerchantInput.parse(data);
  }
  createMenuItemInput(data: unknown): CreateMenuItemInput {
    return createMenuItemInput.parse(data);
  }
}

export const validator = new Validator();
