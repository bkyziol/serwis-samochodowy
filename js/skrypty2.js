$('#modalTerminarz').modal({ 'backdrop':'static' });
rozmycie();

var tablicaDni = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

$.datepicker.regional['pl'] = {
    closeText: 'Zamknij', // set a close button text
    currentText: 'Dzisiaj', // set today text
    monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'], // set month names
    monthNamesShort: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'], // set short month names
    dayNames: tablicaDni, // set days names
    dayNamesShort: ['Nie', 'Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob'], // set short day names
    dayNamesMin: ['Ni', 'Po', 'Wt', 'Śr', 'Cz', 'Pi', 'So'], // set more short days names
    dateFormat: 'dd/mm/yy' // set format date
};

$('#btn-0900').addClass('btn-planDnia-nieaktywny')
$('#btn-0930').addClass('btn-planDnia-nieaktywny')

$.datepicker.setDefaults($.datepicker.regional['pl']);

var $datepicker = $('#datepicker').datepicker({
  minDate: '#actualDate',
  firstDay: 1,
  onSelect: function () {
    wybranaData = new $(this).datepicker('getDate');
    $('#dzienTygodnia').html(tablicaDni[wybranaData.getDay()]);
    console.log(tablicaDni[wybranaData.getDay()]);
  }
});

currentDate = $datepicker.datepicker('getDate');
console.log(currentDate);

$('.btn-planDnia').on('click',function(){
  console.log('Wykryto klikniecie')
  if ($(this).hasClass('btn-planDnia-wybrany') !== true){
    $('.btn-planDnia').removeClass('btn-planDnia-wybrany');
    $(this).addClass('btn-planDnia-wybrany');
  }
});
