import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envSchema } from './config/env.schema';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { CustomersModule } from './modules/customers/customers.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { TripsModule } from './modules/trips/trips.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: (env) => envSchema.parse(env) }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({ connection: { url: config.getOrThrow<string>('REDIS_URL') } })
    }),
    DatabaseModule,
    AuthModule,
    TripsModule,
    SchedulesModule,
    BookingsModule,
    PaymentsModule,
    NotificationsModule,
    CustomersModule
  ]
})
export class AppModule {}
