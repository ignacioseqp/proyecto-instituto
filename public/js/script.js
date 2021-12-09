'use strict';

//BOTONES
const btnInicio = document.getElementById('btn-inicio');
const btnCursos = document.getElementById('btn-cursos');
const btnInstructores = document.getElementById('btn-instructores');
const btnAlumnos = document.getElementById('btn-alumnos');

//CURSOS
const formCurso = document.querySelector('.formulario-cursos');
const contFormCurso = document.querySelector('.cont-formulario-curso');
const tituCur = document.querySelector('.titulo-cursos');

const btnOpenCurso = document.getElementById('openCurso');
//Curso - Nombre
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

//INSTRUCTORES
const formInstr = document.querySelector('.formulario-instr');
const contInstr = document.querySelector('.cont-instructor');
const contFormInstr = document.querySelector('.cont-formulario-instr');
const tituInstr = document.querySelector('.titulo-instructores');
const instrCursos = document.getElementById('instrCursos');
const btnOpenInstr = document.getElementById('openInstr');
//Instructor - Datos personales
const instrApellidos = document.getElementById('instrApellidos');
const instrNombres = document.getElementById('instrNombres');
const instrProfTitu = document.getElementById('profTitulo');
//Instructor - Datos de contacto
const instrEmail = document.getElementById('instrEmail');
const instrDom = document.getElementById('instrDomicilio');
const instrTel = document.getElementById('instrTelefono');

//ALUMNOS
const formAlu = document.querySelector('.formulario-alu');
const contFormAlu = document.querySelector('.cont-formulario-alu');
const tituAlu = document.querySelector('.titulo-alumnos');
const instrAlu = document.getElementById('aluCursos');
const btnOpenAlu = document.getElementById('openAlu');
//Alumno - Datos personales
const aluApellidos = document.getElementById('aluApellidos');
const aluNombres = document.getElementById('aluNombres');
const documentoTipo = document.getElementById('documentoTipo');
const documentoNro = document.getElementById('documentoNro');
//Alumno - Datos de contacto
const aluEmail = document.getElementById('aluEmail');
const aluDom = document.getElementById('aluDomicilio');
const aluTel = document.getElementById('aluTelefono');

btnInicio.addEventListener('click', (evt) => {
  evt.preventDefault();
  // location.reload();
});

btnCursos.addEventListener('click', (evt) => {
  evt.preventDefault();
  tituCur.scrollIntoView(true, {
    behavior: 'smooth',
  });
});

btnInstructores.addEventListener('click', (evt) => {
  evt.preventDefault();
  console.log('Click');
  tituInstr.scrollIntoView(true, {
    behavior: 'smooth',
  });
});

btnAlumnos.addEventListener('click', (evt) => {
  evt.preventDefault();
  tituAlu.scrollIntoView(true, {
    behavior: 'smooth',
  });
});

if (formCurso) {
  formCurso.addEventListener('submit', function (evt) {
    evt.preventDefault();
    enviarFormCurso();
  });
  btnOpenCurso.addEventListener('click', function () {
    contFormCurso.classList.toggle('d-none');
    horaFinCinco.scrollIntoView(true, {
      behavior: 'smooth',
    });
    cursoNombre.focus();
  });
}

if (formInstr) {
  formInstr.addEventListener('submit', function (evt) {
    evt.preventDefault();
    enviarFormInstr();
  });
  btnOpenInstr.addEventListener('click', function () {
    contFormInstr.classList.toggle('d-none');
    instrTel.scrollIntoView(true, {
      behavior: 'smooth',
    });
    instrApellidos.focus();
  });
}

if (formAlu) {
  formAlu.addEventListener('submit', function (evt) {
    evt.preventDefault();
    enviarFormAlu();
  });
  btnOpenAlu.addEventListener('click', function () {
    contFormAlu.classList.toggle('d-none');
    aluTel.scrollIntoView(true, {
      behavior: 'smooth',
    });
    aluApellidos.focus();
  });
}

const enviarFormCurso = async function () {
  try {
    // construir el objeto
    let data = {
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
    // console.log(data);
    let response = await fetch('/cursos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-token': `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
  location.reload();
};

const enviarFormInstr = async function () {
  try {
    // construir el objeto
    let data = {
      apellidos: instrApellidos.value,
      nombres: instrNombres.value,
      cursos: [instrCursos.value],
      profTitulo: instrProfTitu.value,
      email: instrEmail.value,
      domicilio: instrDom.value,
      telefono: instrTel.value,
    };
    console.log(data);
    let response = await fetch('/instructores', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
  location.reload();
};

const enviarFormAlu = async function () {
  try {
    // construir el objeto
    let data = {
      apellidos: aluApellidos.value,
      nombres: aluNombres.value,
      documentoTipo: documentoTipo.value,
      documentoNro: documentoNro.value,
      cursos: [instrAlu.value],
      email: aluEmail.value,
      domicilio: aluDom.value,
      telefono: aluTel.value,
    };
    console.log(data);
    let response = await fetch('/alumnos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
  location.reload();
};
