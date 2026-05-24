import { supabase } from "@/app/lib/supabase/server";

export async function POST(request: Request) {
  const kieApiKey = process.env.KIE_API_KEY!;
  const kieBaseUrl = process.env.NEXT_PUBLIC_KIE_BASE_URL!;
  const callbackBaseUrl = process.env.SB_BASE_URL!;
  const apiUrl = `${kieBaseUrl}/api/v1/jobs/createTask`;
  const callBackUrl = `${callbackBaseUrl}/api/kie-callback`;

  try {
    const body = (await request.json()) as GenerateTaskRequest;
    body.callBackUrl = callBackUrl;

    // prepare request
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${kieApiKey}`);
    headers.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
      redirect: "follow",
    };

    // call ai api

    const response = await fetch(apiUrl, requestOptions);
    // get response and store in db
    const data = (await response.json()) as GenerateTaskResponse;

    if (data.code !== 200) {
      throw new Error(data.msg);
    }

    // Task: store full response to db
    const { error } = await supabase
      .from("ai_task")
      .insert({
        userId: 1,
        taskId: data.data?.taskId,
        mediaType: body.mediaType,
        model: body.model,
        status: "Pending",
        createdBy: 1,
        updatedBy: 1,
      })
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
        message: "AI task successfully created!",
        data: {
          taskId: data.data?.taskId,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Task error:", error);
    return Response.json(
      {
        succes: false,
        message: "Invalid task request.",
        error: error,
      },
      {
        status: 400,
      },
    );
  }
}
