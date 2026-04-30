const hello = (req, res) => {
  res.status(201).json({
    mensagem: "Hello! API funcionando!"
  });
};

module.exports = {
  hello
};
