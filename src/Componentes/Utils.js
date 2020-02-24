const formatReal = valor => parseFloat(valor.toString().replace(",", ".")).toFixed(2).replace(".", ",");

const formatData = data => {
  return data.toString();
};

const getMonthAbrev = function(data) {
  var locale = "pt-br",
  month = data.toLocaleString(locale, { month: "long" });

  return month.toUpperCase().substring(0,3);
};

export { formatReal, formatData, getMonthAbrev };
