import { HttpService, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as config from 'config';
import { Model } from 'mongoose';
import { MoviesModel } from './../../data-providers/model/movies-models';
import { serializeQs } from './../../common/utils/utils'
import * as mom from "moment";


@Injectable()
export class MoviesService {

    constructor(
        private http: HttpService,
        @InjectModel(MoviesModel.name) private readonly moviesModel: Model<MoviesModel>
    ) { }

    async getMovies(id, language) {
        var data = {
            api_key: config.api_key,
            language: language,
            page: id
        }
        var query = serializeQs(data)

        const movies = await this.moviesModel.find({ page: id }).exec();
        if (movies && movies.length > 0) {
            //console.log("Movies...", movies);
            return movies[0];
        }
        if (movies.length == 0) {
            return this.http
                .get(`${config.domain}/movie/popular${query}`)
                .toPromise()
                .then(data => {
                    const newMovies = new this.moviesModel(data.data)
                    return newMovies.save()
                })
        }
    }

    sortData = function(info, search, tam, id, page, totalPage){
        // console.log(info, search, tam, id, page)
        var response = {
            page: page,
            search: search,
            results: info,
            total_pages: totalPage
        }
        if(search && search.indexOf("popularity") >= 0){
            info.sort((a, b) => { return a.popularity - b.popularity })
            if(tam)
                info = info.slice( ((id * (info.length/tam))-20) , (id * (info.length/tam)) )
        }else if(search && search.indexOf("vote_count") >= 0){
            info.sort((a, b) => { return a.vote_count - b.vote_count })
            if(tam)
                info = info.slice( ((id * (info.length/tam))-20) , (id * (info.length/tam)) )
        }
        if(search == 'popularity-asc'){
            response.results = info
            return response
        }else if(search == 'popularity-des'){
            response.results = info.reverse()
            return response
        }if(search == 'vote_count-asc'){
            response.results = info
            return response
        }else if(search == 'vote_count-des'){
            response.results = info.reverse()
            return response
        }else{
            return response
        }
    }

    async search(id, language, body) {

        if(body.start_date || body.search_to_name){
            var year = mom(body.start_date).format('YYYY');
            var data = {
                api_key: config.api_key,
                language: language,
                page: id,
                query: body.search_to_name != "" ? body.search_to_name : "a",
                year: year,
            }
            var query = serializeQs(data)
            console.log(`${config.domain}/search/movie${query}`, query);
            
            return this.http
                .get(`${config.domain}/search/movie${query}`)
                .toPromise()
                .then(data => {
                    data.data.search = body.search_to
                    // return data.data
                    return  this.sortData(data.data.results, body.search_to, null, id, data.data.page, data.data.total_pages) 
                })
        }

        const movies = await this.moviesModel.aggregate(
            [
                { $project: { results: 1 } },
                { $sort: { results: -1 } }
            ]
        ).exec();
       
        var info = []
        movies.map((p) => {
            info = info.concat(p.results)
        })
        
        return this.sortData(info, body.search_to, movies.length, id, id, null) 
        
    }

}
