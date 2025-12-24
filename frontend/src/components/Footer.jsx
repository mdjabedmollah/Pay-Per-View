export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold">PayView</h3>
          <p className="mt-2">Modern MERN marketplace</p>
        </div>
      </div>
      <div className="text-center border-t border-gray-700 py-4">
        © {new Date().getFullYear()} PayView
      </div>
    </footer>
  );
}
