export const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === "production";
  
    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  };