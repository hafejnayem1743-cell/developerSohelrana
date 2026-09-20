import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectItem } from '../types';
import {
  FolderGit2,
  ExternalLink,
  Github,
  ArrowUpRight,
  Sparkles,
  X,
  Code2,
  CheckCircle2,
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { data } = useApp();
  const { projects } = data;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Full-Stack', 'Cybersecurity', 'Android'];

  const publishedProjects = projects.filter((p) => p.published);
  const filteredProjects = publishedProjects.filter((p) =>
    selectedCategory === 'All' ? true : p.category === selectedCategory
  );

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>06 // ENGINEERING PORTFOLIO</span>
          </div>
          <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Featured <span className="rgb-text-gradient">Projects</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl text-base font-['Plus_Jakarta_Sans']">
            Selected technical projects and application work. Only configured external URLs are shown.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full p-1.5 rounded-2xl bg-slate-950/80 border border-white/[0.08] backdrop-blur-md">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.2)] font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-3xl bg-[#090D1A]/90 border border-white/[0.08] hover:border-cyan-500/40 overflow-hidden backdrop-blur-xl transition-all duration-500 flex flex-col justify-between hover:shadow-[0_0_35px_rgba(0,240,255,0.2)] hover:-translate-y-1.5"
            >
              <div>
                {/* Visual Image with Futuristic Overlay */}
                <div
                  onClick={() => setActiveModalProject(project)}
                  className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D1A] via-transparent to-transparent opacity-80" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-300">
                    {project.category}
                  </div>

                  {/* Quick Expand Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/80 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3
                    onClick={() => setActiveModalProject(project)}
                    className="font-['Outfit'] font-bold text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 font-['Plus_Jakarta_Sans'] line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technology Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="px-6 pb-6 pt-2 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white text-xs font-mono font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
                {!project.liveUrl && !project.githubUrl && (
                  <span className="sm:col-span-2 text-center text-[11px] font-mono text-slate-600 py-2">No external project URL configured.</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal Detail View */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl rounded-3xl bg-[#090D1A] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.25)] max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 mb-6">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-mono">
                  {activeModalProject.category}
                </div>

                <h3 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-white">
                  {activeModalProject.title}
                </h3>

                <p className="text-slate-300 text-sm font-['Plus_Jakarta_Sans'] leading-relaxed">
                  {activeModalProject.longDescription || activeModalProject.description}
                </p>

                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
                    Technologies Applied:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalProject.techStack.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 text-xs font-mono text-cyan-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
                {activeModalProject.liveUrl && (
                  <a href={activeModalProject.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:flex-1 premium-button py-3 text-xs">
                    <span>Launch Live Demo</span><ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {activeModalProject.githubUrl && (
                  <a href={activeModalProject.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:flex-1 premium-button premium-button-muted py-3 text-xs">
                    <Github className="w-4 h-4" /><span>Inspect Source Code</span>
                  </a>
                )}
                {!activeModalProject.liveUrl && !activeModalProject.githubUrl && (
                  <span className="text-xs font-mono text-slate-600">No external URL configured.</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
