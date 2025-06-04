import PlaceValueChart from "./PlaceValueChart";

export default function PlaceValueDemo() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-turquoise via-teal-400 to-green-400 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-3xl font-fredoka text-white text-center mb-8">
            Build Numbers with Blocks!
          </h3>
          <div className="bg-white rounded-2xl p-6">
            <PlaceValueChart />
          </div>
        </div>
      </div>
    </section>
  );
}
