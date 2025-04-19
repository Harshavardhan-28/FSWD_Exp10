const validateCar = (req, res, next) => {
  const { title, description, image, specs, details, price } = req.body;

  if (!title || !description || !image || !specs || !details || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (typeof title !== 'string' || typeof description !== 'string' || typeof image !== 'string' || typeof specs !== 'object' || typeof details !== 'object' || typeof price !== 'number') {
    return res.status(400).json({ error: "Invalid data types" });
  }

  if(!Array.isArray(specs)) {
    return res.status(400).json({ error: "Specs should be an array" });
  }
  next();
}