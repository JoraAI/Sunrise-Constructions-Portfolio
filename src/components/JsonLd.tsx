/**
 * Renders a JSON-LD <script> tag for structured data.
 * Server component - safe to use in any layout or page.
 */
interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here; data originates from our own content layer.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}