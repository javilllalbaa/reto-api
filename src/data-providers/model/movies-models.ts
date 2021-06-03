/* istanbul ignore file */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MovieModel } from './movie.model'

@Schema()
export class MoviesModel extends Document{

    @Prop({required: true, default: true})
    page: string;

    @Prop({required: true, default: true})
    results: MovieModel[];

    @Prop({required: true, default: false})
    total_pages: number

    @Prop({required: true, default: false})
    total_results: number


}

export const MoviesSchema = SchemaFactory.createForClass(MoviesModel);