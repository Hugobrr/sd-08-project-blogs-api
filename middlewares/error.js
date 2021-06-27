const INTERNAL_SERVER_ERROR = 500;
module.exports = (err, _req, res, _next) => {
  if (err.err) {
    return res
      .status(err.err.status)
      .json({ message: err.err.message });
  }
  res
    .status(INTERNAL_SERVER_ERROR)
    .json({ message: `Erro interno de servidor: ${err}` });
};
