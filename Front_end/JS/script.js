//MODAL VER+ DASHBOARD
function vermas(){ //para que salte modal ver +
    let myModal = new bootstrap.Modal(document.getElementById('ModalSemestre'), {});
    myModal.show();
  }

//MODAL ELIMINAR DASHBOARD
  function eliminar(id_semestre) { //eliminar semestre
    if (confirm("¿Quieres eliminar el semestre?")) {
          
          document.getElementById('semestre-'+id_semestre).remove();
    } else {
          alert("No se ha eliminado el semestre");
      }
  }

  //INTERFAZ 2
  // Obtén el elemento 'select' por su ID
var selectYear = document.getElementById('year');

// Obtiene el año actual
var currentYear = new Date().getFullYear();

$(document).ready(function() {
    // Inicializa los popovers
    $('#background-color').popover({
      content: $('#color-picker-popover').html(),
      html: true,
      placement: 'bottom',
    });
  
    // Maneja la selección de color
    $(document).on('click', '.color-box', function() {
      var selectedColor = $(this).css('background-color');
      $('#background-color').css('background-color', selectedColor);
      $('#background-color').popover('hide');
    });
  });

// Obtén referencias a los elementos HTML y el rango de dificultad
const range = document.getElementById('dificultad');
const minValue = document.querySelector('.min-value');
const maxValue = document.querySelector('.max-value');
const currentValue = document.querySelector('.current-value');

// Agrega un evento de cambio al rango para actualizar los valores
range.addEventListener('input', function() {
  // Actualiza el valor actual
  currentValue.textContent = range.value;
});

// Inicializa los valores mínimo y máximo
minValue.textContent = range.min;
maxValue.textContent = range.max;
currentValue.textContent = range.value;