
import React, { useState, useRef, useEffect } from 'react';
import { StepId, StoryConfig, StoryOutputs } from './types';
// Fixed: Added STEPS to the imported constants from constants.tsx
import { COUNTRIES, LANGUAGES, STAR_POSITIONS, STEPS } from './constants';
import { streamGeneration } from './services/gemini';
import { StepIndicator } from './components/StepIndicator';
import { OutputBox } from './components/OutputBox';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [step, setStep] = useState<string>(StepId.Setup);
  const [config, setConfig] = useState<StoryConfig>({ 
    country: "Indonesia", 
    language: "Bahasa Indonesia", 
    concept: "" 
  });
  const [outputs, setOutputs] = useState<StoryOutputs>({});
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [selectedIdea, setSelectedIdea] = useState("");
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [streamText, outputs]);

  const handleGenerate = async (targetStep: StepId) => {
    setLoading(true);
    setStreamText("");
    setStep(targetStep);

    let context = "";
    if (targetStep === StepId.Ideas) {
      context = `Country: ${config.country}\nLanguage: ${config.language}\nConcept: ${config.concept}`;
    } else if (targetStep === StepId.Storyboard) {
      context = `Selected Idea:\n${selectedIdea || outputs[StepId.Ideas]}`;
    } else if (targetStep === StepId.Text2Image) {
      context = `Storyboard:\n${outputs[StepId.Storyboard]}`;
    } else if (targetStep === StepId.Img2Video) {
      context = `Image Prompts:\n${outputs[StepId.Text2Image]}`;
    } else if (targetStep === StepId.SoundFx) {
      context = `Storyboard:\n${outputs[StepId.Storyboard]}`;
    } else if (targetStep === StepId.Backsound) {
      context = `Storyboard:\n${outputs[StepId.Storyboard]}`;
    } else if (targetStep === StepId.IntroOutro) {
      context = `Storyboard:\n${outputs[StepId.Storyboard]}`;
    }

    try {
      const result = await streamGeneration(targetStep, config, context, (text) => {
        setStreamText(text);
      });
      setOutputs(prev => ({ ...prev, [targetStep]: result }));
      setStreamText("");
    } catch (error) {
      console.error(error);
      setOutputs(prev => ({ ...prev, [targetStep]: "Oops! Something went wrong while sprinkling magic dust." }));
    } finally {
      setLoading(false);
    }
  };

  const completedSteps = Object.keys(outputs);

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Background Elements */}
      {STAR_POSITIONS.map((s, i) => (
        <div 
          key={i} 
          className="fixed pointer-events-none z-0 twinkle-star"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
        >
          <svg viewBox="0 0 24 24" fill="#FFD93D">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6z"/>
          </svg>
        </div>
      ))}

      {/* Header */}
      <header className="bg-gradient-to-br from-red-400 via-orange-400 to-yellow-300 pt-12 pb-16 px-6 text-center shadow-xl relative z-10">
        <div className="text-6xl mb-4 float-anim drop-shadow-lg">🧚</div>
        <h1 className="text-4xl md:text-5xl text-white font-bold tracking-tight drop-shadow-md">
          Dongeng Anak Studio
        </h1>
        <p className="text-white/90 mt-2 font-medium">AI-Powered Global Children's Storyteller</p>
      </header>

      <main className="max-w-4xl mx-auto -mt-10 px-4 relative z-20">
        {/* Navigation */}
        <StepIndicator 
          currentStep={step} 
          onStepClick={setStep} 
          completedSteps={completedSteps} 
        />

        {/* Content Area */}
        <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[40px] p-4 md:p-8 shadow-2xl">
          {step === StepId.Setup && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center gap-3">
                <span className="text-3xl">✨</span>
                <h2 className="text-2xl font-bold text-gray-800">Setup Your Story</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 ml-2">🌍 Location</label>
                  <select 
                    value={config.country}
                    onChange={(e) => setConfig({ ...config, country: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl border-2 border-orange-100 bg-white/80 focus:border-orange-400 outline-none transition-all font-medium"
                  >
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 ml-2">🗣️ Language</label>
                  <select 
                    value={config.language}
                    onChange={(e) => setConfig({ ...config, language: e.target.value })}
                    className="w-full px-5 py-3 rounded-2xl border-2 border-orange-100 bg-white/80 focus:border-orange-400 outline-none transition-all font-medium"
                  >
                    {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 ml-2">💭 Story Concept (Optional)</label>
                <textarea 
                  value={config.concept}
                  onChange={(e) => setConfig({ ...config, concept: e.target.value })}
                  placeholder="e.g. A brave little squirrel who finds a magical nut in the tropical forest..."
                  rows={4}
                  className="w-full px-5 py-3 rounded-2xl border-2 border-orange-100 bg-white/80 focus:border-orange-400 outline-none transition-all font-medium resize-none"
                />
              </div>

              <Button 
                onClick={() => handleGenerate(StepId.Ideas)} 
                isLoading={loading}
                className="w-full py-5 text-xl"
              >
                💡 Generate Story Ideas
              </Button>
            </div>
          )}

          {step !== StepId.Setup && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    {STEPS.find(s => s.id === step)?.icon} {STEPS.find(s => s.id === step)?.label}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Magic happens for {config.country} in {config.language}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => handleGenerate(step as StepId)} isLoading={loading}>
                    ↺ Regenerate
                  </Button>
                </div>
              </div>

              <OutputBox 
                title={`${step.charAt(0).toUpperCase() + step.slice(1)} Result`}
                content={outputs[step] || streamText}
                isLoading={loading}
              />

              {step === StepId.Ideas && (outputs[StepId.Ideas] || streamText) && (
                <div className="space-y-4 pt-6">
                  <label className="block text-sm font-bold text-gray-600">✍️ Paste your favorite idea here to continue:</label>
                  <textarea 
                    value={selectedIdea}
                    onChange={(e) => setSelectedIdea(e.target.value)}
                    placeholder="Paste idea text here..."
                    className="w-full p-4 rounded-xl border-2 border-orange-100 bg-white focus:border-orange-400 outline-none text-sm min-h-[120px]"
                  />
                  <Button 
                    className="w-full py-4 text-lg" 
                    variant="success"
                    disabled={!selectedIdea && !outputs[StepId.Ideas]}
                    onClick={() => handleGenerate(StepId.Storyboard)}
                  >
                    📖 Create Storyboard →
                  </Button>
                </div>
              )}

              {step === StepId.Storyboard && outputs[StepId.Storyboard] && (
                <Button className="w-full py-4 text-lg" variant="primary" onClick={() => handleGenerate(StepId.Text2Image)}>
                  🎨 Generate Image Prompts →
                </Button>
              )}

              {step === StepId.Text2Image && outputs[StepId.Text2Image] && (
                <Button className="w-full py-4 text-lg" variant="primary" onClick={() => handleGenerate(StepId.Img2Video)}>
                  🎬 Generate Video Prompts →
                </Button>
              )}

              {step === StepId.Img2Video && outputs[StepId.Img2Video] && (
                <Button className="w-full py-4 text-lg" variant="primary" onClick={() => handleGenerate(StepId.SoundFx)}>
                  🔊 Generate Sound FX →
                </Button>
              )}

              {step === StepId.SoundFx && outputs[StepId.SoundFx] && (
                <Button className="w-full py-4 text-lg" variant="primary" onClick={() => handleGenerate(StepId.Backsound)}>
                  🎵 Generate Backsound →
                </Button>
              )}

              {step === StepId.Backsound && outputs[StepId.Backsound] && (
                <Button className="w-full py-4 text-lg" variant="primary" onClick={() => handleGenerate(StepId.IntroOutro)}>
                  🎤 Finalize Narrative →
                </Button>
              )}

              {step === StepId.IntroOutro && outputs[StepId.IntroOutro] && (
                <div className="bg-green-50 rounded-3xl p-8 border-2 border-green-200 text-center space-y-4">
                  <div className="text-5xl">🎉</div>
                  <h3 className="text-2xl font-bold text-green-700 brand-font">Production Ready!</h3>
                  <p className="text-green-600 font-medium">Your children's story assets are all generated and ready for your video editor.</p>
                  <Button 
                    variant="success" 
                    className="w-full py-4"
                    onClick={() => {
                      const allText = Object.entries(outputs).map(([k,v]) => `=== ${k.toUpperCase()} ===\n${v}`).join("\n\n");
                      navigator.clipboard.writeText(allText);
                      alert("All content copied to clipboard!");
                    }}
                  >
                    📦 Copy All Assets
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        <div ref={bottomRef} className="h-4" />
      </main>

      {/* Footer Navigation (Sticky) */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-orange-100 px-6 py-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center text-white text-xs">AI</div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Story Studio v2.0</span>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => {
            setStep(StepId.Setup);
            setOutputs({});
            setStreamText("");
          }} className="text-xs">Reset All</Button>
        </div>
      </footer>
    </div>
  );
};

export default App;
