import React, { useState } from 'react';

const AdvocaciaFilter = () => {
  const [filter, setFilter] = useState('todos');

  const cardsData = [
    { id: 1, type: 'ESCRITORIO', content: 'Escritório 1' },
    { id: 2, type: 'ADVOGADO', content: 'Advogado 1' },
    { id: 3, type: 'PROMOTOR', content: 'Promotor 1' },
    { id: 4, type: 'ESCRITORIO', content: 'Escritório 2' },
    { id: 5, type: 'ADVOGADO', content: 'Advogado 2' },
    { id: 6, type: 'PROMOTOR', content: 'Promotor 2' },
  ];

  // Função para filtrar os cards com base no valor selecionado
  const filterCards = () => {
    if (filter === 'todos') {
      return cardsData; // Se o filtro for 'todos', retorna todos os cards
    } else {
      return cardsData.filter(card => card.type === filter); // Caso contrário, retorna apenas os cards correspondentes
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Dropdown para selecionar o filtro */}
      <div className="mb-4">
        <select
          onChange={(e) => setFilter(e.target.value)} // Atualiza o estado de 'filter' conforme a seleção
          value={filter}
          className="w-full md:w-1/3 p-2 border rounded-md shadow-sm bg-white"
        >
          <option value="todos">Selecione</option>
          <option value="ESCRITORIO">Escritórios</option>
          <option value="ADVOGADO">Advogados</option>
          <option value="PROMOTOR">Promotores</option>
        </select>
      </div>

      {/* Exibição dos cards filtrados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterCards().map(card => (
          <div
            key={card.id}
            className="p-4 border rounded-lg shadow-lg bg-white flex flex-col items-center"
            data-type={card.type}
          >
            <h3 className="font-bold text-lg mb-2">{card.content}</h3>
            <p className="text-gray-500">Tipo: {card.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvocaciaFilter;
