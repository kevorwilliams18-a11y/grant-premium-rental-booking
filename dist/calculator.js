(function (root) {
  'use strict';
  function day(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return NaN;
    const time = Date.parse(value + 'T00:00:00Z');
    return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time : NaN;
  }
  function estimate(input, config) {
    if (!['fit', 'shuttle'].includes(input.car) || !['JMD', 'CAD', 'USD'].includes(input.currency)) throw new Error('Choose a valid car and currency.');
    const start = day(input.pickup), end = day(input.returnDate);
    if (!Number.isFinite(start) || !Number.isFinite(end)) throw new Error('Please choose valid pick-up and return dates.');
    if (end <= start) throw new Error('Return date must be after the pick-up date.');
    const days = (end - start) / 86400000;
    const daily = config.dailyRates[input.car];
    const conversion = input.currency === 'JMD' ? 1 : config.exchangeRates[input.currency];
    if (!Number.isFinite(daily) || daily <= 0) return { days, status: 'price_pending' };
    if (!Number.isFinite(conversion) || conversion <= 0) return { days, status: 'conversion_pending' };
    const totalCents = Math.round(days * daily * conversion * 100);
    const depositCents = Math.round(totalCents / 2);
    return { days, status: 'ready', rate: daily * conversion, total: totalCents / 100, deposit: depositCents / 100, balance: (totalCents - depositCents) / 100 };
  }
  root.calculateRental = estimate;
  if (typeof module !== 'undefined') module.exports = estimate;
})(typeof window !== 'undefined' ? window : globalThis);
