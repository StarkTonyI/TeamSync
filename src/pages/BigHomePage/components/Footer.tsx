import { motion } from "framer-motion";
const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 to-slate-950 py-24 overflow-hidden">
    {/* Animated background */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute w-full h-full bg-[radial-gradient(#4f6de4_0.5px,transparent_1.5px)] [background-size:40px_40px] animate-grid-scroll" />
    </div>
    
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Brand Section */}
        <div className="md:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-3 group"
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="font-bold text-white text-xl">TS</span>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TeamSync
            </h3>
          </motion.div>
          
          <p className="text-slate-400/80 leading-relaxed max-w-sm">
            Pioneering collaboration tools for modern teams.
            <br className="hidden md:block" />
            <a href="mailto:entonyam95@gmail.com" className="text-blue-400/90 hover:text-blue-300 transition-colors">
              entonyam95@gmail.com
            </a>
          </p>
          
          <div className="flex gap-4">
            {['twitter', 'github', 'linkedin', 'figma'].map((social) => (
              <motion.a
                key={social}
                whileHover={{ y: -2 }}
                href="#"
                className="h-10 w-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center hover:bg-slate-800/70 transition-all backdrop-blur-sm"
              >
                <svg className="h-5 w-5 text-slate-400 hover:text-blue-400 transition-colors">
                  {/* Вставить реальные SVG иконки */}
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
  
        {/* Navigation Sections */}
        {[
          { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
          { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
          { title: 'Resources', links: ['Documentation', 'Community', 'Status', 'Security'] }
        ].map((section, i) => (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            className="space-y-5"
          >
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              {section.title}
            </h4>
            <ul className="space-y-3.5">
              {section.links.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-slate-400/90 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="group-hover:-rotate-45 transition-transform">
                      ↗
                    </span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
  
      {/* Divider */}
      <div className="border-t border-slate-800/50 my-16" />
  
      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-slate-500/90 text-center md:text-left">
          © {new Date().getFullYear()} TeamSync.<br className="md:hidden" /> 
          Crafted with passion by Anthony Marshall
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {['Privacy', 'Terms', 'Cookies'].map((item) => (
            <motion.a
              key={item}
              whileHover={{ scale: 1.05 }}
              href="#"
              className="px-4 py-2 rounded-xl text-sm text-slate-400/90 hover:text-blue-400 transition-colors bg-slate-800/30 backdrop-blur-sm hover:bg-slate-800/50"
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  
    {/* Floating elements */}
    <div className="absolute bottom-20 -left-40 w-80 h-80 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-[100px]" />
    <div className="absolute top-10 -right-32 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-[120px]" />
  </footer>
  );
};

export default Footer;
