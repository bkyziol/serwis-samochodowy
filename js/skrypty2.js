rozmycie();
$('#modalTerminarz').modal({ 'backdrop':'static' });

$('.btn-planDnia').on('click', function () {
  if ($(this).hasClass('btn-planDnia-nieaktywny') === false) {
    $('.btn-planDnia').removeClass('btn-planDnia-wybrany');
    $(this).addClass('btn-planDnia-wybrany');
  }
});

$('.btn-modal').on('click', function () {
  var nrOstrzezenia = 0;
  var ostrzezenie = '';

  if (($('.btn-planDnia-wybrany').length)==false) {
    nrOstrzezenia += 1;
  }
  if ($('#nrKon').val() === '') {
    nrOstrzezenia += 2;
  }
  if ($('#nrRej').val() === '') {
    nrOstrzezenia += 4;
  }

  console.log(nrOstrzezenia);

  switch (nrOstrzezenia) {
    case 0:
      ostrzezenie = 'Rejestracja przebiegła pomyślnie';
    break;
    case 1:
      ostrzezenie = 'Proszę wybrać datę i godzinę wizyty.';
    break;
    case 2:
      ostrzezenie = 'Proszę wprowadzić numer kontaktowy.';
    break;
    case 3:
      ostrzezenie = 'Proszę wybrać datę i godzinę wizyty oraz wprowadzić numer kontaktowy.';
      break;
    case 4:
      ostrzezenie = 'Proszę wprowadzić numer rejestracyjny pojazdu.';
    break;
    case 5:
      ostrzezenie = 'Proszę wybrać datę i godzinę wizyty oraz wprowadzić numer rejestracyjny pojazdu.';
    break;
    case 6:
      ostrzezenie = 'Proszę wprowadzić numer rejestracyjny pojazdu oraz numer kontaktowy.';
    break;
    case 7:
      ostrzezenie = 'Proszę wybrać datę i godzinę wizyty oraz wprowadzić numer rejestracyjny pojazdu i numer kontaktowy.';
    break;
  }

  $('.ostrzezenie').html(ostrzezenie)
});
