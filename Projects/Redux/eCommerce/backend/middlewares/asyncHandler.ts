const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    res.status(500).json({ message: error.message });
  });
};

export default asyncHandler;
