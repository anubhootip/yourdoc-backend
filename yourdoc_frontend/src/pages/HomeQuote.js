import React from 'react';


function HomeQuote() {
  return (
    <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 bg-blue-400">

      <div class="flex justify-center ">
        <div class="block p-6 rounded-lg shadow-lg bg-blue-500 max-w-sm">
          <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Inaugeration of New Section</h5>
          <p class="text-gray-700 text-base mb-4">
            A Section containing facilities such as a new Research and Developement Cell, Operation Theater and a Check-Up center.
          </p>
        </div>
      </div>

      <div class="flex justify-center">
        <div class="block p-6 rounded-lg shadow-lg bg-green-500 max-w-sm">
          <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Best Doctor And Patient Website Award</h5>
          <p class="text-gray-700 text-base mb-4">
            We are overwhelmed by the support our patients provide us and you made us the best in Halifax!
          </p>
        </div>
      </div>

      <div class="flex justify-center">
        <div class="block p-6 rounded-lg shadow-lg bg-yellow-400 max-w-sm">
          <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Medicinal Contribution</h5>
          <p class="text-gray-700 text-base mb-4">
            Researcher Dr. Harshita Sharma found a new cure for microbes growing on skin.
          </p>
        </div>
      </div>
    </div>


  );
}


export default HomeQuote;