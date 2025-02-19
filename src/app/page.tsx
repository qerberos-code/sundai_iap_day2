"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [comicPanels, setComicPanels] = useState<Array<{
    prompt: string;
    caption: string;
    imageUrl?: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("Initial prompt state:", prompt);

  const generateStory = async () => {
    try {
      setIsLoading(true);
      setComicPanels([]);
      setError(null);  // Reset error state
      
      console.log("About to call API with prompt:", prompt);
      
      const storyResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const storyData = await storyResponse.json(); // Parse the JSON response
      const imgURL = storyData.imgUrl; // Access imgUrl from the parsed data
      console.log("Image URL: ", imgURL);
      // if (!storyData.result?.comics || storyData.result.comics.length === 0) {
      //   console.log("No comics generated for prompt:", prompt);
      //   setError("Sorry, I couldn't generate a story for this prompt. Please try a different prompt that's more appropriate for a family-friendly dog adventure!");
      //   setIsLoading(false);
      //   return;
      // }
      
      // setComicPanels(storyData.result.comics);
      // console.log("Setting comic panels:", storyData.result?.comics);
      // Start generating images for each panel
      // generateNextImage(storyData.result.comics, 0);
      setComicPanels(prev => [...prev, { prompt: '', caption: '', imageUrl: imgURL }]);
    } catch (error) {
      console.error('Error during story generation:', error);
      setError("An error occurred while generating the story. Please try again.");
      setIsLoading(false);
    }
  };

  const generateNextImage = async (panels: typeof comicPanels, index: number) => {
    if (index >= panels.length) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/generate_imgs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: panels[index].prompt }),
      });
      
      const data = await response.json();
      if (data.imageUrl) {
        setComicPanels(prev => prev.map((panel, i) => 
          i === index ? { ...panel, imageUrl: data.imageUrl } : panel
        ));
        // Generate next panel's image
        generateNextImage(panels, index + 1);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      {/* Comic Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-12 pt-8"
      >
        <h1 className="text-5xl sm:text-6xl font-bold text-yellow-500 
          tracking-wider transform -rotate-2 
          [text-shadow:2px_2px_0_#000,4px_4px_0_#000]">
          AI COMIC CREATOR FOR PEDRO VEDALI
        </h1>
        <p className="text-xl mt-4 text-gray-700">Transform your ideas into comic stories about professor Pedro!</p>
      </motion.header>

      <main className="max-w-7xl mx-auto">
        {/* Input Section */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12 max-w-2xl mx-auto"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your instructions (e.g. 'Professor is on an adventure trip to Washington DC:
1. He is boarding an flight to Washington DC
2. He arrives in front of the White House
3. He makes it to the venue to give a talk on global economy')"
            maxLength={200}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
              transition-colors min-h-[150px] text-gray-900"
          />
          <motion.button 
            onClick={generateStory}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 px-6 py-3 bg-yellow-500 text-gray-900 
              rounded-lg font-bold hover:bg-yellow-400 transition-colors 
              disabled:bg-gray-400 disabled:text-gray-600 
              [text-shadow:1px_1px_0_#fff] shadow-md"
          >
            {isLoading ? 'Creating Your Comic...' : '✨ Generate Comic ✨'}
          </motion.button>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}
        </motion.div>

        {/* Comics Grid */}
        {comicPanels.length > 0 && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {comicPanels.map((panel, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.2 // Stagger the animations
                  }}
                  className="comic-panel"
                >
                  <div className="relative aspect-square bg-gray-50 
                    rounded-lg overflow-hidden border-4 border-gray-900 
                    shadow-[8px_8px_0_0_rgba(0,0,0,0.2)]">
                    {!panel.imageUrl && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 
                          border-4 border-yellow-500 border-t-transparent">
                        </div>
                      </div>
                    )}
                    {panel.imageUrl && (
                      <Image
                        src={panel.imageUrl}
                        alt={`Panel ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  {panel.imageUrl && (
                    <div className="mt-4 p-3 bg-yellow-100 rounded-lg 
                      border-2 border-gray-900 font-medium text-gray-900
                      transform -rotate-1">
                      {panel.caption}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
