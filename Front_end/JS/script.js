// INTERFAZ 1 Y 2
    var jsonSemestersData = '{"23241":{"numSemester":1,"year":"23/24","dateStart":"","dateEnd":"","color":"#33aaff","description":"El semestre más importante","opinion":"Me encanta","difficulty":1},"23242":{"numSemester":2,"year":"23/24","dateStart":"","dateEnd":"","color":"#CCCCCC","description":"El semestre más importante","opinion":"Me encanta","difficulty":3}}';
    var semestersData = jQuery.parseJSON(jsonSemestersData);

    function emptySemesters() {
        $('#semester-list').empty();
    }

    function drawSemesters(semesters) {
        // Vaciamos el HTML de Semestres
        emptySemesters();
        // Insertamos las cards de semestre
        $.each(semesters, function (index, semester) {
            drawSemester(index, semester);
        });
    }

    // Función para pintar el card del semestre
    function drawSemester(index, semester) {
        // Construimos el card del semestre
        $('<div class="margen-top-lg col-sm-4" id="' + index + '"><div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title" style="background-color:' + semester.color + '">Semestre ' + semester.numSemester + ' del curso ' + semester.year + '</h5><div class="padding-sm"><p class="card-text">Fecha inicio: ' + semester.dateStart + '</br>Fecha fin: ' + semester.dateEnd + '</br>Descripción: ' + semester.description + '</br>Opinión: ' + semester.opinion + '</br>Dificultad: ' + semester.difficulty + '</p><a href="#" class="btn btn-primary" id="añadir" onclick="drawModalSemester(' + index + ')">editar<a href="interfaz_3.html" class="btn btn-primary" id="añadir" onclick="drawModalSemester(' + index + ')">Ver</a><button class="btn btn-danger" id="eliminar" onclick="eliminar(' + index + ')"><i class="fas fa-trash"></i></button></div></div></div></div>').appendTo('#semester-list');
    }

    // Función para pintar el modal con el formulario
    function drawModalSemester(index) {
        // Inicializamos valores del formulario
        var semester = new Object();
        semester.numSemester = '';
        semester.year = '';
        semester.dateStart = '';
        semester.dateEnd = '';
        semester.color = '#cccccc';
        semester.description = '';
        semester.opinion = '';
        semester.difficulty = '';
        var title = 'Añadir ';

        // Si viene definido un índice de semestre, cargamos los datos en el formulario
        if (index && typeof semestersData[index] != 'undefined') {
            semester = semestersData[index];
            title = 'Ver/Editar ';
        }

        // Preparamos las opciones de los elementos del formulario
        var selected = '';
        // SELECCIÓN DE SEMESTRE
        var options_numSemester = '';
        for (var i = 1; i < 3; i++) {
            selected = '';
            if (i == semester.numSemester) {
                selected = 'selected';
            }
            options_numSemester += '<option value=' + i + ' ' + selected + '>' + i + '</option>';
        }
        // SELECCIÓN AÑO
        var options_year = '';
        for (var i = new Date().getFullYear(); i < (new Date().getFullYear() + 10); i++) {
            selected = '';
            if (i == semester.year) {
                selected = 'selected';
            }
            options_year += '<option value=' + i + ' ' + selected + '>' + i + '</option>';
        }

        // BARRA DE DIFICULTAD
        document.addEventListener('DOMContentLoaded', function () {
            const currentValue = document.getElementById('current-value');
            const dificultad = document.getElementById('dificultad');

            currentValue.textContent = dificultad.value; // Inicializamos el valor actual con 5

            dificultad.addEventListener('input', function () {
                currentValue.textContent = dificultad.value;
            });
        });

        // Preparamos HTML de cada campo del formulario
        var field_numSemester = '<select class="form-select" id="numSemester" name="numSemester" aria-label="Default select example"><option selected>Selecciona un semestre</option>' + options_numSemester + '</select><label for="floatingSelect">Semestre</label>';
        var field_year = '<select class="form-select" id="year" name="year" aria-label="Default select example"><option selected>Selecciona un año</option>' + options_year + '</select><label for="floatingSelect">Año</label>';
        var field_dateStart = '<input type="date" class="form-control" id="dateStart" name="dateStart" placeholder="Fecha de Inicio" value="' + semester.dateStart + '"><label for="floatingInput">Fecha de Inicio</label>';
        var field_dateEnd = '<input type="date" class="form-control" id="dateEnd" name="dateEnd" placeholder="Fecha de Fin" value="' + semester.dateEnd + '"><label for="floatingInput">Fecha de Fin</label>';
        var field_color = '<label for="color" class="form-label" style="display: block; text-align: left;">Color</label><input type="color" class="form-control form-control-color" id="color" name="color" value="' + semester.color + '" title="Selecciona un color">';
        var field_description = '<textarea class="form-control" id="description" name="description" rows="4">' + semester.description + '</textarea><label for="floatingInput">Descripción</label>';
        var field_opinion = '<textarea class="form-control" id="opinion" name="opinion" rows="4">' + semester.opinion + '</textarea><label for "floatingInput">Opinión</label>';
        var field_difficulty = '<label for="dificultad" class="form-label" style="display: block; text-align: left;">Dificultad</label><div class="d-flex justify-content-between"><span id="min-value">0</span><span id="max-value">10</span></div><input type="range" class="form-range" min="0" max="10" step="1" id="dificultad" name="difficulty"><p>Valor Actual: <span id="current-value"></span></p>';

        // Preparamos HTML del formulario con los campos
        var formHtml = '<div class="modal fade" id="modal-semestre" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-5" id="exampleModalLabel">' + title + ' semestre</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><form id="semestre-form" class="needs-validation"><div class="modal-body"><div class="form-floating mb-3">' + field_numSemester + '</div><div class="form-floating">' + field_year + '</div><br><div class="form-floating mb-3">' + field_dateStart + '</div><div class="form-floating mb-3">' + field_dateEnd + '</div><div class="form-floating mb-3">' + field_description + '</div><div class="mb-3">' + field_color + '</div> <div class="form-floating mb-3">' + field_opinion + '</div><div class="mb-3">' + field_difficulty + '</div></div><div class="modal-footer"><button type="submit" class="btn btn-primary">Guardar</button></div></form></div></div></div>';

        // Borramos el formulario si existe y lo insertamos en el DOM
        $('#modal-semestre').remove();
        $(formHtml).appendTo('#semester-list');

        // Añadimos el listener al evento de enviar el formulario para validar
        var form = document.getElementById("semestre-form");
        form.addEventListener('submit', function (event) {
            // Validamos el formulario
            if (!form.checkValidity()) {
                // Si no valida, detenemos la acción
                event.preventDefault();
                event.stopPropagation();
            }

            // Si valida, añadimos campos validados
            form.classList.add("was-validated");

            // Recogemos los datos del formulario
            var values = {};
            $.each($('#semestre-form').serializeArray(), function (i, field) {
                values[field.name] = field.value;
            });

            // Guardamos el semestre en el objeto semesters
            var newIndice = values['year'] + values['numSemester'];
            if (typeof semestersData[newIndice] == 'undefined') {
                semestersData[newIndice] = new Object();
            }
            semestersData[newIndice].numSemester = values['numSemester'];
            semestersData[newIndice].year = values['year'];
            semestersData[newIndice].dateStart = values['dateStart'];
            semestersData[newIndice].dateEnd = values['dateEnd'];
            semestersData[newIndice].color = values['color'];
            semestersData[newIndice].description = values['description'];
            semestersData[newIndice].opinion = values['opinion'];
            semestersData[newIndice].difficulty = values['difficulty'];

            // Volvemos a dibujar las semanas
            drawSemesters(semestersData);

            // Cerrará el modal
            event.preventDefault();
            event.stopPropagation();
            $('#modal-semestre').modal('hide');
            $('.modal-backdrop.show').remove();
        }, false);

        // Abrimos el modal
        $('#modal-semestre').modal('show');
    }

    // MODAL ELIMINAR DASHBOARD
    function eliminar(index) { // Eliminar semestre
        if (confirm("¿Quieres eliminar el semestre?")) {
            $('#' + index).remove();
        } else {
            alert("No se ha eliminado el semestre");
        }
    }

    jQuery(document).ready(function () {
        // Coge los datos de semestres e inserta las cards de semestres en el DOM
        drawSemesters(semestersData);
    });

// DRAG & DROP
function allowDrop(event) {
    event.preventDefault();
  }
  
  function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }
  
  function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
  }

// INTERFAZ 3
var jsonSemestersData = '{"23241":{"numSemester":1,"year":"23/24","dateStart":"","dateEnd":"","color":"#33aaff","description":"El semestre más importante","opinion":"Me encanta","difficulty":1},"23242":{"numSemester":2,"year":"23/24","dateStart":"","dateEnd":"","color":"#CCCCCC","description":"El semestre más importante","opinion":"Me encanta","difficulty":3}}';
var semestersData = jQuery.parseJSON(jsonSemestersData);

function emptySemesters() {
    $('#semester-list').empty();
}

function drawSemesters(semesters) {
    // Vaciamos el HTML de Semestres
    emptySemesters();
    // Insertamos las cards de semestre
    $.each(semesters, function (index, semester) {
        drawSemester(index, semester);
    });
}

// Función para pintar el card del semestre
function drawSemester(index, semester) {
    // Construimos el card del semestre
    $('<div class="margen-top-lg col-sm-4" id="' + index + '"><div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title" style="background-color:' + semester.color + '">Semestre ' + semester.numSemester + ' del curso ' + semester.year + '</h5><div class="padding-sm"><p class="card-text">Fecha inicio: ' + semester.dateStart + '</br>Fecha fin: ' + semester.dateEnd + '</br>Descripción: ' + semester.description + '</br>Opinión: ' + semester.opinion + '</br>Dificultad: ' + semester.difficulty + '</p><a href="#" class="btn btn-primary" id="añadir" onclick="drawModalSemester(' + index + ')">ver/editar</a><button class="btn btn-danger" id="eliminar" onclick="eliminar(' + index + ')"><i class="fas fa-trash"></i></button></div></div></div></div>').appendTo('#semester-list');
}

// Función para pintar el modal con el formulario
function drawModalSemester(index) {
    // Inicializamos valores del formulario
    var semester = new Object();
    semester.numSemester = '';
    semester.year = '';
    semester.dateStart = '';
    semester.dateEnd = '';
    semester.color = '#cccccc';
    semester.description = '';
    semester.opinion = '';
    semester.difficulty = '';
    var title = 'Añadir ';

    // Si viene definido un índice de semestre, cargamos los datos en el formulario
    if (index && typeof semestersData[index] != 'undefined') {
        semester = semestersData[index];
        title = 'Ver/Editar ';
    }

    // Preparamos las opciones de los elementos del formulario
    var selected = '';
    // SELECCIÓN DE SEMESTRE
    var options_numSemester = '';
    for (var i = 1; i < 3; i++) {
        selected = '';
        if (i == semester.numSemester) {
            selected = 'selected';
        }
        options_numSemester += '<option value=' + i + ' ' + selected + '>' + i + '</option>';
    }
    // SELECCIÓN AÑO
    var options_year = '';
    for (var i = new Date().getFullYear(); i < (new Date().getFullYear() + 10); i++) {
        selected = '';
        if (i == semester.year) {
            selected = 'selected';
        }
        options_year += '<option value=' + i + ' ' + selected + '>' + i + '</option>';
    }

    // BARRA DE DIFICULTAD
    document.addEventListener('DOMContentLoaded', function () {
        const currentValue = document.getElementById('current-value');
        const dificultad = document.getElementById('dificultad');

        currentValue.textContent = dificultad.value; // Inicializamos el valor actual con 5

        dificultad.addEventListener('input', function () {
            currentValue.textContent = dificultad.value;
        });
    });

    // Preparamos HTML de cada campo del formulario
    var field_numSemester = '<select class="form-select" id="numSemester" name="numSemester" aria-label="Default select example"><option selected>Selecciona un semestre</option>' + options_numSemester + '</select><label for="floatingSelect">Semestre</label>';
    var field_year = '<select class="form-select" id="year" name="year" aria-label="Default select example"><option selected>Selecciona un año</option>' + options_year + '</select><label for="floatingSelect">Año</label>';
    var field_dateStart = '<input type="date" class="form-control" id="dateStart" name="dateStart" placeholder="Fecha de Inicio" value="' + semester.dateStart + '"><label for="floatingInput">Fecha de Inicio</label>';
    var field_dateEnd = '<input type="date" class="form-control" id="dateEnd" name="dateEnd" placeholder="Fecha de Fin" value="' + semester.dateEnd + '"><label for="floatingInput">Fecha de Fin</label>';
    var field_color = '<label for="color" class="form-label" style="display: block; text-align: left;">Color</label><input type="color" class="form-control form-control-color" id="color" name="color" value="' + semester.color + '" title="Selecciona un color">';
    var field_description = '<textarea class="form-control" id="description" name="description" rows="4">' + semester.description + '</textarea><label for="floatingInput">Descripción</label>';
    var field_opinion = '<textarea class="form-control" id="opinion" name="opinion" rows="4">' + semester.opinion + '</textarea><label for "floatingInput">Opinión</label>';
    var field_difficulty = '<label for="dificultad" class="form-label" style="display: block; text-align: left;">Dificultad</label><div class="d-flex justify-content-between"><span id="min-value">0</span><span id="max-value">10</span></div><input type="range" class="form-range" min="0" max="10" step="1" id="dificultad" name="difficulty"><p>Valor Actual: <span id="current-value"></span></p>';

    // Preparamos HTML del formulario con los campos
    var formHtml = '<div class="modal fade" id="modal-semestre" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h1 class="modal-title fs-5" id="exampleModalLabel">' + title + ' semestre</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><form id="semestre-form" class="needs-validation"><div class="modal-body"><div class="form-floating mb-3">' + field_numSemester + '</div><div class="form-floating">' + field_year + '</div><br><div class="form-floating mb-3">' + field_dateStart + '</div><div class="form-floating mb-3">' + field_dateEnd + '</div><div class="form-floating mb-3">' + field_description + '</div><div class="mb-3">' + field_color + '</div> <div class="form-floating mb-3">' + field_opinion + '</div><div class="mb-3">' + field_difficulty + '</div></div><div class="modal-footer"><button type="submit" class="btn btn-primary">Guardar</button></div></form></div></div></div>';

    // Borramos el formulario si existe y lo insertamos en el DOM
    $('#modal-semestre').remove();
    $(formHtml).appendTo('#semester-list');

    // Añadimos el listener al evento de enviar el formulario para validar
    var form = document.getElementById("semestre-form");
    form.addEventListener('submit', function (event) {
        // Validamos el formulario
        if (!form.checkValidity()) {
            // Si no valida, detenemos la acción
            event.preventDefault();
            event.stopPropagation();
        }

        // Si valida, añadimos campos validados
        form.classList.add("was-validated");

        // Recogemos los datos del formulario
        var values = {};
        $.each($('#semestre-form').serializeArray(), function (i, field) {
            values[field.name] = field.value;
        });

        // Guardamos el semestre en el objeto semesters
        var newIndice = values['year'] + values['numSemester'];
        if (typeof semestersData[newIndice] == 'undefined') {
            semestersData[newIndice] = new Object();
        }
        semestersData[newIndice].numSemester = values['numSemester'];
        semestersData[newIndice].year = values['year'];
        semestersData[newIndice].dateStart = values['dateStart'];
        semestersData[newIndice].dateEnd = values['dateEnd'];
        semestersData[newIndice].color = values['color'];
        semestersData[newIndice].description = values['description'];
        semestersData[newIndice].opinion = values['opinion'];
        semestersData[newIndice].difficulty = values['difficulty'];

        // Volvemos a dibujar las semanas
        drawSemesters(semestersData);

        // Cerrará el modal
        event.preventDefault();
        event.stopPropagation();
        $('#modal-semestre').modal('hide');
        $('.modal-backdrop.show').remove();
    }, false);

    // Abrimos el modal
    $('#modal-semestre').modal('show');
}

// MODAL ELIMINAR DASHBOARD
function eliminar(index) { // Eliminar semestre
    if (confirm("¿Quieres eliminar el semestre?")) {
        $('#' + index).remove();
    } else {
        alert("No se ha eliminado el semestre");
    }
}

jQuery(document).ready(function () {
    // Coge los datos de semestres e inserta las cards de semestres en el DOM
    drawSemesters(semestersData);
});

//INTERFAZ 3
var jsonSubjectsData =
  '{"1":{"yearweek":"","dayofweek":"","nameSubject":"Full Stack JS","description":"BLA BLA BLA","difficulty":5,"opinion":"Es muy complicado","color":"#33aaff"},"2":{"yearweek":"","dayofweek":"","nameSubject":"Otra asignatura","description":"BLA BLA BLA","difficulty":3,"opinion":"Me gusta","color":"#cccccc"}}';
var subjectsData = $.parseJSON(jsonSubjectsData);

function drawSubjects(subjects) {
  // vaciamos el html de semanas
  emptySubjects();
  // insertamos las asignaturas
  $.each(subjects, function (index, subject) {
    drawSubject(index, subject);
  });
  draganddrop();
}

function drawSubject(index, subject) {
  // construimos el portlet de la asignatura
  var item = $(
    '<div class="portlet" data-id="' +
      index +
      '"><div class="portlet-header" style="background-color: ' +
      subject.color +
      '">' +
      subject.name +
      '</div><div class="portlet-content">' +
      subject.description +
      '<br><button onclick="drawModalSubject(' +
      index +
      ')" type="button" class="btn-subject-edit btn btn-success"><i class="fa fa-edit" aria-hidden="true"></i></button><button data-bs-toggle="modal" href="#eliminar-subject-' +
      index +
      '" type="button" class="btn-subject-edit btn btn-danger"><i class="fa fa-trash-alt" aria-hidden="true"></i></button></div></div><div class="modal" tabindex="-1" id="eliminar-subject-' +
      index +
      '"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Eliminar asignatura ' +
      subject.name +
      '</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><p>¿Estás seguro que quieres eliminar la asignatura ?</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button type="button" onclick="removeSubject(' +
      index +
      ')" class="btn btn-primary">Sí</button></div></div></div></div>'
  );
  // si no tiene semana asignada lo insertamos en asignaturas pendientes de asignar
  if (!subject.yearweek) {
    item.appendTo("#subjects-pending");
    // si la semana es la seleccionada insertamos las asignaturas en los dias de la semana
  } else if ($("#select-semana").val() == subject.yearweek) {
    item.appendTo("#subjects-week #day-" + subject.dayofweek);
  }
}

function removeSubject(index) {
  console.log(index);
  console.log(subjectsData);
  if (typeof subjectsData[index] != "undefined") {
    delete subjectsData[index];
  }
  // volvemos a dibujar las semanas
  drawSubjects(subjectsData);
  $("#eliminar-subject-" + index).remove();
  $(".modal-backdrop.show").remove();
  return;
}

function emptySubjects() {
  $("#subjects-pending").empty();
  $("#subjects-week .portlet").remove();
}

// Drag and Drop
function draganddrop() {
  $(".column").sortable({
    connectWith: ".column",
    handle: ".portlet-header",
    cancel: ".portlet-toggle",
    placeholder: "portlet-placeholder ui-corner-all",
    update: function (event, ui) {
      var changeSubjectId = ui.item[0].dataset.id;
      var changeSubjectIdParent = ui.item[0].parentElement.id;
      var changeSubjectYearWeek = "";
      var changeSubjectDayofWeek = "";
      if (changeSubjectIdParent.startsWith("day-")) {
        changeSubjectYearWeek = $("#select-semana").val();
        changeSubjectDayofWeek = parseInt(changeSubjectIdParent.split("-")[1]);
      }
      updateSubjectSorting(changeSubjectId, changeSubjectYearWeek, changeSubjectDayofWeek);
    }
  });

  $(".portlet")
    .addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
    .find(".portlet-header")
    .addClass("ui-widget-header ui-corner-all");

  $(".portlet-toggle").click(function () {
    var icon = $(this);
    icon.toggleClass("ui-icon-minusthick ui-icon-plusthick");
    icon.closest(".portlet").find(".portlet-content").toggle();
  });
}

// actualiza la semana y dia de la semana para una asignatura por su id
function updateSubjectSorting(id, yearweek, dayofweek) {
  if (typeof subjectsData[id] != "undefined") {
    subjectsData[id].yearweek = yearweek;
    subjectsData[id].dayofweek = dayofweek;
  }
}

function drawModalSubject(index, yearweek = "", dayofweek = "") {
  // inicializamos valores
  var Subject = new Object();
  subject.yearweek = yearweek;
  subject.dayofweek = dayofweek;
  subject.name = "";
  subject.description = "";
  subject.color = "#cccccc";
  subject.time_start = "";
  subject.time_end = "";
  subject.finished = 0;
  subject.priority = "";
  var title = "Añadir ";

  // si viene definido un indice de semana cargaos sus datos
  if (index && typeof subjectsData[index] != "undefined") {
    var subject = subjectsData[index];
    var title = "Ver/Editar ";
  }

  // preparamos opciones de los select
  var selected = "";
  // priority
  var options_priority = "";
  for (var i = 1; i <= 5; i++) {
    selected = "";
    if (i == subject.priority) {
      selected = "selected";
    }
    options_priority +=
      "<option value=" + i + " " + selected + ">" + i + "</option>";
  }

  // preparamos html de cada campo del formulario
  var fields_hidden =
    '<input id="subject_id" name="subject_id" type="hidden" value="' +
    index +
    '"><input id="yearweek" name="yearweek" type="hidden" value="' +
    subject.yearweek +
    '"><input id="dayofweek" name="dayofweek" type="hidden" value="' +
    subject.dayofweek +
    '">';
  var field_name =
    '<label for="name" class="form-label">Nombre asignatura</label><input type="text" class="form-control" id="name" name="name" value="' +
    subject.name +
    '" required>';
  var field_description =
    '<label for="description" class="form-label">Descripción</label><textarea type="description" class="form-control" id="description" name="description" title="Descripción">' +
    subject.description +
    "</textarea>";
  var field_color =
    '<label for="color" class="form-label">Color</label><input type="color" class="form-control form-control-color" id="color" name="color" value="' +
    subject.color +
    '" title="Elige el color">';
  var field_time_start =
    '<label for="time_start" class="form-label">Hora inicio</label><input type="time" class="form-control" id="time_start" name="time_start" value="' +
    subject.time_start +
    '">';
  var field_time_end =
    '<label for="time_end" class="form-label">Hora final</label><input type="time" class="form-control" id="time_end" name="time_end" value="' +
    subject.time_end +
    '">';
  var field_finished =
    '<div class="form-check"><input class="form-check-input" type="checkbox" value="1" id="finished" name="finished"><label class="form-check-label" for="finished">Finalizada</label></div>';
  var field_priority =
    '<label for="priority" class="form-label">Prioridad</label><select id="priority" name="priority" class="form-select" aria-label="Prioridad" required><option value="">Selecciona Prioridad</option>' +
    options_priority +
    "</select>";

  // preparamos html del formulario con los campos
  var formHtml =
    '<div class="modal" tabindex="-1" id="modal-asignatura"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">' +
    title +
    ' asignatura</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><form id="asignatura-form" class="needs-validation"><div class="modal-body">' +
    fields_hidden +
    '<div class="mb-3">' +
    field_name +
    '</div><div class="mb-3">' +
    field_description +
    '</div><div class="mb-3">' +
    field_color +
    '</div><div class="mb-3 row"><div class="col-6">' +
    field_time_start +
    '</div><div class="col-6">' +
    field_time_end +
    '</div></div><div class="mb-3">' +
    field_priority +
    '</div><div class="mb-3">' +
    field_finished +
    '</div></div><div class="modal-footer"><button id="modal-asignatura-button" type="submit" class="btn btn-primary">Guardar</button></div></form></div></div></div>';

  // borramos el formulario si existe y lo insertamos en el DOM
  $("#modal-asignatura").remove();
  console.log(formHtml);
  $(formHtml).appendTo("#subjects-list");

  // añadimos el listener al evento de enviar el formulario para validar
  var form = document.getElementById("asignatura-form");
  form.addEventListener(
    "submit",
    function (event) {
      // validamos el formulario
      if (!form.checkValidity()) {
        // si no valida detenemos acción
        event.preventDefault();
        event.stopPropagation();
      }

      // si valida añadirmos campos validados
      form.classList.add("was-validated");

      // recogemos los datos del formulario
      var values = {};
      $.each($("#asignatura-form").serializeArray(), function (i, field) {
        values[field.name] = field.value;
      });

      // guardamos la asignatura en el objeto subjects
      var newIndice = values["subject_id"];
      if (typeof subjectsData[newIndice] == "undefined") {
        subjectsData[newIndice] = new Object();
      }
      subjectsData[newIndice].yearweek = values["yearweek"];
      subjectsData[newIndice].dayofweek = values["dayofweek"];
      subjectsData[newIndice].name = values["name"];
      subjectsData[newIndice].description = values["description"];
      subjectsData[newIndice].color = values["color"];
      subjectsData[newIndice].time_start = values["time_start"];
      subjectsData[newIndice].time_end = values["time_end"];
      subjectsData[newIndice].finished = values["finished"];
      subjectsData[newIndice].priority = values["priority"];

      // volvemos a dibujar las semanas
      drawSubjects(subjectsData);

      // y cerrará el modal
      event.preventDefault();
      event.stopPropagation();
      $("#modal-asignatura").modal("hide");
      $(".modal-backdrop.show").remove();
    },
    false
  );

  // abrimos el modal
  $("#modal-asignatura").modal("show");
}

jQuery(document).ready(function () {
  // coge los datos de subjects e inserta las subjects en el DOM
  drawSubjects(subjectsData);
});
// cada vez que se cambie la semana refrescaremos las asignaturas
$("#select-semana").change(function () {
  drawSubjects(subjectsData);
});
