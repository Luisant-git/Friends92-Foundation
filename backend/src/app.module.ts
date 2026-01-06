import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { BannerModule } from './banner/banner.module';
import { UploadModule } from './upload/upload.module';
import { AlumniModule } from './alumni/alumni.module';
import { GalleryModule } from './gallery/gallery.module';
import { PlacementModule } from './placement/placement.module';
import { CategoryModule } from './category/category.module';
import { EventsModule } from './events/events.module';
import { ServicesModule } from './services/services.module';
import { TeamModule } from './team/team.module';
import { TrustModule } from './trust/trust.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { TaskModule } from './task/task.module';
import { ReportsModule } from './reports/reports.module';
import { FinancialModule } from './financial/financial.module';

@Module({
  imports: [AdminModule, BannerModule, UploadModule, AlumniModule, GalleryModule, PlacementModule, CategoryModule, EventsModule, ServicesModule, TeamModule, TrustModule, VolunteerModule, TaskModule, ReportsModule, FinancialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
