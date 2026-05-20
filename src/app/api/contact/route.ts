import { NextRequest, NextResponse } from "next/server";
// import { connectDB, isDbConfigured } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 15;

interface Submission {
  name: string;
  email: string;
  message: string;
}

// Must be awaited on serverless (Vercel): the function instance is
// killed the moment we return, so any unawaited promise is dropped
// before SMTP completes.
async function deliver({ name, email, message }: Submission) {
  const tasks: Promise<unknown>[] = [];

  // if (isDbConfigured()) {
  //   tasks.push(
  //     (async () => {
  //       await connectDB();
  //       const { Contact } = await import("@/models/Contact");
  //       await Contact.create({ name, email, message });
  //     })().catch((dbErr) => console.error("DB save failed:", dbErr))
  //   );
  // }

  if (process.env.SMTP_HOST) {
    tasks.push(
      (async () => {
        const { sendContactEmail } = await import("@/lib/mailer");
        await sendContactEmail({ name, email, message });
      })().catch((mailErr) => console.error("Email send failed:", mailErr))
    );
  }

  await Promise.allSettled(tasks);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (name.length > 100 || message.length > 2000) {
      return NextResponse.json(
        { error: "Name or message exceeds the maximum length." },
        { status: 400 }
      );
    }

    await deliver({ name, email, message });

    return NextResponse.json(
      {
        success: true,
        message: "Thanks! Your message has been received — I'll reply soon.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
