import OpenAI from 'openai';
import { AI_KEY } from './Images.js';

const chatGPT = new OpenAI({
  apiKey: AI_KEY , dangerouslyAllowBrowser: true 
});
export default chatGPT;