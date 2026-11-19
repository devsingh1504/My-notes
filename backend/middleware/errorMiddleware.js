export const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'Something went wrong on the server' });
};
