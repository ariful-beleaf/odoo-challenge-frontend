import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to Our Platform
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
              Your one-stop solution for all your needs.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <button>Get Started</button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-medium">Feature 1</h3>
              <p className="mt-2 text-gray-500">Description of feature 1</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-medium">Feature 2</h3>
              <p className="mt-2 text-gray-500">Description of feature 2</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-medium">Feature 3</h3>
              <p className="mt-2 text-gray-500">Description of feature 3</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to get started?
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Join thousands of satisfied users today.
            </p>
            <div className="mt-8">
              <button variant="secondary">Sign Up Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>Blog</li>
                <li>Documentation</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Social</h4>
              <ul className="space-y-2">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>GitHub</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
