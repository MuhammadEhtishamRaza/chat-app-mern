export const getCurrentUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error("Error in getCurrentUser controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
