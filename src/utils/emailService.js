import nodemailer from 'nodemailer';

const isDev = process.env.NODE_ENV === 'development';

const transporter = nodemailer.createTransport({
  host: 'wm.mail.isx.net.nz',
  port: 587,
  secure: false,
  auth: {
    user: 'info@seekschool.nz',
    pass: process.env.VERIFICATION_EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, code) => {
  if (isDev) {
    console.log(`[DEV] Verification code for ${email}: ${code}`);
    return;
  }

  await transporter.sendMail({
    from: '"SeekSpot" <info@seekschool.nz>',
    to: email,
    subject: `[请勿回复 Do not reply] 您的SeekSpot验证码 Your SeekSpot verification code`,
    text: [
      '您的验证码是：' + code,
      '此验证码将在 15 分钟后失效。',
      '如果您没有尝试注册SeekSpot账号，请忽略此邮件。',
      '',
      'Your verification code is: ' + code,
      'This code expires in 15 minutes.',
      'If you did not attempt to register a SeekSpot account, please ignore this email.',
    ].join('\n'),
    html: `
      <p>您的验证码是：<strong style="font-size:24px;letter-spacing:4px;">${code}</strong></p>
      <p>此验证码将在 15 分钟后失效。</p>
      <p>如果您没有尝试注册SeekSpot账号，请忽略此邮件。</p>
      <hr/>
      <p>Your verification code is: <strong style="font-size:24px;letter-spacing:4px;">${code}</strong></p>
      <p>This code expires in 15 minutes.</p>
      <p>If you did not attempt to register a SeekSpot account, please ignore this email.</p>
    `,
  });
};
