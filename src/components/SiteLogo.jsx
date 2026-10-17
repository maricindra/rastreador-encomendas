export default function SiteLogo({ size = 48, title = "Logo do rastreador de encomendas" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      alt={title}
      width={size}
      height={size}
      style={{ display: "block", borderRadius: 12 }}
    />
  );
}
