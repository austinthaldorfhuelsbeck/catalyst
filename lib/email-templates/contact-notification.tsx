import { Html, Head, Body, Container, Section, Text, Heading, Hr } from '@react-email/components';

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export default function ContactNotificationEmail({
  name,
  email,
  subject,
  message,
  submittedAt,
}: ContactNotificationEmailProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f6f9fc' }}>
        <Container style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
          <Section style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px' }}>
            <Heading style={{ color: '#1f2937', marginBottom: '24px' }}>
              New Contact Form Submission
            </Heading>

            <Text style={{ color: '#374151', fontSize: '16px', lineHeight: '1.5' }}>
              You have received a new message through your website contact form.
            </Text>

            <Hr style={{ margin: '32px 0', borderColor: '#e5e7eb' }} />

            <Section>
              <Heading as="h2" style={{ color: '#1f2937', fontSize: '20px', marginBottom: '16px' }}>
                Contact Information
              </Heading>

              <Text style={{ color: '#374151', margin: '8px 0' }}>
                <strong>Name:</strong> {name}
              </Text>

              <Text style={{ color: '#374151', margin: '8px 0' }}>
                <strong>Email:</strong> {email}
              </Text>

              <Text style={{ color: '#374151', margin: '8px 0' }}>
                <strong>Subject:</strong> {subject}
              </Text>

              <Text style={{ color: '#374151', margin: '8px 0' }}>
                <strong>Submitted:</strong> {formatDate(submittedAt)}
              </Text>
            </Section>

            <Hr style={{ margin: '32px 0', borderColor: '#e5e7eb' }} />

            <Section>
              <Heading as="h2" style={{ color: '#1f2937', fontSize: '20px', marginBottom: '16px' }}>
                Message
              </Heading>

              <Text
                style={{
                  color: '#374151',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  backgroundColor: '#f9fafb',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                }}
              >
                {message}
              </Text>
            </Section>

            <Hr style={{ margin: '32px 0', borderColor: '#e5e7eb' }} />

            <Text style={{ color: '#6b7280', fontSize: '14px' }}>
              You can reply directly to this email to respond to {name} at {email}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
