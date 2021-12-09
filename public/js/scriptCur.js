'use strict';

//CURSOS
const formCurso = document.querySelector('.formulario-cursos');
const contFormCurso = document.querySelector('.cont-formulario-curso');

//Curso - Nombre
const nombreDelCurso = document.getElementById('nombre-curso').textContent;
const estado = document.querySelector('.curso-estado');
const ideCurso = document.getElementById('ide-curso');
const cursoNombre = document.getElementById('nombreCurso');
//Curso - Fechas Inicio-Finalizacion
const vigenciaDesdeDia = document.querySelector(
  '.vigencia-desde-dia'
).textContent;
const vigenciaDesdeMes = document.querySelector(
  '.vigencia-desde-mes'
).textContent;
const vigenciaDesdeAño = document.querySelector(
  '.vigencia-desde-año'
).textContent;
const vigenciaHastaDia = document.querySelector(
  '.vigencia-hasta-dia'
).textContent;
const vigenciaHastaMes = document.querySelector(
  '.vigencia-hasta-mes'
).textContent;
const vigenciaHastaAño = document.querySelector(
  '.vigencia-hasta-año'
).textContent;
const cursoInicio = document.getElementById('fechaInicioCurso');
const cursoFinal = document.getElementById('fechaFinalCurso');
//Curso - Valores-Horas-desde
const lunesDesde = document.getElementById('lunes-desde').textContent;
const martesDesde = document.getElementById('martes-desde').textContent;
const miercolesDesde = document.getElementById('miercoles-desde').textContent;
const juevesDesde = document.getElementById('jueves-desde').textContent;
const viernesDesde = document.getElementById('viernes-desde').textContent;
//Curso- Valores-Horas-hasta
const lunesHasta = document.getElementById('lunes-hasta').textContent;
const martesHasta = document.getElementById('martes-hasta').textContent;
const miercolesHasta = document.getElementById('miercoles-hasta').textContent;
const juevesHasta = document.getElementById('jueves-hasta').textContent;
const viernesHasta = document.getElementById('viernes-hasta').textContent;
//Curso - Horario Inicio
const horaInicioUno = document.getElementById('horaInicio--1');
const horaInicioDos = document.getElementById('horaInicio--2');
const horaInicioTres = document.getElementById('horaInicio--3');
const horaInicioCuatro = document.getElementById('horaInicio--4');
const horaInicioCinco = document.getElementById('horaInicio--5');
//Curso - Horario Cierre
const horaFinUno = document.getElementById('horaFin--1');
const horaFinDos = document.getElementById('horaFin--2');
const horaFinTres = document.getElementById('horaFin--3');
const horaFinCuatro = document.getElementById('horaFin--4');
const horaFinCinco = document.getElementById('horaFin--5');
//Curso - Botones
const checkEstado = document.getElementById('switch');
const checkLabel = document.querySelector('.form-check-label');
const btnActualizar = document.querySelector('.btn-actualizar');
const btnGuardar = document.querySelector('.btn-guardar');
const btnCancelar = document.querySelector('.btn-cancelar');

let estadoCurso = false;

cursoNombre.value = nombreDelCurso;
cursoInicio.value = `${vigenciaDesdeAño}-${vigenciaDesdeMes}-${vigenciaDesdeDia}`;
cursoFinal.value = `${vigenciaHastaAño}-${vigenciaHastaMes}-${vigenciaHastaDia}`;
horaInicioUno.value = lunesDesde;
horaInicioDos.value = martesDesde;
horaInicioTres.value = miercolesDesde;
horaInicioCuatro.value = juevesDesde;
horaInicioCinco.value = viernesDesde;
horaFinUno.value = lunesHasta;
horaFinDos.value = martesHasta;
horaFinTres.value = miercolesHasta;
horaFinCuatro.value = juevesHasta;
horaFinCinco.value = viernesHasta;

if (estado.textContent == 'Activo') {
  estado.classList.remove('bg-danger');
  estado.classList.add('bg-success');
  estadoCurso = true;
}

if (formCurso) {
  checkEstado.addEventListener('click', function () {
    estadoCurso = !estadoCurso;
    if (estadoCurso == true) {
      checkLabel.textContent = 'Activo';
    } else {
      checkLabel.textContent = 'Inactivo';
    }
  });
  btnGuardar.addEventListener('click', async function () {
    await actualizarCurso();
    window.location.reload();
  });
  btnActualizar.addEventListener('click', function () {
    contFormCurso.classList.toggle('d-none');
    horaFinCinco.scrollIntoView(true, {
      behavior: 'smooth',
    });
    cursoNombre.focus();
  });
  btnCancelar.addEventListener('click', function () {
    contFormCurso.classList.add('d-none');
  });
}

const actualizarCurso = async function () {
  try {
    // construir el objeto
    let data = {
      estado: estadoCurso,
      nombre: cursoNombre.value,
      fechaDesde: [
        cursoInicio.value.slice(8, 10),
        cursoInicio.value.slice(5, 7),
        cursoInicio.value.slice(0, 4),
      ],
      fechaHasta: [
        cursoFinal.value.slice(8, 10),
        cursoFinal.value.slice(5, 7),
        cursoFinal.value.slice(0, 4),
      ],
      horarios: [
        {
          dia: 'Lunes',
          desdeHora: horaInicioUno.value,
          hastaHora: horaFinUno.value,
        },
        {
          dia: 'Martes',
          desdeHora: horaInicioDos.value,
          hastaHora: horaFinDos.value,
        },
        {
          dia: 'Miércoles',
          desdeHora: horaInicioTres.value,
          hastaHora: horaFinTres.value,
        },
        {
          dia: 'Jueves',
          desdeHora: horaInicioCuatro.value,
          hastaHora: horaFinCuatro.value,
        },
        {
          dia: 'Viernes',
          desdeHora: horaInicioCinco.value,
          hastaHora: horaFinCinco.value,
        },
      ],
    };
    console.log(data);
    let response = await fetch(`/cursos/${ideCurso.textContent}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'x-token': `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
  // location.reload();
};
