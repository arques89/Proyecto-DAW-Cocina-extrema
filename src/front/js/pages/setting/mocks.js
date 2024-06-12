export const changePassword = [
    {
        id: 1,
        name: 'Contraseña Actual *'
    },
    {
        id: 2,
        name: 'Contraseña Nueva *'
    },
    {
        id: 3,
        name: 'Repetir Contraseña Nueva *'
    },
]
export const changeAddress = [
    {
        id: 1,
        name: 'Nombre *'
    },
    {
        id: 2,
        name: 'Apellidos *'
    },
    {
        id: 3,
        name: 'CIF / NIF'
    },
    {
        id: 4,
        name: 'Dirección *'    
    },
    {
        id: 5,
        name: 'Codigo postal *'
    },
    {
        id: 6,
        name: 'Ciudad *'
    },
    {
        id: 7,
        name: 'Teléfono *'
    },
]
export const changeCard = [
    {
        id: 1,
        name: 'Número de tarjeta *',
        type: 'text',
        className: 'block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
    },
    {
        id: 2,
        name: 'Nombre titular *',
        type: 'text',
        className: 'block mt-2 mb-4 bg-shape_input w-full rounded-full border-0 py-1.5 pl-4 pr-72 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6'
    },
]
export const inputSharedData = [
    {
      id: 1,
      name: "Ingredientes para 1",
      type: "textarea",
      className:
        "mt-2 mb-4 bg-shape_input w-96 h-72 rounded-xl border-0 py-1.5 pl-4 text-black placeholder:text-gray-500 sm:text-sm sm:leading-6 mr-36",
      placeholder: `Ingredientes para masa: 
          250 gramos de Harina de trigo
          15 gramos de Levadura prensada
          1 taza de Agua (240 ml)
          1 pizca de Sal
          1 cucharadita de Aceite`,
    },
    {
      id: 2,
      name: "Ingredientes para 2",
      type: "textarea",
      className:'mt-2 mb-4 bg-shape_input w-84 h-72 ps-2 rounded-xl border-0 py-1.5 pl-0 text-black placeholder:text-gray-500 sm:text-sm sm:leading-6 mr-48',
      placeholder: `Para la cubierta:
        150 centímetros cúbicos de Salsa de tomate
        150 gramos de Queso mozzarella
        1 lata de Atún en aceite
        100 gramos de Aceitunas de Origen
        1 cucharadita de Orégano
        2 cucharadas soperas de Queso rallado
        1 pizca de Sal y Pimienta
        9 Aceitunas (opcional)
        50 centímetros cúbicos de Aceite de oliva`,
    },
  ];