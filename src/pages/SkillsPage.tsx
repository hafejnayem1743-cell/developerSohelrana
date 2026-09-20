import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Cpu,
  Layers,
  Code,
  Layout,
  FileCode,
  Atom,
  Server,
  Terminal,
  Workflow,
  Database,
  Flame,
  Coffee,
  Smartphone,
  GitBranch,
  Github,
  Monitor,
  Figma,
  Shield,
  Lock,
  ShieldCheck,
  CheckCircle,
  Search,
} from 'lucide-react';

export const SkillsPage: React.FC = () => {
  const { data } = useApp();
  const { skills } = data;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'programming', label: 'Programming' },
    { id: 'tools', label: 'Tools' },
    { id: 'cybersecurity', label: 'Cybersecurity' },
  ];

  const getSkillIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-cyan-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-blue-400" />;
      case 'FileCode':
        return <FileCode className="w-5 h-5 text-yellow-400" />;
      case 'Atom':
        return <Atom className="w-5 h-5 text-cyan-300" />;
      case 'Server':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-yellow-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-emerald-300" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-pink-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-cyan-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-red-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-purple-400" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-orange-400" />;
      case 'Github':
        return <Github className="w-5 h-5 text-slate-200" />;
      case 'Monitor':
        return <Monitor className="w-5 h-5 text-blue-400" />;
      case 'Figma':
        return <Figma className="w-5 h-5 text-pink-400" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      default:
        return <CheckCircle className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>02 // TECHNICAL ECOSYSTEM</span>
          </div>
          <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Skills & <span className="rgb-text-gradient">Technologies</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl text-base font-['Plus_Jakarta_Sans']">
            Production-tested engineering competencies across frontend architecture, backend services, cloud databases, and defensive security.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full p-1.5 rounded-2xl bg-slate-950/80 border border-white/[0.08] backdrop-blur-md">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by technology..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-2xl bg-[#090D1A]/80 border border-white/[0.08] hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center">
                    {getSkillIcon(skill.iconName)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-slate-400">
                    {skill.category}
                  </span>
                </div>

                <h3 className="font-['Outfit'] font-bold text-lg text-white mb-2">
                  {skill.name}
                </h3>

                <p className="text-slate-400 text-xs font-['Plus_Jakarta_Sans'] leading-relaxed mb-4">
                  {skill.description}
                </p>
              </div>

              {skill.level && (
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Proficiency:</span>
                  <span className="text-cyan-400 font-semibold">{skill.level}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
