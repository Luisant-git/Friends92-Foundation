import { Injectable} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannerService {
  private prisma = new PrismaClient();

 
  async create(createBannerDto: CreateBannerDto) {
    const { title, imageUrl, adminId } = createBannerDto;

   
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });
    if (!admin)
      throw new Error(`Admin with ID ${adminId} not found`);

    return this.prisma.banner.create({
      data: {
        title,
        imageUrl,
        admin: { connect: { id: adminId } },
      },
      include: {
        admin: {
          select: { id: true},
        },
      },
    });
  }

 
  async findAll() {
    return this.prisma.banner.findMany({
      include: {
        admin: {
          select: { id: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

 
  async findOne(id: number) {
    const banner = await this.prisma.banner.findUnique({
      where: { id },
      include: { admin: true },
    });
    if (!banner) throw new Error(`Banner with ID ${id} not found`);
    return banner;
  }

 
  async update(id: number, updateBannerDto: UpdateBannerDto) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    if (!banner) throw new Error(`Banner with ID ${id} not found`);

    return this.prisma.banner.update({
      where: { id },
      data: updateBannerDto,
    });
  }

  async remove(id: number) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    if (!banner) throw new Error(`Banner with ID ${id} not found`);

    await this.prisma.banner.delete({ where: { id } });
    return { message: 'Banner deleted successfully' };
  }
}
