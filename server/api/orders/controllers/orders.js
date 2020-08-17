"use strict";

// require("dotenv").config();

const stripe = require("stripe")(
  "sk_test_51HFmoBAbY4PDXAYpObdYBzHKO0na03eh8cFW46Eeg8ZSHWbkJlKasaK6EQbp91lQUH7WEq67nM9OXwlCNg90qYiU00EnH2dRP4"
);

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

// Create charges in stripe
module.exports = {
  create: async (ctx) => {
    const {
      address,
      amount,
      brews,
      postalCode,
      token,
      city,
    } = ctx.request.body;

    // Send charge to Stripe
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: "usd",
      description: `Order ${new Date(Date.now())} - User ${ctx.state.user._id}`,
      source: token,
    });

    // Create order in database
    const order = await strapi.api.orders.services.orders.create({
      user: ctx.state.user._id,
      address,
      amount,
      brews,
      postalCode,
      city,
    });

    return order;
  },
};
