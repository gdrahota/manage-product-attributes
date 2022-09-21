export const registerNumberFilter = ( Vue ) => {
  Vue.filter('number', ( value, numberOfFractionDigits = 0 ) => {
    const options = {
      minimumFractionDigits: numberOfFractionDigits,
      maximumFractionDigits: numberOfFractionDigits,
    }

    if ( value || value === 0 ) {
      return new Intl.NumberFormat('de-DE', options).format(value)
    }
  })
}
