const axios = require('axios');

let api = {};

api.search = (query, callback) => {
    axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {
            api_key: process.env.API_KEY,
            query: query,
            language: 'pt-BR'
        }
    }).then((response) => {
        callback(undefined, response.data);
    }).catch((err) => {
        callback(err, undefined);
    });
}

api.getDetails = (movie_id, callback) => {

    if (movie_id) {

        axios.all([
            axios({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${movie_id}`,
                params: {
                    api_key: process.env.API_KEY,
                    language: 'pt-BR'
                }
            }),
            axios({
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
                params: {
                    api_key: 'b605b6814bc7c15eaa606bfdbf503ea7'
                }
            })
        ]).then(axios.spread((detailsRes, creditsRes) => {

            let details = {
                id: movie_id,
                original_title: detailsRes.data.original_title,
                title: detailsRes.data.title,
                release_date: detailsRes.data.release_date,
                budget: detailsRes.data.budget,
                revenue: detailsRes.data.revenue,
                overview: detailsRes.data.overview,
                production_companies: [],
                genres: [],
                cast: [],
                runtime: detailsRes.data.runtime,
                poster_path: `https://image.tmdb.org/t/p/w500${detailsRes.data.poster_path}`
            };

            detailsRes.data.production_companies.forEach((company) => {
                details.production_companies.push(company.name);
            });
            details.production_companies = details.production_companies.join(', ');

            detailsRes.data.genres.forEach((lang) => {
                details.genres.push(lang.name);
            });
            details.genres = details.genres.join(', ');

            creditsRes.data.cast.forEach((person) => {
                details.cast.push(person.name);
            });
            if (details.cast.length > 10) {
                details.cast = details.cast.slice(0, 10);
            }
            details.cast = details.cast.join(', ');

            callback(undefined, details);
        })).catch((err) => {
            callback(err, undefined);
        });
    } else {
        callback({
            msg: 'Invalid movie id!'
        }, undefined);
    }

}

module.exports = api;