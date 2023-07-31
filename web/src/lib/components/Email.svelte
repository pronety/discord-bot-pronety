<script lang="ts">
  import {
    Button,
    Container,
    Head,
    Hr,
    Html,
    Preview,
    Section,
    Text,
  } from "svelte-email";

  export let discordName: string;
  export let discordDiscriminator: string;
  export let verifLink: string;

  const fontFamily =
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

  const hr = {
    fontFamily,
  };

  const paragraph = {
    fontFamily,
  };

  const button = {
    fontFamily,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    backgroundColor: "green",
    color: "#ffffff",
  };
</script>

<Html lang="id">
  <Head />
  <Preview
    preview="Apakah benar ini anda? {discordName} #{discordDiscriminator}"
  />
  <Hr style={hr} />
  <Section>
    <Container>
      <Text style={paragraph}
        >Akun discord dengan nama {discordName} #{discordDiscriminator} mendaftarkan
        email ini sebagai email verifikasi untuk mendapat role di server Pronety.
        Jika benar, silakan klik link di bawah ini:</Text
      >
      <Button style={button} href={verifLink}>Verifikasi</Button>
    </Container>
  </Section>
</Html>
