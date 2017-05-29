new Vue({
    el: '#corpo',
    data: {
        showDetailsModal: false,
        showLoadingModal: false,
        details: {}
    },
    methods: {
        clickedDetails ($event) {
            let movie_id = $event.srcElement.value;
            $('#modal-loading').modal('show');
            axios.get('/details/' + movie_id).then((res) => {
                this.details = res.data;
                this.details.year = moment(res.data.release_date).format('YYYY');
                this.details.formated_date = moment(res.data.release_date).format('LL');
                this.details.formated_budget = accounting.formatMoney(res.data.budget);
                this.details.formated_revenue = accounting.formatMoney(res.data.revenue);
                $('#modal-loading').modal('hide');
                $('#modal-details').modal('show');
            }).catch((err) => {
                $('#modal-loading').modal('hide');
            });
        },
        handleResize () {
            let corpo_height = document.getElementById('corpo').offsetHeight;
            document.getElementById('top-offset').style.height = (window.innerHeight / 2) - (corpo_height / 2) + 'px';
        }
    },
    mounted () {
        $('body').fadeIn('fast');
        moment.locale('pt-br');
        this.$nextTick(() => {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        });
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.handleResize)
    }
})