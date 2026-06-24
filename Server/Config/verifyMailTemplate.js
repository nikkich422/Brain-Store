const verificationEmail = (username, otp) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Email Verification</title>
    </head>
    
    <body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 10px;">
    <tr>
    <td align="center">
    
    <table width="600" cellpadding="0" cellspacing="0" 
    style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.08);">
    
    <!-- HEADER -->
    <tr>
    <td style="background:linear-gradient(135deg,#e06213,#ff8c42);padding:30px;text-align:center;">
    
    <img src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
    width="60" style="margin-bottom:10px;"/>
    
    <h1 style="color:#ffffff;margin:0;font-size:26px;">
    Brain Store
    </h1>
    
    <p style="color:#ffe9db;font-size:14px;margin-top:5px;">
    Secure Email Verification
    </p>
    
    </td>
    </tr>
    
    <!-- BODY -->
    <tr>
    <td style="padding:40px 35px;text-align:center;">
    
    <h2 style="color:#333;margin-top:0;">
    Hello ${username} 👋
    </h2>
    
    <p style="color:#555;font-size:16px;line-height:1.6;margin-bottom:25px;">
    Welcome to <b>Brain Store</b> 🎉  
    Please verify your email using the OTP below.
    </p>
    
    <!-- OTP CARD -->
    <div style="
    display:inline-block;
    background:#fff3eb;
    padding:20px 45px;
    font-size:34px;
    font-weight:bold;
    letter-spacing:6px;
    color:#e06213;
    border-radius:10px;
    box-shadow:0 5px 15px rgba(0,0,0,0.05);
    margin:20px 0;
    ">
    ${otp}
    </div>
    
    <p style="color:#666;font-size:14px;">
    This OTP will expire in <b>10 minutes</b>.
    </p>
    
    <!-- BUTTON -->
    <a href="#" 
    style="
    display:inline-block;
    margin-top:25px;
    padding:14px 28px;
    background:#e06213;
    color:white;
    text-decoration:none;
    font-size:16px;
    border-radius:6px;
    font-weight:bold;
    box-shadow:0 4px 10px rgba(0,0,0,0.1);
    ">
    Verify Email
    </a>
    
    <p style="color:#777;font-size:14px;margin-top:30px;">
    If you didn’t create this account, you can safely ignore this email.
    </p>
    
    </td>
    </tr>
    
    <!-- SECURITY INFO -->
    <tr>
    <td style="background:#fff7f2;padding:20px 30px;font-size:13px;color:#666;text-align:center;">
    For security reasons, never share your OTP with anyone.
    </td>
    </tr>
    
    <!-- FOOTER -->
    <tr>
    <td style="padding:25px;text-align:center;font-size:12px;color:#999;">
    
    <p style="margin:0;">
    Need help? Contact our support team anytime.
    </p>
    
    <p style="margin-top:8px;">
    © ${new Date().getFullYear()} Brain Store. All rights reserved.
    </p>
    
    </td>
    </tr>
    
    </table>
    
    </td>
    </tr>
    </table>
    
    </body>
    </html>
    `;
    }
    
    export default verificationEmail;