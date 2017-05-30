new Vue({
    el: '#busca',
    methods: {
        handleResize() {
            let busca_height = document.getElementById('busca').offsetHeight;
            document.getElementById('top-offset').style.height = (window.innerHeight / 2) - (busca_height / 2) + 'px';
        }
    },
    mounted() {
        $('body').fadeIn('fast');
        
        this.$nextTick(() => {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
    }
});