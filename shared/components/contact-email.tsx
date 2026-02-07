import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailProps {
  name: string;
  email: string;
  contactText?: string;
}

export const ContactEmail = ({ name, email, contactText }: EmailProps) => {
  const previewText = `Read ${name}'s contact form submission`;

  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-white font-airbnb">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto py-5 pb-12 w-145 max-w-full">
            <Section className="space-y-3 pb-2">
              <Row>
                <Text className="text-2xl leading-[1.3] font-bold ">
                  Here&apos;s what {name}(
                  <Link href={`mailto:${email}`}>{email}</Link>) wrote.
                </Text>
                <Text className="text-lg leading-[1.4]  rounded">
                  {contactText}
                </Text>
              </Row>
            </Section>

            <Hr className="border-[#cccccc] my-5" />

            <Section>
              <Column className="max-w-dvw">
                <p className="text-sm  text-accent-foreground">
                  {new Date().toLocaleDateString()}
                </p>

                <Text className="w-full mt-10 text-center font-bold font-inter leading-[0.9] text-[clamp(3rem,11vw,22rem)] whitespace-nowrap">
                  YUZEN©2026
                </Text>
              </Column>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

ContactEmail.PreviewProps = {
  name: "Alex",

  contactText: `“Alan was a great guest! Easy communication, the apartment was left
    in great condition, very polite, and respectful of all house rules.
    He’s welcome back anytime and would easily recommend him to any
    host!”`,
} as EmailProps;

export default ContactEmail;
