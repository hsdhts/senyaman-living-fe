const formatters = {
  formatDecimal(value) {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  },
  formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value).replace('Rp', 'IDR');
  },
  formatDate(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      console.error("Invalid date value:", value);
      return "Invalid Date"; // Kembalikan string default jika value tidak valid
    }
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  },
  formatShortDate(value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      console.error("Invalid date value:", value);
      return "Invalid Date"; // Kembalikan string default jika value tidak valid
    }
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  },
};

export default formatters;