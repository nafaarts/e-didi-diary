const getTanggal = () => {
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  return currentDate.toLocaleDateString("id-ID", options);
};

export { getTanggal };
