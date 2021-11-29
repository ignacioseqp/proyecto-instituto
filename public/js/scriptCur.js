'use strict';

//CURSOS
const formCurso = document.querySelector('.formulario-cursos');
const contFormCurso = document.querySelector('.cont-formulario-curso');

//Curso - Nombre
const estado = document.querySelector('.curso-estado');
const ideCurso = document.getElementById('ide-curso');
const cursoNombre = document.getElementById('nombreCurso');
//Curso - Fechas Inicio-Finalizacion
const cursoInicio = document.getElementById('fechaInicioCurso');
const cursoFinal = document.getElementById('fechaFinalCurso');
//Curso - Dias
const diaUno = document.getElementById('dia--1');
const diaDos = document.getElementById('dia--2');
const diaTres = document.getElementById('dia--3');
const diaCuatro = document.getElementById('dia--4');
const diaCinco = document.getElementById('dia--5');
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
const btnActualizar = document.querySelector('.btn-actualizar');
const btnGuardar = document.querySelector('.btn-guardar');
const btnCancelar = document.querySelector('.btn-cancelar');

let estadoCurso = false;

if (estado.textContent == 'Activo') {
  estado.classList.remove('bg-danger');
  estado.classList.add('bg-success');
  estadoCurso = true;
}

if (formCurso) {
  checkEstado.addEventListener('click', function () {
    estadoCurso = !estadoCurso;
  });
  btnGuardar.addEventListener('click', function () {
    actualizarCurso();
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
      fechaDesde: cursoInicio.value,
      fechaHasta: cursoFinal.value,
      horarios: [
        {
          dia: diaUno.value,
          desdeHora: horaInicioUno.value,
          hastaHora: horaFinUno.value,
        },
        {
          dia: diaDos.value,
          desdeHora: horaInicioDos.value,
          hastaHora: horaFinDos.value,
        },
        {
          dia: diaTres.value,
          desdeHora: horaInicioTres.value,
          hastaHora: horaFinTres.value,
        },
        {
          dia: diaCuatro.value,
          desdeHora: horaInicioCuatro.value,
          hastaHora: horaFinCuatro.value,
        },
        {
          dia: diaCinco.value,
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
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
  // location.reload();
};
