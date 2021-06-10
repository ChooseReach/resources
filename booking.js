const bookingProperties = {
    bookingId: booking.pk,
    bookingPriceCents: booking.priceInCents,
    bookingPriceDollars: booking.priceInDollars,
    bookingTaxCents: booking.taxInCents,
    bookingTaxDollars: booking.taxInDollars,
    bookingTotalCents: booking.totalInCents,
    bookingTotalDollars: booking.totalInDollars,
    bookingCurrency: booking.currency,
    bookingCurrencyLowercase: booking.currencyLowercase,
    bookingCustomerCount: booking.customerCount,
    bookingOnlineRef: booking.onlineRef,
    bookingItemId: booking.item.pk,
    bookingItemName: booking.item.name,
    bookingItemSku: booking.item.sku,
    bookingOrderUuid: booking.order.uuid,
    bookingOrderId: booking.order.identifier,
    bookingOrderBookingCount: booking.order.bookingCount,
    bookingCompanyShortname: booking.company.shortname,
    bookingCompanyName: booking.company.name,
    bookingAffiliateShortname: booking.affliate.shortname,
    bookingAffiliateName: booking.affliate.name
};

var xhrobj = new XMLHttpRequest();

xhrobj.open("POST", 'https://api.choosereach.com/webhooks/fareharbor/conversion', true);
xhrobj.setRequestHeader("Content-type", "application/json");
xhrobj.send(JSON.stringify(bookingProperties));
console.log('Booking:',bookingItemName,'Booked', bookingProperties);
