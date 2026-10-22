'use strict';
const $ = id => document.getElementById(id);
const config = window.RENTAL_CONFIG;
const money = (value, currency) => new Intl.NumberFormat('en-JM', {style:'currency', currency, currencyDisplay:'code'}).format(value);
const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
$('pickup').min = today;
$('return').min = today;
$('year').textContent = now.getFullYear();
const preferredCar = new URLSearchParams(location.search).get('car');
if (['fit','shuttle'].includes(preferredCar)) $('car').value = preferredCar;
function render() {
  for (const id of ['days','total','deposit','balance']) $(id).textContent = '—';
  $('rate').textContent = 'Quote required';
  const input = {car:$('car').value, pickup:$('pickup').value, returnDate:$('return').value, currency:$('currency').value};
  $('currency-note').textContent = input.currency === 'JMD' ? 'Base rental prices are quoted in JMD.' : `Converted ${input.currency} amounts are estimates. Exchange rates and final payment amounts must be confirmed with us.${config.exchangeRateDate ? ' Rate date: '+config.exchangeRateDate+'.' : ''}`;
  if (!input.pickup || !input.returnDate) { const daily = config.dailyRates[input.car]; $('rate').textContent = Number.isFinite(daily) && daily > 0 ? money(daily,'JMD') : 'Quote required'; $('status').textContent = 'Choose your pick-up and return dates to see your estimate.'; return {status:'dates_pending'}; }
  try {
    if (input.pickup < today) throw new Error('Pick-up date must be today or later.');
    const result = calculateRental(input, config);
    $('days').textContent = `${result.days} ${result.days === 1 ? 'day' : 'days'}`;
    if (result.status === 'price_pending') $('status').textContent = 'Daily pricing is coming soon. Call us for a quote. A 50% deposit is required on the confirmed total.';
    else if (result.status === 'conversion_pending') { $('status').textContent = `${input.currency} conversion is not available yet. Select JMD or call us for a quote.`; $('rate').textContent = 'Conversion unavailable'; }
    else {
      $('status').textContent = 'Your estimated rental cost. Contact us to confirm availability and any additional charges.';
      for (const id of ['rate','total','deposit','balance']) $(id).textContent = money(result[id],input.currency);
    }
    return result;
  } catch(error) { $('status').textContent=error.message; return {status:'error',message:error.message}; }
}
$('estimate-form').addEventListener('submit', event => {event.preventDefault();render();});
for (const id of ['car','pickup','return','currency']) $(id).addEventListener('change',render);
document.querySelectorAll('[data-car]').forEach(button => button.addEventListener('click',()=>{$('car').value=button.dataset.car;render();$('calculator').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('car').focus({preventScroll:true});}));
document.querySelectorAll('[data-price]').forEach(element => {const rate=config.dailyRates[element.dataset.price];if(Number.isFinite(rate)&&rate>0)element.textContent=money(rate,'JMD')+' / day';});
if (document.modelContext?.registerTool) {
  try { Promise.resolve(document.modelContext.registerTool({name:'configure_rental_estimate',description:'Set the visible car, rental dates and currency, then calculate an estimate. Does not book a car.',inputSchema:{type:'object',properties:{car:{type:'string',enum:['fit','shuttle']},pickup:{type:'string'},returnDate:{type:'string'},currency:{type:'string',enum:['JMD','CAD','USD']}},required:['car','pickup','returnDate','currency'],additionalProperties:false},annotations:{readOnlyHint:false},execute(input){calculateRental(input,config);if(input.pickup<today)throw new Error('Pick-up date must be today or later.');$('car').value=input.car;$('pickup').value=input.pickup;$('return').value=input.returnDate;$('currency').value=input.currency;return render();}})).catch(()=>{}); } catch {}
}
const bookingLink=document.getElementById('booking-link');
function updateBookingLink(){if(!bookingLink)return;const p=new URLSearchParams({car:document.getElementById('car').value});for(const id of ['pickup','return']){const v=document.getElementById(id).value;if(v)p.set(id,v);}bookingLink.href='booking.html?'+p.toString();}
for(const id of ['car','pickup','return'])document.getElementById(id).addEventListener('change',updateBookingLink);updateBookingLink();
