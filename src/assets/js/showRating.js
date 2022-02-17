function showRating() {
    $(document).ready(function () {
        $(".basic").jRating({
            decimalLength: 0,
            ratingPath: 'http://localhost:8081/tai_khoan/danh_gia',
            bigStarsPath: window.location.origin + '/assets/img/stars.png',
            rateMax: 10,
            onSuccess: function (element, rate, data) {
                if (data.message) {
                    $(".basic").removeClass("jDisabled");
                    swal({
                        text: data.message,
                        type: 'warning',
                        confirmButtonText: 'Ok'
                    });
                } else {
                    $(".basic").unbind();
                    $('#myrating').html(data.myrating);
                    $('#myrate').html(data.myrate);
                }
            },
            onError: function () {
                alert('Error : please retry');
            }
        });
    });
}