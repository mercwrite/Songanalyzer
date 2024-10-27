import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-lgray py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left space-y-2">
          <p className="text-sm">&copy; 2024 Songanalyzer. All rights reserved.</p>
          <p className="text-sm">Powered by Spotify Web API and Genius API</p>
        </div>
        <div className="flex gap-4">
          <Link href="https://www.linkedin.com/in/mercwrite" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-lgray text-2xl hover:text-white transition-colors duration-300" />
          </Link>
          <Link href="https://github.com/mercwrite" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-lgray text-2xl hover:text-white transition-colors duration-300" />
          </Link>
        </div>
      </div>
    </footer>
  );
}