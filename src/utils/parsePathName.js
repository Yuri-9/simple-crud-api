const parsePathName = (req) => {
  const pathItems = req.split('/');
  const path = pathItems[1];
  const id = pathItems[2];
  return { path, id };
};

module.exports = parsePathName;
