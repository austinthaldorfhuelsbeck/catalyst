import { NextRequest, NextResponse } from 'next/server';
import { resend, SENDER_EMAIL, ADMIN_EMAIL } from '@/lib/resend';
import { render } from '@react-email/components';
import ContactNotificationEmail from '@/lib/email-templates/contact-notification';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Generate email HTML
    const emailHtml = await render(
      ContactNotificationEmail({
        name,
        email,
        subject: subject || 'Contact Form Submission',
        message,
        submittedAt: new Date().toISOString(),
      }),
    );

    // Send email to admin
    const result = await resend.emails.send({
      from: SENDER_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Contact Form: ${subject || 'New Message'}`,
      html: emailHtml,
      replyTo: email, // Allow direct reply to the sender
    });

    console.log('Contact form email sent:', result.data?.id);

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 },
    );
  }
}
