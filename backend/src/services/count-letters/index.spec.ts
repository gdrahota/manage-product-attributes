import { countLetters } from './index'

describe( 'countLetters', () => {
  test( 'should return 5', () => {
    const test = countLetters( 'Isaac' )

    expect( test ).toEqual( 5 )
  } )

  test( 'should return 5', () => {
    const test = countLetters( 'Isaac Allotey' )

    expect( test ).toEqual( 12 )
  } )
} )
