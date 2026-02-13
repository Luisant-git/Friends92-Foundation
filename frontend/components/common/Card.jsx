import React from 'react';

const Card = ({ imageUrl, title, description, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
      {imageUrl && <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 mb-2 font-heading">{title}</h3>
        <p className="text-slate-600 flex-grow font-body">{description}</p>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
};

export default Card;





