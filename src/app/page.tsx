import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold mb-6">How to Put an Elephant in a Mini Car</h1>
        
        <ol className="list-inside list-decimal text-lg space-y-4 max-w-2xl">
          <li className="mb-4">
            Open all the car doors and windows
            <p className="ml-6 text-base text-gray-600 dark:text-gray-400">
              Maximum ventilation is key for elephant comfort
            </p>
          </li>
          <li className="mb-4">
            Ask the elephant politely to get in
            <p className="ml-6 text-base text-gray-600 dark:text-gray-400">
              Elephants appreciate good manners
            </p>
          </li>
          <li className="mb-4">
            Wait patiently while the elephant ignores your request
            <p className="ml-6 text-base text-gray-600 dark:text-gray-400">
              This could take a while...
            </p>
          </li>
          <li className="mb-4">
            Realize this might not be the best idea
            <p className="ml-6 text-base text-gray-600 dark:text-gray-400">
              Perhaps consider a larger vehicle, like a truck or a train
            </p>
          </li>
        </ol>

        <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
          <p className="text-sm">
            <strong>Disclaimer:</strong> No elephants were squeezed into mini cars during the making of this guide. 
            Please treat all elephants with respect and appropriate transportation methods.
          </p>
        </div>
      </main>
      
      <footer className="row-start-3 text-center text-sm text-gray-500">
        <p>A humorous guide to impossible tasks</p>
      </footer>
    </div>
  );
}
