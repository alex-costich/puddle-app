const themes = [
  {
    id: 'ocean',
    name: 'Ocean Wave',
    description: 'Default theme',
    colors: {
      primary: 'rgb(0, 102, 204)',
      secondary: 'rgb(255,255,255)',
      background: 'rgb(211, 231, 254)',
    },
    icon: 'waves',
    required: 0,
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Unlock with 3 day streak',
    colors: {
      primary: 'rgb(44, 62, 80)',
      secondary: 'rgb(255,255,255)',
      background: 'rgb(190, 222, 230)',
    },
    icon: 'weather-night',
    required: 3,
    locked: true,
  },
  {
    id: 'forest',
    name: 'Forest Spring',
    description: 'Unlock with 7 day streak',
    colors: {
      primary: 'rgb(46, 125, 50)',
      secondary: 'rgb(255,255,255)',
      background: 'rgb(234, 251, 216)',
    },
    icon: 'forest',
    required: 7,
    locked: true,
  },
  {
    id: 'sunset',
    name: 'Desert Sunset',
    description: 'Unlock with 14 day streak',
    colors: {
      primary: 'rgb(255, 107, 107)',
      secondary: 'rgb(255,255,255)',
      background: 'rgb(255, 236, 207)',
    },
    icon: 'weather-sunset',
    required: 14,
    locked: true,
  },
  {
    id: 'aurora',
    name: 'Dusk Horizon',
    description: 'Unlock with 30 day streak',
    colors: {
      primary: 'rgb(183, 138, 255)',
      secondary: 'rgb(255,255,255)',
      background: 'rgb(252, 233, 255)',
    },
    icon: 'shimmer',
    required: 30,
    locked: true,
  },
  {
    id: 'neon',
    name: 'Lava Lamp',
    description: 'Unlock with 60 day streak',
    colors: {
      primary: 'rgb(196, 0, 0)',
      secondary: 'rgb(255,255,255)',
      background: 'rgb(255, 219, 219)',
    },
    icon: 'lava-lamp',
    required: 60,
    locked: true,
  },
];

export default themes;
