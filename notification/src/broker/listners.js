const { subscribeToQueue } = require("./broker");
const { sendEmail } = require("../email");

module.exports = function () {

    subscribeToQueue("AUTH_NOTIFICATION.USER_CREATED", async (data) => {
        
        const emailHTMLTemplate = `
       <!-- auth-verify.html -->
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    body { font-family: Arial, sans-serif; margin:0; padding:0; background:#f4f6f8; }
    .container{max-width:600px;margin:32px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08)}
    .header{background:#0d6efd;color:#fff;padding:20px;text-align:center}
    .content{padding:24px;color:#333}
    .btn{display:inline-block;padding:12px 20px;border-radius:6px;background:#0d6efd;color:#fff;text-decoration:none;font-weight:600}
    .small{color:#666;font-size:13px}
    .footer{padding:16px;text-align:center;color:#9aa0a6;font-size:12px}
    @media (max-width:420px){ .container{margin:12px} .content{padding:16px} }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin:0;font-size:20px">Thankyou for registering</h1>
    </div>
    <div class="content">
      <p style="margin-top:0">Hello Sir/Mam ${data.username},</p>
      <p>Thank you for registering with us. We're excited to have you on board!</p>
   <p class="small" style="margin-top:18px">If you didn't request this, you can safely ignore this email.</p>
    </div>
    <div class="footer">© ${2025}  — Need help? Reply to this email.</div>
  </div>
</body>
</html>

        `;

        await sendEmail(data.email, "Welcome to Our Service", "Thank you for registering with us!", emailHTMLTemplate);
        
    })

    

      subscribeToQueue("PAYMENT_NOTIFICATION.PAYMENT_COMPLETED", async (data) => {
        const emailHTMLTemplate = `
        <h1>Payment Successful!</h1>
        <p>Dear ${data.username},</p>
        <p>We have received your payment of ${data.currency} ${data.amount} for the order ID: ${data.orderId}.</p>
        <p>Thank you for your purchase!</p>
        <p>Best regards,<br/>The Team</p>
        `;
        await sendEmail(data.email, "Payment Successful", "We have received your payment", emailHTMLTemplate);
    })


    subscribeToQueue("PAYMENT_NOTIFICATION.PAYMENT_FAILED", async (data) => {
        const emailHTMLTemplate = `
        <h1>Payment Failed</h1>
        <p>Dear ${data.username},</p>
        <p>Unfortunately, your payment for the order ID: ${data.orderId} has failed.</p>
        <p>Please try again or contact support if the issue persists.</p>
        <p>Best regards,<br/>The Team</p>
        `;
        await sendEmail(data.email, "Payment Failed", "Your payment could not be processed", emailHTMLTemplate);
    })

    subscribeToQueue("PRODUCT_NOTIFICATION.PRODUCT_CREATED", async (data) => {
        const emailHTMLTemplate = `
        <h1>New Product Available!</h1>
        <p>Dear ${data.username},</p>
        <p>Check it out and enjoy exclusive launch offers!</p>
        <p>Best regards,<br/>The Team</p>
        `;
        await sendEmail(data.email, "New Product Launched", "Check out our latest product", emailHTMLTemplate);
    })


 };

  

      
  