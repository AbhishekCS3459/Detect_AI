import PetClassifier from "@/components/pet-classifier"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-3xl">🐾</span>
            </div>
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Pet Classifier</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md">
            <PetClassifier />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Pet Classifier. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
