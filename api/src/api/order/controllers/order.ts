/**
 * order controller
 */

import { factories } from "@strapi/strapi";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2023-10-16",
  typescript: true,
});

const imageForProduct =
  "https://i.postimg.cc/Hk11g0pC/yi-wei-t-U0-FJB1-UQR4-unsplash-1.jpg";

const imageForWorkshop =
  "https://i.postimg.cc/vTMg6xyg/pexels-mathilde-langevin-18278184-1.jpg";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      const { products, workshops } = ctx.request.body;

      if (!products && !workshops) {
        ctx.response.status = 400;
        return { error: "Could not find products or workshops" };
      }

      try {
        const calculateTotalAmount = (items) => {
          return items.reduce((total, item) => {
            return total + (item.price_data.unit_amount * item.quantity || 0);
          }, 0);
        };

        const lineItems = await Promise.all([
          ...products.map(async (product) => {
            const item = await strapi
              .service("api::product.product")
              .findOne(product.id);

            if (!item) {
              console.error("Product not found for id:", product.id);
              return null;
            }

            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.name || "Unknown Product",
                  images: [imageForProduct],
                },
                unit_amount: Math.round(item.price * 100),
              },
              quantity: product.quantity || 1,
            };
          }),
          ...workshops.map(async (workshop) => {
            const workshopId = workshop.workshop.id;

            const workshopItem = await strapi
              .service("api::workshop.workshop")
              .findOne(workshopId);

            if (!workshopItem) {
              console.error("Workshop not found for id:", workshopId);
              return null;
            }

            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: workshopItem.title,
                  images: [imageForWorkshop],
                },
                unit_amount: Math.round(workshopItem.price * 100) || 0,
              },
              quantity: workshop.quantity || 1,
              selectedDate: workshopItem.selectedDate,
            };
          }),
        ]);

        const shippingCost = 45;
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: "Shipping Cost",
            },
            unit_amount: Math.round(shippingCost * 100),
          },
          quantity: 1,
        });

        const validLineItems = lineItems.filter((item) => item !== null);

        const totalAmount = calculateTotalAmount(validLineItems);

        const session = await stripe.checkout.sessions.create({
          shipping_address_collection: { allowed_countries: ["SE"] },
          payment_method_types: ["card"],
          mode: "payment",
          success_url: process.env.CLIENT_PAGE_URL + "?success=true",
          cancel_url: process.env.CLIENT_PAGE_URL + "?success=false",
          line_items: validLineItems,
        });

        await strapi.service("api::order.order").create({
          data: { products, workshops, stripeId: session.id },
        });

        return { stripeSession: session, id: session.id };
      } catch (error) {
        console.error("Error in create method:", error);
        ctx.response.status = 500;
        return { error: "Internal Server Error" };
      }
    },
  })
);
