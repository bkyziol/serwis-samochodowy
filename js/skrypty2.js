rozmycie();
$('#modalTerminarz').modal({ 'backdrop':'static' });

function wyslij(rezerwacja) {
  console.log(rezerwacja);
  $.ajax({
    type: 'POST',
    url: 'wprowadz.php',
    data: rezerwacja,
    success: function (data) {
      console.log('Odpowiedz:', data); //the new item is returned with an ID
      pobierz()
    },
    error: function () {
      alert('Dupa nie działa!!!!');
    },
  });
}

$('.btn-modal').on('click', function () {
  var nrOstrzezenia = 0;
  var ostrzezenie = '';
  var rezerwacja = {
    dzien: wybranaData.getDate(),
    miesiac: wybranaData.getMonth(),
    rok: wybranaData.getFullYear(),
    godzina: $('.btn-planDnia-wybrany').attr('data-godzina'),
    rejestracja: $('#nrRej').val(),
    telefon: $('#nrKon').val(),
  };

  //USUNAC
  wyslij(rezerwacja);
  //USUNAC

  if (($('.btn-planDnia-wybrany').length) == false) {
    nrOstrzezenia += 1;
  }
  if ($('#nrKon').val() === '') {
    nrOstrzezenia += 2;
  }
  if ($('#nrRej').val() === '') {
    nrOstrzezenia += 4;
  }

  switch (nrOstrzezenia) {
    case 0:
      ostrzezenie = 'Rejestracja przebiegła pomyślnie';
      // wyslij(rezerwacja);
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
