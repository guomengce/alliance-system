import { motion } from 'motion/react';
// @ts-expect-error - Vite raw image import is supported
import bgImage from '../../../assets/images/login_bg_lines_1780999930585.png';

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.img
        src={bgImage}
        alt="Energetic Light Trails"
        initial={{ scale: 1.08, x: -10, y: -10, rotate: 0 }}
        animate={{
          scale: [1.08, 1.18, 1.05, 1.08],
          x: [-10, 15, -20, -10],
          y: [-10, -25, 10, -10],
          rotate: [0, 2.5, -2, 0]
        }}
        transition={{
          duration: 35,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror"
        }}
        className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-screen select-none pointer-events-none"
        referrerPolicy="no-referrer"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#09070d]/20 via-[#0a080e]/65 to-[#09070d]"></div >
      <div className="absolute inset-0 bg-[#09070d]/25 backdrop-blur-[0.5px]"></div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:28px_28px]"></div>

      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[60%] bg-gradient-to-tr from-[#8a4e9c]/10 via-[#4e3c9c]/5 to-transparent blur-[140px] rounded-full rotate-[-12deg] transform origin-bottom-left"
      />
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] right-[5%] w-[350px] h-[350px] bg-[#6750a4]/5 rounded-full blur-[100px]"
      />
    </div>
  );
}

