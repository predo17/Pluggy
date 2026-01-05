const nodemailer = require("nodemailer");

async function sendPurchaseEmail({
  userName,
  userEmail,
  items,
  totalPrice,
  date
}) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Pluggy Support" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Confirmação de Compra - Pluggy",
    html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Confirmação de Compra</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f7fa; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 30px 15px;">
        
        <!-- CARD -->
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff; border-radius:12px; padding:30px; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
          
          <!-- HEADER -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h1 style="margin:0; color:#111827;"> Pluggy</h1>
              <p style="margin:8px 0 0; color:#6b7280;">Confirmação de Compra</p>
            </td>
          </tr>

          <!-- MENSAGEM -->
          <tr>
            <td style="padding:20px 0; color:#374151;">
              <p style="margin:0 0 10px;">
                Olá <strong>${userName}</strong>,
              </p>

              <p style="margin:0 0 10px;">
                Sua compra foi <strong>concluída com sucesso</strong>
              </p>

              <p style="margin:0;">
                Confira abaixo os detalhes do seu pedido:
              </p>
            </td>
          </tr>

          <!-- ITENS -->
          <tr>
            <td style="padding:15px 0;">
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#f9fafb; border-radius:8px; padding:15px;">
                
                ${items
        .map(
          item => `
                  <tr>
                    <td style="padding:6px 0; color:#111827;">
                      • ${item.title || item.name}
                    </td>
                    <td align="right" style="padding:6px 0; color:#6b7280;">
                      ${item.quantity}x
                    </td>
                  </tr>
                `
        )
        .join("")}

              </table>
            </td>
          </tr>

          <!-- TOTAL -->
          <tr>
            <td style="padding:20px 0; border-top:1px solid #e5e7eb;">
              <table width="100%">
                <tr>
                  <td style="color:#374151;">Total pago:</td>
                  <td align="right" style="font-size:18px; font-weight:bold; color:#111827;">
                    ${totalPrice}
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:8px; color:#6b7280; font-size:13px;">
                    Data da compra:
                  </td>
                  <td align="right" style="padding-top:8px; color:#6b7280; font-size:13px;">
                    ${date}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top:30px; color:#6b7280; font-size:13px;">
              <p style="margin:0;">
                Obrigado por comprar na <strong>Pluggy</strong>
              </p>
              <p style="margin:8px 0 0;">
                Se precisar de ajuda, responda este email.
              </p>
            </td>
          </tr>

        </table>

        <!-- COPYRIGHT -->
        <p style="margin-top:20px; font-size:12px; color:#9ca3af;">
          © ${new Date().getFullYear()} Pluggy Store. Todos os direitos reservados.
        </p>

      </td>
    </tr>
  </table>
</body>
</html>
`
  });
}

module.exports = { sendPurchaseEmail };
