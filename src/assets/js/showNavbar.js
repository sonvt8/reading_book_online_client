function showNavbar() {
    //$(".button-collapse").sideNav();
    $(".button-collapse").click(function(){
        $(".side-nav.fixed").css('transform', 'translateX(0%)');
    });
    var container = document.querySelector('.custom-scrollbar');
    Ps.initialize(container, {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20
    });

    //Tooltips Initialization
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
}

