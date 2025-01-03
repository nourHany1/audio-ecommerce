function formatPrice(price) {

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0, 
  }).format(price);
}

export default formatPrice;