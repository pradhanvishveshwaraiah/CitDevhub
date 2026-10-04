import React from 'react';
import { Linkedin, Github, ExternalLink } from 'lucide-react';

interface Founder {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  college: string;
  image: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  isLead?: boolean;
}

export const TeamSection: React.FC = () => {
  // Ordered strictly as requested:
  // 1. Pradhan V
  // 2. Mohammed Hanan
  // 3. Monisha
  // 4. Yashwanth
  // 5. Akshay
  // 6. Hamsaveni
  // 7. Nayana
  const founders: Founder[] = [
    {
      id: 'pradhan',
      name: 'Pradhan V',
      role: 'Club Founder & Lead',
      bio: 'Frontend Developer, Backend Developer, and AI / ML Learner & Enthusiast.',
      skills: ['Frontend', 'Backend', 'AI / ML', 'MERN Stack'],
      college: 'Cauvery Institute of Technology, Mandya',
      image: './team/pradhan.png',
      github: 'https://github.com/pradhanvishveshwaraiah',
      portfolio: 'https://pradhanvishveshwaraiah.github.io/my-portfolio/',
      isLead: true,
    },
    {
      id: 'hanan',
      name: 'Mohammed Hanan',
      role: 'Frontend Developer',
      bio: 'Frontend Developer, learning Generative AI and Python.',
      skills: ['Frontend', 'Generative AI', 'Python'],
      college: 'Cauvery Institute of Technology, Mandya',
      image: './team/hanan.svg',
      linkedin: 'https://www.linkedin.com/in/mohammed-hannan-78a63040a/',
    },
    {
      id: 'monisha',
      name: 'Monisha R S',
      role: 'Editing & Designing',
      bio: 'Editing and Design. Learning Python and Java.',
      skills: ['Editing', 'Designing', 'Python', 'Java'],
      college: 'Cauvery Institute of Technology, Mandya',
      image: './team/monisha.svg',
      linkedin: 'https://www.linkedin.com/in/monisha-rs-09962140a/',
    },
    {
      id: 'yashwanth',
      name: 'Yashwanth',
      role: 'Backend Developer',
      bio: 'Backend Developer, Data Structures & Algorithms (DSA) Enthusiast.',
      skills: ['Backend', 'DSA', 'Problem Solving'],
      college: 'Cauvery Institute of Technology, Mandya',
      image: './team/yashwanth.svg',
    },
    {
      id: 'akshay',
      name: 'Akshay H M',
      role: 'Generative AI & Tech',
      bio: 'Learning Generative AI, Python, and Java.',
      skills: ['Generative AI', 'Python', 'Java'],
      college: 'Cauvery Institute of Technology, Mandya',
      image: './team/akshay.svg',
      linkedin: 'https://www.linkedin.com/in/akshay-h-m-a73118401/',
    },
    {
      id: 'hamsaveni',
      name: 'Hamsaveni M M',
      role: 'Backend Developer',
      bio: 'Backend Developer, learning Java, Python, and core group member.',
      skills: ['Backend', 'Java', 'Python'],
      college: 'Cauvery Institute of Technology, Mandya',
      image: './team/hamsaveni.svg',
      linkedin: 'https://www.linkedin.com/in/hamsaveni-mm-03837540b/',
    },
    {
      id: 'nayana',
      name: 'Nayana',
      role: 'Editing & Designing',
      bio: 'Editing and Design. Learning Python and Java.',
      skills: ['Editing', 'Designing', 'Python', 'Java'],
      college: 'Cauvery Institute of Technology, Mandya',
      image: './team/nayana.svg',
    },
  ];

  return (
    <section id="team" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/[0.08]">
      {/* Section Header */}
      <div className="mb-12">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
          Leadership &amp; Core Team
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Clash_Display',sans-serif]">
          Founder Members
        </h2>
        <p className="text-neutral-300 text-sm sm:text-base mt-2 max-w-xl">
          The seven student founders of CIT DevHub from Cauvery Institute of Technology, Mandya.
        </p>
      </div>

      {/* 7 Founder Cards with bright glass contrast matching hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {founders.map((member) => (
          <div
            key={member.id}
            className={`glass glass-hover rounded-3xl p-7 flex flex-col justify-between border border-white/20 shadow-xl bg-black/60 backdrop-blur-xl transition-all duration-300 ${
              member.isLead ? 'border-white/35 ring-1 ring-white/10' : ''
            }`}
          >
            <div>
              {/* Photo Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden glass border border-white/20 shrink-0 shadow-md bg-[#18181b] group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    loading="eager"
                  />
                </div>

                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base leading-tight font-['Clash_Display',sans-serif] truncate">
                      {member.name}
                    </h3>
                    {member.isLead && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white text-black font-semibold shrink-0 shadow-sm">
                        LEAD
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-300 font-mono mt-0.5 truncate">{member.role}</p>
                  <p className="text-[11px] text-neutral-400 font-mono mt-0.5 truncate">
                    Cauvery Institute of Technology
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4">
                {member.bio}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/[0.08] border border-white/10 text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-mono text-[10px]">CIT DevHub Core</span>

              <div className="flex items-center gap-3">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-300 hover:text-white transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.portfolio && (
                  <a
                    href={member.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-300 hover:text-white transition-colors"
                    title="Portfolio"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-300 hover:text-white transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
