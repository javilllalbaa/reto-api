/* istanbul ignore file */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MovieModel extends Document{

    @Prop({required: true, default: true})
    adult: boolean;

    @Prop({required: true, default: true})
    backdrop_path: string;

    @Prop({required: true, default: false})
    genre_ids: any

    @Prop({required: true, default: false})
    id: number
    
    @Prop({required: true, default: false})
    original_language: string

    @Prop({required: true, default: false})
    original_title: string

    @Prop({required: true, default: false})
    overview: string

    @Prop({required: true, default: false})
    popularity: number

    @Prop({required: true, default: false})
    poster_path: string

    @Prop({required: true, default: false})
    release_date: string

    @Prop({required: true, default: false})
    title: string

    @Prop({required: true, default: false})
    video: boolean

    @Prop({required: true, default: false})
    vote_average: number

    @Prop({required: true, default: false})
    vote_count: number

}

export const MovieSchema = SchemaFactory.createForClass(MovieModel);