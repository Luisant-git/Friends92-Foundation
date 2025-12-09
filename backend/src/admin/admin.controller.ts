import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto, LoginAdminDto } from './dto/create-admin.dto';


@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new admin' })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Admin login' })
  login(@Body() loginAdminDto: LoginAdminDto){
    return this.adminService.login(loginAdminDto)
  }

}
