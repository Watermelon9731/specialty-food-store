import { jwtVerify, SignJWT } from "jose";

interface SessionPayload {
  admin: boolean;
  expires: string;
}

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET is not set.");
  }
  return secret;
};

export const signToken = async (payload: SessionPayload): Promise<string> => {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(new TextEncoder().encode(getJwtSecretKey()));
};

export const verifyToken = async (
  token: string,
): Promise<SessionPayload | null> => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
    );
    return payload as unknown as SessionPayload;
  } catch (error) {
    return null;
  }
};
