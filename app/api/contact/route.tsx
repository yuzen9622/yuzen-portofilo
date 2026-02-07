import { Resend } from "resend";

import { NextRequest, NextResponse } from "next/server";
import { ContactEmail } from "@/shared/components/contact-email";
const resend = new Resend(process.env.NEXT_RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();
  const response = await resend.emails.send({
    from: "Yuzen website <noreply@2026.yuzen.dev>",
    to: "oscar48079@gmail.com",
    subject: `Contact Form Submission from ${name}`,
    react: <ContactEmail name={name} email={email} contactText={message} />,
  });

  if (response.error) {
    return NextResponse.json(
      { message: "Failed to send email", error: response.error },
      { status: 500 },
    );
  }
  return NextResponse.json(
    { message: "Email sent successfully", response },
    { status: 200 },
  );
}
