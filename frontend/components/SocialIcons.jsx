import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const SocialIcons = () => {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      <a
        href="https://wa.me/919750089000"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110"
      >
        <FaWhatsapp size={25} />
      </a>

      <a
        href="https://www.facebook.com/profile.php?id=61592802914004"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
      >
        <FaFacebookF size={22} />
      </a>

      <a
        href="https://www.instagram.com/gptck92trust?igsh=MXI4Y3Q2emF4ZjBxcQ=="
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110"
      >
        <FaInstagram size={24} />
      </a>

      <a
        href="https://www.youtube.com/@GPTCK92Trust-AlumniFoundation"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110"
      >
        <FaYoutube size={25} />
      </a>
    </div>
  );
};

export default SocialIcons;
