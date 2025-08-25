import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-purple-900 w-full text-slate-300 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Services */}
        <div>
          <h6 className="text-lg font-semibold text-white mb-2">Services</h6>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-cyan-400 transition">Branding</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Design</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Marketing</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h6 className="text-lg font-semibold text-white mb-2 max-h-[100px]">Company</h6>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-cyan-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Contact</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Jobs</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h6 className="text-lg font-semibold text-white mb-2">Legal</h6>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-cyan-400 transition">Terms of Use</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h6 className="text-lg font-semibold text-white mb-2">Newsletter</h6>
          <form className="space-y-4">
            <label className="block text-sm">Enter your email address</label>
            <div className="flex">
              <input
                type="email"
                placeholder="you@devmail.com"
                className="w-full px-4 py-2 rounded-l-md bg-slate-700 text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-r-md transition"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-2 text-sm text-slate-500">
        © {new Date().getFullYear()} resoCoders. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
