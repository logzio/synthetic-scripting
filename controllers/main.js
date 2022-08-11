exports.homepage = async (req, res, next) => {
    // const { framework, script } = req.query;
    res.render('index.html');
};
