class CustomerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomerError';
    this.isCustom = true;
  }
}

module.exports = CustomerError;
