# Grant Premium Rental

Responsive static rental website for Crossroads, Kingston, Jamaica.

## Add prices later

Edit `dist/config.js`. Replace each `null` in `dailyRates` with the daily price in **JMD**, without commas or currency symbols. Keep unknown rates as `null`; the website asks visitors to call instead of displaying a misleading zero price.

For currency conversion, set CAD and USD to the amount of that currency equal to **one JMD**, then set `exchangeRateDate` to the date checked. Rates are owner-managed, not live. Unset conversions show an unavailable message. Verify rates before publishing; no unverified exchange rates have been supplied.

The calculator uses return date minus pick-up date. It calculates 50% of the total as a deposit, rounds to cents and subtracts that deposit to calculate the balance. Pick-up and return times, availability and any extra charges are confirmed by phone. The site does not accept payments or create bookings.

## Preview / host

Serve the `dist` directory with any static web server. No dependencies or build step required. `dist/index.html` also works when opened locally. All production site files are in `dist`. The `.openai/hosting.json` file identifies its Sites deployment.

## Content

- Honda Fit and Honda Fit Shuttle, with explicitly labelled representative photos.
- +1 (876) 384-9602 and +1 (876) 567-7542 from the supplied business card.
- 50% deposit requirement.
- JMD default, CAD and USD display options.

Vehicle photo source and licence information is in `dist/credits.html`. Replace the representative photos with actual fleet photos when available.

## Navigation and branding

Home, Our Cars, Rental Calculator and Contact are separate pages with a responsive menu. Car selection carries into the calculator through its URL. The header displays the original logo directly from the supplied business-card image, cropped visually with CSS to preserve the original lettering.

## Current rental rates

2017 Honda Fit: JMD 7,500 per day. 2018 Honda Fit Shuttle: JMD 9,000 per day. A 50% deposit applies. CAD and USD conversions still require configured exchange rates.

Replacement photos are licensed CC BY-SA 4.0 and depict a red 2015 Fit and a 2017 Shuttle as explicitly labelled representative images. Exact requested model-year photos were not verified; source credits are provided on the website.

## Silver Shuttle image

`dist/assets/shuttle-silver.png` is a colour-edited derivative of the attributed LuvsMG481 photo, shared under CC BY-SA 4.0. Created with the built-in image editing tool. Prompt: change only the main Honda Shuttle paint to metallic silver, preserving the vehicle, composition, background and surrounding cars. It remains a representative image, not a photo of the actual rental car.

## Booking requests and themes

The Book a Car page validates the rental dates and estimates the cost and 50% deposit using the shared JMD rates. It opens a prefilled WhatsApp message to +1 (876) 384-9602. The customer must send the message; the business confirms availability, final price and payment. No reservation database or payment processing is included. Personal booking details are not stored in browser storage. Only the theme preference is saved locally. Theme starts with the device preference and can be toggled on every page.
