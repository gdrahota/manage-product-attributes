import { countLetters } from './index'

describe( 'countLetters', () => {
  test( '"Isaac" should return 5', () => {
    const test = countLetters( 'Isaac' )

    expect( test ).toEqual( 5 )
  } )

  test( '"Isaac Allotey" should return 12', () => {
    const test = countLetters( 'Isaac Allotey' )

    expect( test ).toEqual( 12 )
  } )

  test( '"Isaac Allotey 1st" should return 15', () => {
    const test = countLetters( 'Isaac Allotey 1st' )

    expect( test ).toEqual( 15 )
  } )

  test( '" Isaac  Allotey  1st " should return 15', () => {
    const test = countLetters( ' Isaac  Allotey  1st ' )

    expect( test ).toEqual( 15 )
  } )

  test( '<null> should throw Error: "PROVIDED VALUE IS NOT A STRING"', () => {
    // @ts-ignore
    expect( () => countLetters( null ) ).toThrow( 'PROVIDED VALUE IS NOT A STRING' )
  } )

  test( '<false> should throw Error: "PROVIDED VALUE IS NOT A STRING"', () => {
    // @ts-ignore
    expect( () => countLetters( false ) ).toThrow( 'PROVIDED VALUE IS NOT A STRING' )
  } )

  test( '<true> should throw Error: "PROVIDED VALUE IS NOT A STRING"', () => {
    // @ts-ignore
    expect( () => countLetters( true ) ).toThrow( 'PROVIDED VALUE IS NOT A STRING' )
  } )
} )
