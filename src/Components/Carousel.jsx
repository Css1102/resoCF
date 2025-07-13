import React from 'react'

const Carousel = () => {
    const techTags = [
  'React', 'Node.js' , 'Python',
   'GraphQL', 'Docker',
  'Flutter', 'AWS', 'TailwindCSS',
  'PostgreSQL', 'MongoDB', 'C++', 'Java', 
];

  return (
    <div className="bg-slate-900 py-10 px-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">🔥 Trending Tech Stacks</h2>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex space-x-4 px-2 py-2">
          {techTags.map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer transition duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

}
export default Carousel