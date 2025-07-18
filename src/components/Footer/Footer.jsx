import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Logo from "../../shared/Logo"; // adjust path if needed

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold mb-2">Dreaming of studying abroad?</h2>
        <p className="mb-4">Start planning today! Experience Study Abroad Journey with Scholar Link</p>
        <Link to="/all-scholarships">
          <button className="bg-white text-black text-sm md:text-base cursor-pointer font-medium px-5 py-2 rounded-full mb-8">
            Kickstart your Perfect University Match
          </button>
        </Link>
        <hr className="border-white/30 my-6" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left text-sm">
          {/* Logo and description */}
          <div className="">
            <div className="bg-white rounded-full flex md:block justify-center w-18 h-18 md:h-auto items-center py-1 pb-2 md:w-44">

              <Logo />
            </div>
            <p className="mt-4">
              Empowering students worldwide with expert guidance, scholarships, and opportunities to achieve their dreams of studying abroad.
            </p>
            <div className="flex gap-4 mt-4 text-lg">
              <a href="https://www.facebook.com/juwelmafi"><FaFacebookF /></a>
              <a href="https://x.com/juwelmafi"><FaTwitter /></a>
              <a href="https://www.youtube.com/@juwelmafi"><FaYoutube /></a>
              <a href="https://www.instagram.com/juwelmafi/"><FaInstagram /></a>
            </div>
          </div>

          {/* Study Destinations */}
          <div>
            <h3 className="font-semibold mb-2">STUDY DESTINATIONS</h3>
            <ul className="space-y-1">
              <li>Russia</li>
              <li>Georgia</li>
              <li>Kazakhstan</li>
              <li>Kyrgystan</li>
              <li>Uzbekistan</li>
              <li>Bosnia</li>
            </ul>
          </div>

          {/* Top Universities */}
          <div>
            <h3 className="font-semibold mb-2">TOP UNIVERSITIES</h3>
            <ul className="space-y-1">
              <li>Bashkir State Medical University</li>
              <li>Altai State Medical University</li>
              <li>Chechen State Medical University</li>
              <li>Chuvash State Medical University</li>
              <li>First Moscow State Medical University</li>
              <li>Kabardino Balkarian State University</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-2">QUICK LINKS</h3>
            <ul className="space-y-1">
              <li><Link to="/coming-soon">About Us</Link></li>
              <li><Link to="/coming-soon">Centres</Link></li>
              <li><Link to="/all-scholarships">Kickstart your Journey</Link></li>
              <li><Link to="/coming-soon">Events</Link></li>
              <li><Link to="/coming-soon">Blogs</Link></li>
              <li><Link to="/coming-soonc">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 text-sm flex flex-col md:flex-row justify-between items-center border-t border-white/20 pt-4">
          <p>© {new Date().getFullYear()}, Scholar Link All Rights Reserved</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <Link to="/coming-soon">Privacy Policy</Link>
            <Link to="/coming-soon">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
