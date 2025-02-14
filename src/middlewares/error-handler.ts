import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid NFT ID format" });
  }

  if (err.code === 11000) {
    return res.status(409).json({ error: "Duplicate NFT ID detected" });
  }

  res.status(500).json({ error: "Internal server error" });
};

export default errorHandler;
