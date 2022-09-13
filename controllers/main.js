exports.homepage = async (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
};
