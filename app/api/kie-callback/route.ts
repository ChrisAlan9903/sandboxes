export async function POST(request: Request) {
  const body = await request.json();

  return Response.json(
    {
      success: true,
      message: "Test callback",
      data: body,
    },
    { status: 200 },
  );
}
