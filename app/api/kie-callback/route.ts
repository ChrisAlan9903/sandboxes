import { supabase } from "@/app/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Request: ", body);

    // Task: store full response to db
    const { error } = await supabase
      .from("sb_callback")
      .insert({ response: JSON.stringify(body) })
      .select()
      .single();

    if (error) {
      console.error("Supabse insert error: ", error);
      return Response.json(
        {
          succes: false,
          message: "Failed to save callback response.",
          error: error.message,
        },
        {
          status: 500,
        },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Test callback",
        data: body,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Callback error:", err);

    return Response.json(
      {
        succes: false,
        message: "Invalid callback request.",
      },
      {
        status: 400,
      },
    );
  }
}
