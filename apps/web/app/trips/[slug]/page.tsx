export default function TripDetailPage({ params }: { params: { slug: string } }) {
  return <main className="p-8"><h1 className="text-2xl font-semibold">Detail Trip: {params.slug}</h1><p>Jadwal keberangkatan, kuota peserta, dan CTA booking.</p></main>;
}
