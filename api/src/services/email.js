import { Resend } from "resend";

const resend = new Resend("re_2TBFfp24_2V2XVRtxD1mckTHNxP4TXpx6");

export const sendEmail = async ({ email, link }) => {
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Acessar conta",
    html: `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>Acesso a conta</h2>
      <p>Olá, você recebeu este e-mail para acessar a sua conta. Clique no link abaixo para entrar:</p>
      <a style="color: blue;">${link}</a>
      <p>Obs: Este link é válido por 1 hora, se não conseguir acessar por essas 1 hora, pode requisitar outro a qualquer momento</p>
    </div>
    `,
  });
};
