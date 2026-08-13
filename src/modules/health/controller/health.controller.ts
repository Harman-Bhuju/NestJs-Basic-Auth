import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import {
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  @ApiOperation({
    summary: 'Application health check',
    description:
      'Checks database connectivity, disk usage, and process memory (RSS). Intended for uptime monitors / load balancers, not for browser or authenticated clients.',
  })
  @ApiOkResponse({
    description: 'All checks passed.',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        info: {
          type: 'object',
          example: {
            database: { status: 'up' },
            storage: { status: 'up' },
            memory_rss: { status: 'up' },
          },
        },
        error: { type: 'object', example: {} },
        details: {
          type: 'object',
          example: {
            database: { status: 'up' },
            storage: { status: 'up' },
            memory_rss: { status: 'up' },
          },
        },
      },
    },
  })
  @ApiServiceUnavailableResponse({
    description:
      'One or more checks failed (DB unreachable, disk over threshold, or memory RSS over threshold).',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'error' },
        info: { type: 'object', example: {} },
        error: {
          type: 'object',
          example: {
            database: { status: 'down', message: 'connect ECONNREFUSED' },
          },
        },
        details: {
          type: 'object',
          example: {
            database: { status: 'down', message: 'connect ECONNREFUSED' },
            storage: { status: 'up' },
            memory_rss: { status: 'up' },
          },
        },
      },
    },
  })
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),

      () =>
        this.disk.checkStorage('storage', {
          path: process.env.NODE_ENV === 'production' ? '/' : 'C:\\',
          thresholdPercent: Number(
            this.configService.get('HEALTH_DISK_THRESHOLD_PERCENT'),
          ),
        }),

      () =>
        this.memory.checkRSS(
          'memory_rss',
          Number(this.configService.get('HEALTH_MEMORY_RSS_THRESHOLD_MB')) *
            1024 *
            1024,
        ),
    ]);
  }
}
