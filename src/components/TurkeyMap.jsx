import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import GetLocksByCity from '../services/GetLocksByCity';
import DeviceService from '../services/DeviceService';
import { Grid } from '@mui/material';
import LockListDashboard from '../sections/@dashboard/general/lockList/lockListDashboard';

String.prototype.turkishToLower = function () {
  var string = this;

  var letters = { İ: 'i', I: 'ı', Ş: 'ş', Ğ: 'ğ', Ü: 'ü', Ö: 'ö', Ç: 'ç' };

  string = string.replace(/(([İIŞĞÜÇÖ]))/g, function (letter) {
    return letters[letter];
  });

  return string.toLowerCase();
};

function capitalizeFirstLetter(str) {
  const capitalized = str.replace(/^./, str[0].toUpperCase());
  return capitalized;
}

TurkeyMap.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      population: PropTypes.number,
    })
  ),
};

function TurkeyMap({ cities }) {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await DeviceService.getData();
      setData(response);
    };

    const getLocksByCity = async (cityName) => {
      const response = await GetLocksByCity.getData(cityName);
      console.log('Response...');
      console.log(response);
      setData(response);
    };

    getData();

    if (document.querySelector('.turkey-map').hasChildNodes()) {
      document.querySelector('.turkey-map').innerHTML = '';
    }

    if (document.querySelector('.harita-data').hasChildNodes()) {
      document.querySelector('.harita-data').innerHTML = '';
    }

    var hover1;

    function GetMap() {
      $.get(
        '/turkey-map/turkey.svg',
        function (data) {
          $('.turkey-map').append('<div class="map-container">' + data + '</div>');
          $('.map-container').append('<div class="map-title"><span class="map-close"></span><strong></strong></div>');

          $('.turkey-map[data-bg-color]').css('background-color', $('.turkey-map').attr('data-bg-color'));
          $(
            '.turkey-map[data-map-color] #turkey > g > g > polygon, .turkey-map[data-map-color] #turkey > g > g > g, .turkey-map[data-map-color] #turkey > g > g > path'
          ).css('fill', $('.turkey-map').attr('data-map-color'));

          $.each($('#turkey > g'), function () {
            var e = $(this)[0].getBoundingClientRect(),
              trMapL = $('.turkey-map').offset().left,
              trMapT = $('.turkey-map').offset().top,
              trL = $('.turkey-map').width() / 2 - (parseInt(e.left, 0) + parseInt(e.width / 2, 0)) + trMapL,
              trT = $('.turkey-map').height() / 2 - (parseInt(e.top, 0) + parseInt(e.height / 2, 0)) + trMapT;
            $(this).attr('data-transform-left', trL);
            $(this).attr('data-transform-top', trT);
          });
          $('.turkey-map').append('<div class="map-tooltip"></div>');

          $.each($('.turkey-map color'), function () {
            $(
              '#' +
                $(this).attr('id') +
                ' polygon, ' +
                ' #' +
                $(this).attr('id') +
                ' path, ' +
                ' #' +
                $(this).attr('id') +
                ' g'
            ).addClass($(this).attr('data-color'));
          });
        },
        'html'
      );
    }

    $(function () {
      GetMap();
      $('.map-tooltip').css('z-index', '99999');
      $(document).on(
        {
          mouseleave: function () {
            $('.map-tooltip').text('').removeClass('hovered');
          },
        },
        '#turkey'
      );
      $(document).on(
        {
          mouseenter: function () {
            var map = $(this).closest('.turkey-map');
            var mapType =
              map.attr('data-map') == 'districts'
                ? $(this)
                : map.attr('data-map') == 'city'
                ? $(this).parent('g')
                : $(this).parent('g');

            var trX = mapType[0].getBoundingClientRect().left,
              trY = mapType[0].getBoundingClientRect().top + 150,
              w = mapType[0].getBoundingClientRect().width / 2,
              trMapL = map.offset().left,
              trMapT = map.offset().top;
            var scrolltoplocation = $(window).scrollTop();

            var w2 = parseInt($('.map-tooltip').outerWidth(true), 0) / 2;

            $('.map-tooltip')
              .css({
                transform: 'translate(' + (trX + w - w2 - trMapL) + 'px, ' + (trY - trMapT + scrolltoplocation) + 'px)',
              })
              .addClass('hovered');
            // if (mapType.attr('id') != hover1) {
            $('.map-tooltip').html('');
            hover1 = mapType.attr('id');
            var textdata = $('.genel-' + mapType.attr('id').turkishToLower()).text();
            var jdata = JSON.parse(textdata);
            var listhtml = jdata.data.map((x) => {
              return (
                '<div style="display: flex; justify-content: space-between" class="d-flex flex-stack"><div class="d-flex align-items-center me-2" style="display: flex; align-items: center; margin-end: 6px;"><div><div style="font-weight: bold; font-size:14px; font-color: #1F2937" class="fs-6 text-gray-800 text-hover-primary fw-bolder">' +
                x.name +
                '</div></div></div><div class="text-nowrap" style="white-space: nowrap"><div class="fw-bolder py-2 px-4 text-nowrap m-2 " style="font-weight: bold; padding-left: 12px; padding-right: 12px; padding-top: 6px; padding-bottom: 6px; color:' +
                x.color +
                '">' +
                x.count +
                '</div></div></div>'
              );
            });
            $('.map-tooltip').append('<h2>' + mapType.attr('id') + '</h2><br/>');

            $('.map-tooltip').append(listhtml);
            // }
          },
        },
        '.genel #turkey > g > g'
      );

      $(document).on(
        {
          click: function () {
            // window.open('atm/list?sehir=' + $(this).attr('id'), '_blank');
            var cityName = $(this).attr('id').turkishToLower();
            getLocksByCity(cityName);
            window.scrollTo(0, window.scrollY + 450);
          },
        },
        '.genel #turkey > g'
      );

      $(document).on('click', '.turkey-map .map-title', function () {
        $('.turkey-map svg')
          .css({
            transform: 'scale(1) translate(0, 0)',
          })
          .parents('.turkey-map')
          .removeClass('zoomed');
        $('#turkey > g').each(function () {
          $(this).removeAttr('class');
        });
        $('#turkey > g > g').each(function () {
          $(this).removeAttr('class');
        });
      });
    });
    $("[data-kt-search-element='clear']").click(function () {
      $("[data-kt-user-table-filter='search']").val('').trigger('keyup');
    });
    $("[data-kt-user-table-filter='search']").change(function () {
      if ($(this).val().length > 0) {
        $("[data-kt-search-element='clear']").removeClass('d-none');
      } else {
        $("[data-kt-search-element='clear']").addClass('d-none');
      }
    });
    $("[data-kt-user-table-filter='search']").keyup(function () {
      if ($(this).val().length > 0) {
        $("[data-kt-search-element='clear']").removeClass('d-none');
      } else {
        $("[data-kt-search-element='clear']").addClass('d-none');
      }
    });

    cities.map((x) => {
      var style;
      if (x.name == 'istanbul') {
        style = $(
          '<style>.turkey-map.genel svg #turkey > g[id=İstanbul] > g polygon, .turkey-map.genel svg #turkey > g[id=İstanbul] > g path { fill: ' +
            x.color +
            ' !important}</style>'
        );
        $('html > head').append(style);
      }
      if (x.name == 'izmir') {
        style = $(
          '<style>.turkey-map.genel svg #turkey > g[id=İzmir] > g polygon, .turkey-map.genel svg #turkey > g[id=İzmir] > g path { fill: ' +
            x.color +
            ' !important}</style>'
        );
        $('html > head').append(style);
      }
      style = $(
        '<style>.turkey-map.genel svg #turkey > g[id=' +
          capitalizeFirstLetter(x.name) +
          '] > g polygon, .turkey-map.genel svg #turkey > g[id=' +
          capitalizeFirstLetter(x.name) +
          '] > g path { fill: ' +
          x.color +
          ' !important}</style>'
      );
      $('html > head').append(style);
      $('.harita-data').append("<span class='genel-" + x.name + "'>" + JSON.stringify(x) + '</span>');
    });
  }, []);

  return (
    <>
      <Grid item xs={12} md={12}>
        <div className="turkey-map genel" />
        <div className="d-none harita-data" />
      </Grid>
      {data && (
        <Grid item xs={12} md={12} sx={{ mt: 4 }}>
          <LockListDashboard data={data} />
        </Grid>
      )}
    </>
  );
}

export default TurkeyMap;
