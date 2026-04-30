exports.erro = (req, res) => {
    return res.status(500).json({
        erro: "Errrrrrrouuuuuuu, brincaderinha"  
    })
}