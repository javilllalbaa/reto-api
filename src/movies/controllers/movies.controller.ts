import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from '../services/movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService){}

    @Get(':id/:language')
    all(@Param('id') id: number, @Param('language') language: string) {
      return this.moviesService.getMovies(id, language);
    }

    @Post('search/:id/:language')
    search(@Param('id') id: number, @Param('language') language: string, @Body() body: any) {
      return this.moviesService.search(id, language, body);
    }

}
