type GenerateTaskRequest = {
  mediaType: "text" | "image" | "video";
  model: string;
  callBackUrl?: string;
  input: {
    prompt: string;
    image_input?: string[];
    aspect_ratio?:
      | "auto"
      | "1:1"
      | "1:4"
      | "1:8"
      | "2:3"
      | "3:2"
      | "4:1"
      | "4:3"
      | "4:5"
      | "5:4"
      | "8:1"
      | "9:16"
      | "16:9"
      | "21:9";
    resolution?: "1k" | "2k" | "4k";
    output_format?: "png" | "jpg";
  };
};

type GenerateTaskResponse = {
  code: number;
  msg: string;
  data?: { taskId: string } | null;
};
