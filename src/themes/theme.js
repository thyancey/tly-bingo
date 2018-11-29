export default {
  color:{
    red: '#E00400',
    yellow: '#FFF512',
    green: '#1DCF00',
    blue: '#1270FF',
    purple: '#870099',

    grey: '#2e2d33',
    greyer: '#111111',
    black: '#000000',
    white: '#ffffff'
  },
  shadow:{
    z2: '-0.1rem 0.1rem .25rem .1rem rgba(0,0,0,0.36)',
    z3: '-.2rem .5rem 1rem .2rem rgba(0,0,0,.36)'
  },
  value:{
    headerHeight: '8rem'
  },
  mixins:{
    textStroke: function(thickness, spread, color){
      return `
        -${thickness} -${thickness} ${spread} ${color},
        ${thickness} -${thickness} ${spread} ${color},
        -${thickness} ${thickness} ${spread} ${color},
        ${thickness} ${thickness} ${spread} ${color},
        -${thickness} -${thickness} ${spread} ${color},
        ${thickness} -${thickness} ${spread} ${color},
        -${thickness} ${thickness} ${spread} ${color},
        ${thickness} ${thickness} ${spread} ${color},
        -${thickness} -${thickness} ${spread} ${color},
        ${thickness} -${thickness} ${spread} ${color},
        -${thickness} ${thickness} ${spread} ${color},
        ${thickness} ${thickness} ${spread} ${color},
        -${thickness} -${thickness} ${spread} ${color},
        ${thickness} -${thickness} ${spread} ${color},
        -${thickness} ${thickness} ${spread} ${color},
        ${thickness} ${thickness} ${spread} ${color}
      `
    }
  }
}