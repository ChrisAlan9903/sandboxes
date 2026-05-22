export async function POST(request: Request) {
  const body = await request.json();

  console.log("Request: ", body);

  return Response.json(
    {
      success: true,
      message: "Test callback",
      data: body,
    },
    { status: 200 },
  );
}
