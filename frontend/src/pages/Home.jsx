import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="bg-gray-50 py-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-5xl font-extrabold">
              Hire Experts.<br />
              <span className="text-gray-500">Get Work Done.</span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              A secure digital marketplace for buyers and sellers.
            </p>

            <div className="mt-8 flex gap-4">
              <Link to="/register" className="btn btn-primary">
                Join Now
              </Link>
              <Link to="/services" className="btn border border-black">
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div className="card text-center">
            <h3 className="font-bold text-xl">Verified Sellers</h3>
            <p className="text-gray-600 mt-2">Trusted professionals</p>
          </div>

          <div className="card text-center">
            <h3 className="font-bold text-xl">Secure Orders</h3>
            <p className="text-gray-600 mt-2">Safe transactions</p>
          </div>

          <div className="card text-center">
            <h3 className="font-bold text-xl">Fast Delivery</h3>
            <p className="text-gray-600 mt-2">Quick turnaround</p>
          </div>
        </div>
      </section>
    </>
  );
}
