import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Head from "next/head";

const prisma = new PrismaClient();

export default async function RedirectPage({ params }: { params: { slug?: string } }) {
  const { slug } = params || undefined;

  if (!slug) {
    notFound();
  }

  try {
    const savedUrl = await prisma.saved_url.findUnique({
      where: {
        shortUrl: slug,
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
  } finally {
    await prisma.$disconnect();
  }
}