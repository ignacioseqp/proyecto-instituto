const fs = require('fs');
const { googleVerify } = require('../helpers/google-verify');

let template = fs.readFileSync('templates/loginGoogle.html', 'utf-8');

exports.google = async (req, res) => {
  try {
    let googleTemplate = template;

    res.send(googleTemplate);
  } catch (err) {}
};

exports.googleSignin = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const googleUser = await googleVerify(id_token);

    console.log(googleUser);

    res.json({
      msg: 'Todo ok google.',
      id_token,
    });
  } catch (err) {
    console.log(err);
    json.status(400).json({
      ok: false,
      msg: 'El token no se pudo verificar',
    });
  }
};
