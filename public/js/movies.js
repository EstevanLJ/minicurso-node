$(document).ready(function () {
    $('body').fadeIn('fast');

    let reposicionarBuscar = function () {
        $('#top-offset').css('height', (window.innerHeight / 2) - ($('#corpo').height() / 2) + 'px');
    }

    reposicionarBuscar();

    $(window).resize(function () {
        reposicionarBuscar();
    });

    $('.details').click((e) => {
        let movie_id = $(e.target).val();
        
        $('#modal-loading').modal('show');

        axios.get('/details/' + movie_id).then((res) => {
            
            $('#modal-poster').attr('src', `https://image.tmdb.org/t/p/w500${res.data.poster_path}`);

            $('#modal-title').html(res.data.title);
            $('#modal-original-title').html(res.data.original_title);
            $('#modal-overview').html(res.data.overview);
            $('#modal-cast').html(res.data.cast);
            $('#modal-genres').html(res.data.genres);
            $('#modal-companies').html(res.data.production_companies);

            if (res.data.runtime > 0) {
                $('#modal-runtime').html(res.data.runtime + ' minutos');
            } else {
                $('#modal-runtime').html('Sem informações');                
            }

            if (res.data.budget > 0) {
                $('#modal-budget').html(accounting.formatMoney(res.data.budget));
            } else {
                $('#modal-budget').html('Sem informações');
            }

            if (res.data.revenue > 0) {
                $('#modal-revenue').html(accounting.formatMoney(res.data.revenue));
            } else {
                $('#modal-revenue').html('Sem informações');
            }

            $('#modal-loading').modal('hide');
            $('#modal-details').modal('show');

        }).catch((err) => {
            $('#modal-loading').modal('hide');
        });



    })

})