import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      await this.dataSource.query('SELECT 1'); // Test the connection
      this.logger.log('Database connection successful');
    } catch (error) {
      this.logger.error('Database connection failed:', error);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
