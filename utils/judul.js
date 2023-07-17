const getJudul = (type) => {
  switch (type) {
    case "PAGI":
      return "Makanan Pagi";
      break;

    case "SELINGAN_PAGI":
      return "Makanan Selingan Pagi";
      break;

    case "SIANG":
      return "Makanan Siang";
      break;

    case "SELINGAN_SIANG":
      return "Makanan Selingan Siang / Sore";
      break;

    case "MALAM":
      return "Makanan Malam";
      break;

    case "SELINGAN_MALAM":
      return "Makanan Selingan Malam";
      break;

    default:
      break;
  }
};

export { getJudul };
