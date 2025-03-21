import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { FactModule } from './fact/fact.module';
import { DateIdeaModule } from './date-idea/date-idea.module';
import { QuestionModule } from './question/question.module';
import { PetModule } from './pet/pet.module';
import { ActivityModule } from './activity/activity.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MovieModule } from './movie/movie.module';
import { PartnershipModule } from './partnership/partnership.module';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from './Auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './Auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), // To load environment variables
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const host = process.env.DB_HOST;
        const port = Number(process.env.DB_PORT);
        const username = process.env.DB_USER;
        const password = process.env.DB_PASSWORD;
        const database = process.env.DB_NAME;
        const ssl = process.env.DB_SSL === 'true';
    
        Logger.log(`DB Host: ${host}`, 'AppModule');
        Logger.log(`DB Port: ${port}`, 'AppModule');
        Logger.log(`DB User: ${username}`, 'AppModule');
        Logger.log(`DB Database: ${database}`, 'AppModule');
        Logger.log(`DB SSL Enabled: ${ssl}`, 'AppModule');

    
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          ssl: ssl ? { rejectUnauthorized: false } : false,
          extra: ssl ? { ssl: { rejectUnauthorized: false } } : {},
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: true,
        };
      },
      inject: [],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({
        headers: req.headers,
      }),
    }),
    UserModule,
    FactModule,
    DateIdeaModule,
    QuestionModule,
    PetModule,
    ActivityModule,
    RestaurantModule,
    MovieModule,
    PartnershipModule,
    AuthModule,
  ],
  providers:[
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ]
})
export class AppModule {}
