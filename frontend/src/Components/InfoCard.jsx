

export default function InfoCard({ title, value }) {
  return (
    <div className="card bg-dark text-white p-3 shadow-sm">
      <h6 className="mb-2">{title}</h6>
      <p className="mb-0">{value}</p>
    </div>
  );
}
