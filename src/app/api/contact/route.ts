import { NextRequest, NextResponse } from "next/server";
import { connectDB, isDbConfigured } from "@/lib/mongodb";

interface Submission {
  name: string;
  email: string;
  message: string;
}

/**
 * Persist + email in the background. Runs after the HTTP response has
 * already been returned, so the visitor never waits on slow SMTP.
 * Safe here because this is a long-lived Node server (not serverless):
 * unawaited promises keep running on the event loop. Errors are logged,
 * never thrown, so they can't crash the process.
 */
function deliver({ name, email, message }: Submission) {
  const tasks: Promise<unknown>[] = [];

  if (isDbConfigured()) {
    tasks.push(
      (async () => {
        await connectDB();
        const { Contact } = await import("@/models/Contact");
        await Contact.create({ name, email, message });
      })().catch((dbErr) => console.error("DB save failed:", dbErr))
    );
  } else {
    console.warn(
      "MONGODB_URI not set — contact message accepted but not stored."
    );
  }

  if (process.env.SMTP_HOST) {
    tasks.push(
      (async () => {
        const { sendContactEmail } = await import("@/lib/mailer");
        await sendContactEmail({ name, email, message });
      })().catch((mailErr) => console.error("Email send failed:", mailErr))
    );
  }

  return Promise.allSettled(tasks);
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

    // Kick off persistence + email WITHOUT awaiting, then respond
    // immediately. The visitor gets instant feedback; SMTP finishes in
    // the background.
    void deliver({ name, email, message });

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
