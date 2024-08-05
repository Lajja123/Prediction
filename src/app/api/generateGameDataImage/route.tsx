/* eslint-disable @next/next/no-img-element */
import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const background = `${baseUrl}/front_background.png`;

    const pixSans = await fetch(
      new URL("/public/fonts/PixelifySans-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    // get parameters from the api url
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    const encodedParams = searchParams.get("params");

    if (!encodedParams) {
      return new Response(JSON.stringify({ message: "Params are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const paramsData = JSON.parse(decodeURIComponent(encodedParams));

    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            position: "relative",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={background} // Replace with your image path in the public directory
            alt="Background Image"
          />
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              //   backgroundColor: "rgba(0, 0, 0, 0.4)",
              display: "flex",
            }}
          >
            <div
              style={{
                color: "#CFFF18",
                fontSize: "2rem",
                fontFamily: "pixSans",
                marginTop: "390px",
                marginLeft: "175px",
                fontWeight: "900", // Maximum boldness
                textShadow: "0px 0px 8px rgba(252,255,85,0.5)",
              }}
            >
              {formatPlayerAddress(paramsData[1])}
            </div>
            <div
              style={{
                color: "#CFFF18",
                fontSize: "2rem",
                fontFamily: "pixSans",
                marginTop: "335px",
                marginLeft: "140px",
                fontWeight: "900", // Maximum boldness
                textShadow: "0px 0px 8px rgba(252,255,85,0.5)",
              }}
            >
              {formatPlayerAddress(paramsData[0])}
            </div>
            <div
              style={{
                color: "#CFFF18",
                fontFamily: "pixSans",
                fontSize: "2rem",
                marginTop: "412px",
                marginLeft: "143px",
                fontWeight: "900", // Maximum boldness
                textShadow: "0px 0px 8px rgba(252,255,85,0.5)",
              }}
            >
              {formatPlayerAddress(paramsData[2])}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "pixSans",
            data: pixSans,
            style: "normal",
          },
        ],
      }
    );

    return new Response(imageResponse.body, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error: any) {
    console.error("Error generating image:", error);
    return new Response(
      JSON.stringify({
        message: "Error generating image",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
function formatPlayerAddress(player: string): string {
  return `${player.substring(0, 5)}...${player.substring(player.length - 4)}`;
}

export const runtime = "edge";
