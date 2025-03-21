import { CreateMerchantInput } from '~/schemas/merchant/inputs/createMerchantInput';
import { utils } from '~/utils/utils';
import { validator } from '~/validators/validator';
import { merchantRepo, MerchantRepo } from '../repositories/MerchantRepo';

export class MerchantService {
  repo: MerchantRepo;

  constructor(repo: MerchantRepo) {
    this.repo = repo;
  }

  async create(data: CreateMerchantInput) {
    const validated = validator.createMerchantInput(data);

    let imageLink = undefined;

    if (!!validated.image) {
      const { url } = await utils.uploadFile({ file: validated.image });
      imageLink = url;
    }

    const newMerchant = await this.repo.create({
      userId: validated.userId,
      name: validated.name,
      address: validated.address,
      phoneNumber: validated.phoneNumber,
      cuisines: validated.cuisines,
      image: imageLink,
    });

    return newMerchant;
  }

  async getMy(userId: string) {
    return this.repo.findOneByUserId(userId);
  }

  async getList() {
    return this.repo.findAll();
  }
}

export const merchantService = new MerchantService(merchantRepo);
