const fs = require('fs');
const Instructor = require('./../models/instructorModel');

let mainTemplate = fs.readFileSync('templates/index.html', 'utf-8');

exports.mostrarInstructores = async (req, res) => {
  try {
    let query = await Instructor.find();
    console.log(query);

    const instrHtml = query
      .map((instr) => {
        return `<tr>
      <td>${instr.id}</td>
      <td>${instr.apellidos}</td>
      <td>${instr.nombres}</td>
      <td>${instr.profTitulo}</td>
      <td>${instr.email}</td>
      <td>${instr.domicilio}</td>
      <td>${instr.telefono}</td>
    </tr>`;
      })
      .join('');
    mainTemplate = mainTemplate.replace('${instructores}', instrHtml);

    res.send(mainTemplate);

    // res.json({
    //   status: 'success',
    //   data: {
    //     query,
    //   },
    // });
  } catch (err) {
    res.json({
      status: 'fail',
      message: 'Error de datos!' + `${err}`,
    });
  }
};
