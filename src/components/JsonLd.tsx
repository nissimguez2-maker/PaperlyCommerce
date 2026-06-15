type Json = Record<string, unknown>;

/** Render one or more JSON-LD blocks safely into the document. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
