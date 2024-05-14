export const handleError = (error, req, res, next) => {
  console.error("error", error);
  res.status(400);

  if (!error) {
    return res.status(500).send("Unknown server error");
  }

  if (typeof error.status === "number") {
    res.status(error.status);
  }

  if (error.name === "NotFoundError") {
    res.status(404);
  }

  if (typeof error.message === "string") {
    return res.send(error.message);
  }

  if (typeof error.inner?.message === "string") {
    return res.send(error.inner.message);
  }

  return res.send("Unknown server error");
};
