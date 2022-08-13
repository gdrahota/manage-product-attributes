import Vue from 'vue'

export const sortByPosition = ( a, b ) => {
  if ( a.position === b.position ) {
    return 0
  } else if ( a.position > b.position ) {
    return 1
  }
  return -1
}

export const sortByTitle = ( a, b ) => a.title.localeCompare(b.title)
export const sortByText = ( a, b ) => a.text.localeCompare(b.text)
export const sortByClassName = ( a, b ) => a.className.localeCompare(b.className)
export const sortByUpdatedAt = ( a, b ) => b.updatedAt.localeCompare(a.updatedAt)
export const sortByLabel = ( a, b ) => a.label.localeCompare(b.label)
export const sortByName = ( a, b ) =>
  a == null || b == null || a.name == null || b.name == null
    ? 0
    : a.name.localeCompare(b.name)

export const sortById = ( a, b ) => {
  if ( a.id === b.id ) {
    return 0
  } else if ( a.id > b.id ) {
    return -1
  }
  return 1
}

export const sortByValue = ( a, b ) => {
  if ( a.value === b.value ) {
    return 0
  } else if ( a.value > b.value ) {
    return 1
  }
  return -1
}

export const sortByFieldSorter = ( field, reverse, dataType ) => {
  let keyFc

  switch ( dataType ) {
    case Date:
      keyFc = x => x && x[ field ] ? Vue.moment(x[ field ]).format('X') : 0
      break
    case String:
      keyFc = x => x && x[ field ] ? x[ field ].toString().toLowerCase() : ''
      break
    case Number:
    default:
      keyFc = x => x && x[ field ] ? parseFloat(x[ field ]) : 0
      break
  }

  reverse = reverse ? -1 : 1

  return ( a, b ) => {
    a = a ? keyFc(a) : 0
    b = b ? keyFc(b) : 0

    return reverse * ((a > b) - (b > a))
  }
}
