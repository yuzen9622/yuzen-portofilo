import { NextResponse } from "next/server";
import { sign } from "node:crypto";

/**
 * Apple Music API developer token (JWT, ES256).
 * Docs: https://developer.apple.com/documentation/applemusicapi/generating-developer-tokens
 *
 * Required env vars (see README):
 * - APPLE_TEAM_ID            10-char Team ID (Developer > Membership)
 * - APPLE_MUSIC_KEY_ID       10-char Key ID of the MusicKit key
 * - APPLE_MUSIC_PRIVATE_KEY  MusicKit .p8 private key (real newlines or escaped \n)
 * Optional:
 * - APPLE_MUSIC_TOKEN_TTL_SECONDS  token lifetime, capped at ~150 days
 */
const MAX_TTL_SECONDS = 12_960_000; // ~150 days, under Apple's 6-month cap
const REFRESH_MARGIN_SECONDS = 86_400; // re-sign 1 day before expiry

function base64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

function signDeveloperToken(options: {
  teamId: string;
  keyId: string;
  privateKeyPem: string;
  ttlSeconds: number;
}): string {
  const { teamId, keyId, privateKeyPem, ttlSeconds } = options;
  const now = Math.floor(Date.now() / 1000);

  const header = { alg: "ES256", typ: "JWT", kid: keyId };
  const payload: Record<string, unknown> = {
    iss: teamId,
    iat: now,
    exp: now + ttlSeconds,
  };
  // Optional `origin` claim: restricts the token to these request origins.
  const origins = process.env.APPLE_MUSIC_TOKEN_ORIGINS?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (origins?.length) {
    payload.origin = origins;
  }

  const data = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
  const signature = sign("sha256", Buffer.from(data), {
    key: privateKeyPem,
    dsaEncoding: "ieee-p1363", // JWT requires raw r||s, not DER
  });
  return `${data}.${signature.toString("base64url")}`;
}

let cached: { token: string; expiresAt: number } | null = null;

export function GET() {
  try {
    const teamId = process.env.APPLE_TEAM_ID;
    const keyId = process.env.APPLE_MUSIC_KEY_ID;
    const rawPrivateKey = process.env.APPLE_MUSIC_PRIVATE_KEY;

    if (!teamId || !keyId || !rawPrivateKey) {
      return NextResponse.json(
        {
          error:
            "Apple Music is not configured. Set APPLE_TEAM_ID, APPLE_MUSIC_KEY_ID and APPLE_MUSIC_PRIVATE_KEY.",
        },
        { status: 501 },
      );
    }

    const ttlSeconds = Math.min(
      Number(process.env.APPLE_MUSIC_TOKEN_TTL_SECONDS) || MAX_TTL_SECONDS,
      MAX_TTL_SECONDS,
    );
    const now = Math.floor(Date.now() / 1000);

    if (cached && cached.expiresAt - REFRESH_MARGIN_SECONDS > now) {
      return NextResponse.json({ token: cached.token });
    }

    // Support keys pasted with escaped newlines in a single-line .env value.
    const privateKeyPem = rawPrivateKey.replace(/\\n/g, "\n");
    const token = signDeveloperToken({
      teamId,
      keyId,
      privateKeyPem,
      ttlSeconds,
    });
    cached = { token, expiresAt: now + ttlSeconds };

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error generating Apple Music developer token:", error);
    return NextResponse.json(
      { error: "Failed to generate Apple Music developer token" },
      { status: 500 },
    );
  }
}
