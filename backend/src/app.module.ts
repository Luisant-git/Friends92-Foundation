import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { BannerModule } from './banner/banner.module';
import { UploadModule } from './upload/upload.module';
import { AlumniModule } from './alumni/alumni.module';

@Module({
  imports: [AdminModule, BannerModule, UploadModule, AlumniModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
