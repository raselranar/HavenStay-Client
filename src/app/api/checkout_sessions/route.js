import { serverMutate } from "@/lib/core/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const body = await request.json();
    const {
      propertyId,
      title,
      description,
      rent,
      rentType,
      images,
      userId,
      moveInDate,
      contactNumber,
      additionalNotes,
      ownerInfo,
      userName,
    } = body;
     
    // 1. CREATE A STRIPE CHECKOUT SESSION INSTEAD
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment", // Standard charge for the rental window reservation
      line_items: [
        {
          price_data: {
            currency: "usd", // Choose 'usd' or 'bdt' matching your data routing rules
            product_data: {
              name: title,
              description: description || `Booking reservation for ${title}`,
              images: images && images.length > 0 ? [images[0]] : [],
            },
            unit_amount: Math.round(rent * 100), // Converted cleanly to cents/poisha
          },
          quantity: 1,
        },
      ],
      // 2. PASS BOOKING METADATA SO YOUR WEBHOOK CAN SAVE IT TO MONGODB LATER
      metadata: {
        propertyId,
        userId,
        title,
        rent: rent.toString(),
        moveInDate,
        contactNumber,
        additionalNotes: additionalNotes || "",
        ownerInfo: JSON.stringify(ownerInfo),
        userName,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    });
     
     

    // 4. RETURN THE SESSION URL (This will never be null)
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Property Booking Session Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
