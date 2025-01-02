import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Head from "next/head";

interface Params {
  shortenUrl: string;
}

interface RedirectPageProps {
  params: Params;
}

const prisma = new PrismaClient();

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortenUrl } = params;

  try {
    const savedUrl = await prisma.saved_url.findUnique({
      where: {
        shortUrl: shortenUrl,
      },
    });

    if (savedUrl) {
      return (
        <>
          <Head>
            <title>Redirecting...</title>
          </Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.location.href = "${savedUrl.originalUrl}";`,
            }}
          />
        </>
      );
    } else {
      notFound();
    }
  } catch (error) {
    console.error("Error fetching shortened URL:", error);
    notFound();
  }
}
