const parsePathName = (req) => {
  const pathItems = req.replace(/(\/)$/g, '').split('/');
  const numberPathItem = pathItems.length;
  const path = pathItems[1];
  const id = pathItems[2];
  return { path, id, numberPathItem };
};

module.exports = parsePathName;
