import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './service/file.service';
import { CloudinaryService } from './service/cloudinary.service';
import { FileController } from './controller/file.controller';
import { UserModule } from '../user/user.module';
import { File } from './entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File]), UserModule],
  controllers: [FileController],
  providers: [FileService, CloudinaryService],
  exports: [FileService],
})
export class FileModule {}
