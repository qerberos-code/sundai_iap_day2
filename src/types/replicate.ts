export interface ReplicateInput {
  prompt: string;
  mask?: string;
  seed?: number;
  image?: string;
  model?: 'dev' | 'schnell';
  width?: number;
  height?: number;
  go_fast?: boolean;
  extra_lora?: string;
  lora_scale?: number;
  megapixels?: '1' | '0.25';
  num_outputs?: number;
  aspect_ratio?: '1:1' | '16:9' | '21:9' | '3:2' | '2:3' | '4:5' | '5:4' | '3:4' | '4:3' | '9:16' | '9:21' | 'custom';
  output_format?: 'webp' | 'jpg' | 'png';
  guidance_scale?: number;
  output_quality?: number;
  prompt_strength?: number;
  extra_lora_scale?: number;
  num_inference_steps?: number;
  disable_safety_checker?: boolean;
}
