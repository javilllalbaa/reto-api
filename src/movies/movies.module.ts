import { HttpModule, Module } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { MoviesController } from './controllers/movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';
import { MoviesModel, MoviesSchema } from 'src/data-providers/model/movies-models';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(`${config.database.mongo_url}`,
    {
        retryAttempts: 3,
        useCreateIndex: true,
        useFindAndModify: false
    }),
    MongooseModule.forFeature([
        { name: MoviesModel.name, schema: MoviesSchema, collection: 'movies' },
    ])
  ],
  providers: [MoviesService],
  controllers: [MoviesController]
})
export class MoviesModule {}
