export default function BookingPage({ params }: { params: { slug: string } }) {
  return <main className="p-8"><h1 className="text-2xl font-semibold">Form Booking {params.slug}</h1><p>Nama peserta, WhatsApp, email, jumlah peserta, dan data peserta.</p></main>;
}
