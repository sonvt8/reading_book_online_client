(function ($) {
        $.fn.jRating = function (op) {
            var defaults = {
                bigStarsPath: window.location.origin + '/assets/img/stars.png',
                smallStarsPath: window.location.origin + '/assets/img/small.png',
                ratingPath: 'http://localhost:8081/tai_khoan/danh_gia',
                type: 'big',
                step: false,
                isDisabled: false,
                showRateInfo: true,
                canRateAgain: false,
                sendRequest: true,
                length: 5,
                decimalLength: 0,
                rateMax: 20,
                rateInfosX: -45,
                rateInfosY: 5,
                nbRates: 1,
                onSuccess: null,
                onError: null,
                onClick: null
            };
            if (this.length > 0)
                return this.each(function () {
                    var opts = $.extend(defaults, op)
                        , newWidth = 0
                        , starWidth = 0
                        , starHeight = 0
                        , bgPath = ''
                        , hasRated = false
                        , globalWidth = 0
                        , nbOfRates = opts.nbRates;
                    if ($(this).hasClass('jDisabled') || opts.isDisabled)
                        var jDisabled = true;
                    else
                        var jDisabled = false;
                    getStarWidth();
                    $(this).height(starHeight);
                    var average = parseFloat($(this).attr('data-average'))
                        , idBox = parseInt($(this).attr('data-id'))
                        , widthRatingContainer = starWidth * opts.length
                        , widthColor = average / opts.rateMax * widthRatingContainer
                        , quotient = $('<div>', {
                        'class': 'jRatingColor',
                        css: {
                            width: widthColor
                        }
                    }).appendTo($(this))
                        , average = $('<div>', {
                        'class': 'jRatingAverage',
                        css: {
                            width: 0,
                            top: -starHeight
                        }
                    }).appendTo($(this))
                        , jstar = $('<div>', {
                        'class': 'jStar',
                        css: {
                            width: widthRatingContainer,
                            height: starHeight,
                            top: -(starHeight * 2),
                            background: 'url(' + bgPath + ') repeat-x'
                        }
                    }).appendTo($(this));
                    $(this).css({
                        width: widthRatingContainer,
                        overflow: 'hidden',
                        zIndex: 1,
                        position: 'relative'
                    });
                    console.log(jDisabled);
                    if (!jDisabled)
                        $(this).unbind().bind({
                            mouseenter: function (e) {
                                var realOffsetLeft = findRealLeft(this);
                                var relativeX = e.pageX - realOffsetLeft;
                                if (opts.showRateInfo)
                                    var tooltip = $('<p>', {
                                        'class': 'jRatingInfos',
                                        html: getNote(relativeX) + ' <span class="maxRate">/ ' + opts.rateMax + '</span>',
                                        css: {
                                            top: (e.pageY + opts.rateInfosY),
                                            left: (e.pageX + opts.rateInfosX)
                                        }
                                    }).appendTo('body').show();
                            },
                            mouseover: function (e) {
                                $(this).css('cursor', 'pointer');
                            },
                            mouseout: function () {
                                $(this).css('cursor', 'default');
                                if (hasRated)
                                    average.width(globalWidth);
                                else
                                    average.width(0);
                            },
                            mousemove: function (e) {
                                var realOffsetLeft = findRealLeft(this);
                                var relativeX = e.pageX - realOffsetLeft;
                                if (opts.step)
                                    newWidth = Math.floor(relativeX / starWidth) * starWidth + starWidth;
                                else
                                    newWidth = relativeX;
                                average.width(newWidth);
                                if (opts.showRateInfo)
                                    $("p.jRatingInfos").css({
                                        left: (e.pageX + opts.rateInfosX)
                                    }).html(getNote(newWidth) + ' <span class="maxRate">/ ' + opts.rateMax + '</span>');
                            },
                            mouseleave: function () {
                                $("p.jRatingInfos").remove();
                            },
                            click: function (e) {
                                var element = this;
                                hasRated = true;
                                globalWidth = newWidth;
                                nbOfRates--;
                                if (!opts.canRateAgain || parseInt(nbOfRates) <= 0)
                                    $(this).css('cursor', 'default').addClass('jDisabled');
                                if (opts.showRateInfo)
                                    $("p.jRatingInfos").fadeOut('fast', function () {
                                        $(this).remove();
                                    });
                                e.preventDefault();
                                var rate = getNote(newWidth);
                                average.width(newWidth);
                                if (opts.onClick)
                                    opts.onClick(element, rate);
                                if (opts.sendRequest) {
                                    $.post(opts.ratingPath, {
                                        idBox: idBox,
                                        rate: rate
                                    }, function (data) {
                                        if (!data.error) {
                                            $('.serverResponse p').html(data.server);
                                            if (opts.onSuccess)
                                                opts.onSuccess(element, rate, data);
                                        } else {
                                            $('.serverResponse p').html(data.server);
                                            if (opts.onError)
                                                opts.onError(element, rate, data);
                                        }
                                    }, 'json');
                                }
                            }
                        });

                    function getNote(relativeX) {
                        var noteBrut = parseFloat((relativeX * 100 / widthRatingContainer) * parseInt(opts.rateMax) / 100);
                        var dec = Math.pow(10, parseInt(opts.decimalLength));
                        var note = Math.round(noteBrut * dec) / dec;
                        return note;
                    };

                    function getStarWidth() {
                        switch (opts.type) {
                            case 'small':
                                starWidth = 12;
                                starHeight = 10;
                                bgPath = opts.smallStarsPath;
                                break;
                            default:
                                starWidth = 23;
                                starHeight = 20;
                                bgPath = opts.bigStarsPath;
                        }
                    };

                    function findRealLeft(obj) {
                        if (!obj)
                            return 0;
                        return obj.offsetLeft + findRealLeft(obj.offsetParent);
                    };
                });
        }
    }
)(jQuery);