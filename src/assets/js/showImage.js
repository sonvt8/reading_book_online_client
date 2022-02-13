function showImage(){
    var message = /*[[${story.images}]]*/ '';
    $("#inputFile").change(function () {
        var fileName = $('#inputFile').val();
        if (fileName !== "") {
            readURL(this);
            readFileName(this);
            showRemoveBtn();
        } else {
            removeURL();
            removeFileName();
            hiddenRemoveBtn();
        }
    });
    $('#img-remove').click(function () {
        removeURL();
        removeFileName();
        hiddenRemoveBtn();
        $('#inputFile').val(null);
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                //alert(e.target.result);
                $('#imgLogo').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    function readFileName(input) {
        $('#file-name').val(input.files[0].name);
    }

    function removeURL() {
        $('#imgLogo').removeAttr('src');
        $('#imgLogo').attr('src', message);

    }

    function removeFileName() {
        $('#file-name').val('');
    }

    function showRemoveBtn() {
        $('#img-remove').addClass('is-selected');
    }

    function hiddenRemoveBtn() {
        $('#img-remove').removeClass('is-selected');
    }
}