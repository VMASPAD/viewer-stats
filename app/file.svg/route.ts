import { NextResponse } from "next/server";
import { generateSVG } from "../image/svg";


export const runtime = "edge"; // opcional

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repository = searchParams.get("repository");
  
  // Validate that repository is a complete GitHub URL
  if (!repository) {
    return new NextResponse("Repository parameter is required", { status: 400 });
  }
  
  // Check if it's a valid GitHub repository URL
  const githubUrlPattern = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/?$/;
  const match = repository.match(githubUrlPattern);
  
  if (!match) {
    return new NextResponse("Invalid GitHub repository URL. Expected format: https://github.com/username/repository", { status: 400 });
  }
  
  // Extract username/repository format
  const repoPath = `${match[1]}/${match[2]}`;
  const color = searchParams.get("color");
  const response = await fetch(`${process.env.URL_DB_VIEWS}data?repository=${repoPath}&color=${color}`);
  const data = await response.json();
  const count = response.ok ? data.metrics.length : 0;

  const svg = generateSVG({ color: color || undefined, count });

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Disposition": 'inline; filename="file.svg"',
    },
  });
}
