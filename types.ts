
export interface StoryConfig {
  country: string;
  language: string;
  concept: string;
}

export interface Step {
  id: string;
  label: string;
  icon: string;
}

export type StoryOutputs = Record<string, string>;

export enum StepId {
  Setup = "setup",
  Ideas = "ideas",
  Storyboard = "storyboard",
  Text2Image = "text2image",
  Img2Video = "img2video",
  SoundFx = "soundfx",
  Backsound = "backsound",
  IntroOutro = "intro_outro"
}
