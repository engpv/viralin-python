
import { Step, StepId } from './types';

export const COUNTRIES = [
  "Indonesia", "Malaysia", "Philippines", "Thailand", "Vietnam", "Singapore", "Japan", "South Korea",
  "China", "India", "Australia", "United States", "United Kingdom", "France", "Germany", "Brazil",
  "Mexico", "Egypt", "Nigeria", "South Africa", "Turkey", "Saudi Arabia", "Russia", "Canada",
  "Italy", "Spain", "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Poland", "Czech Republic",
  "Argentina", "Colombia", "Chile", "Peru", "Bangladesh", "Pakistan", "Sri Lanka", "Nepal", "Myanmar",
  "Cambodia", "Laos", "Mongolia", "Kazakhstan", "Ukraine", "Romania", "Hungary", "Greece", "Portugal"
];

export const LANGUAGES = [
  "Bahasa Indonesia", "English", "Melayu", "Filipino", "Thai", "Vietnamese", "Japanese",
  "Korean", "Mandarin", "Hindi", "French", "German", "Spanish", "Portuguese", "Arabic", "Russian"
];

export const STEPS: Step[] = [
  { id: StepId.Setup, label: "Setup", icon: "✨" },
  { id: StepId.Ideas, label: "Ideas", icon: "💡" },
  { id: StepId.Storyboard, label: "Storyboard", icon: "📖" },
  { id: StepId.Text2Image, label: "Image Prompt", icon: "🎨" },
  { id: StepId.Img2Video, label: "Video Prompt", icon: "🎬" },
  { id: StepId.SoundFx, label: "Sound FX", icon: "🔊" },
  { id: StepId.Backsound, label: "Backsound", icon: "🎵" },
  { id: StepId.IntroOutro, label: "Narrative", icon: "🎤" },
];

export const STAR_POSITIONS = [
  { top: "8%", left: "5%", size: 24, delay: "0s" },
  { top: "15%", left: "92%", size: 20, delay: "0.4s" },
  { top: "45%", left: "2%", size: 16, delay: "0.8s" },
  { top: "72%", left: "95%", size: 22, delay: "0.2s" },
  { top: "88%", left: "8%", size: 18, delay: "0.6s" },
];
