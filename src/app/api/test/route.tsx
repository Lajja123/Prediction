import { ImageResponse } from "@vercel/og";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        Lajja
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

export const runtime = "edge";
